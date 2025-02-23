package com.example.socialmedia.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.socialmedia.DTO.SearchResponse;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired(required = true)
    private BCryptPasswordEncoder passwordEncoder;

    public boolean authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user != null) {
            // Use bcrypt to verify password
            return passwordEncoder.matches(password, user.get().getPassword());
        }
        return false;
    }

    public List<SearchResponse> searchUsers(String keyword) {
        List<User> users = userRepository.searchByUsername(keyword);
        return users.stream()
                .map(user -> new SearchResponse(user.getId(), user.getUsername()))
                .collect(Collectors.toList());
    }

}
