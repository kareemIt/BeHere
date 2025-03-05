package com.example.socialmedia.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.socialmedia.Models.AuthResponse;
import com.example.socialmedia.Models.Session;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Repository.SessionRepository;
import com.example.socialmedia.util.JwtUtil;

@Service
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final SessionRepository sessionRepo;
    private final UserDetailsService userDetailsService;

    @Autowired
    public AuthService(AuthenticationManager authManager, JwtUtil jwtUtil,
            SessionRepository sessionRepo, UserDetailsService userDetailsService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.sessionRepo = sessionRepo;
        this.userDetailsService = userDetailsService;
    }

    @Transactional
    public AuthResponse login(String username, String password) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        String accessToken = jwtUtil.generateAccessToken(username);
        String refreshToken = jwtUtil.generateRefreshToken(username);

        Session session = new Session();
        User user = (User) userDetailsService.loadUserByUsername(username);
        session.setUser(user);
        session.setRefreshToken(refreshToken);
        session.setExpiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7)); // 7 days
        sessionRepo.save(session);

        return new AuthResponse(accessToken, refreshToken, Instant.now().plusSeconds(60 * 60 * 24 * 7).toEpochMilli(), username);
    }

    public AuthResponse refreshAccessToken(String refreshToken) {
        Optional<Session> sessionOpt = sessionRepo.findByRefreshToken(refreshToken);
        if (sessionOpt.isEmpty()) {
            throw new RuntimeException("Invalid refresh token");
        }

        Session session = sessionOpt.get();
        String username = jwtUtil.extractUsername(refreshToken);
        if (!jwtUtil.isTokenValid(refreshToken, username)) {
            sessionRepo.delete(session); // Revoke invalid session
            throw new RuntimeException("Expired refresh token");
        }

        String newAccessToken = jwtUtil.generateAccessToken(username);
        return new AuthResponse(newAccessToken, refreshToken, Instant.now().plusSeconds(60 * 60 * 24 * 7).toEpochMilli(), username);
    }

    @Transactional
    public void logout(String refreshToken) {
        sessionRepo.findByRefreshToken(refreshToken).ifPresent(sessionRepo::delete);
    }
}
