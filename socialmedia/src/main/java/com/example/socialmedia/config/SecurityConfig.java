package com.example.socialmedia.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import com.example.socialmedia.service.CustomUserDetailsService;
import com.example.socialmedia.util.JwtRequestFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource)) // Enable CORS
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API requests
                .authorizeHttpRequests(authorizeRequests
                        -> authorizeRequests
                        .requestMatchers(
                                "/api/user/**", // Covers user-related endpoints (bio, profile, etc.)
                                "/followingList", // Allow access to following list
                                "/{userId}/follow/**", // Covers both follow & unfollow
                                "/api/posts/**", // Covers all post-related routes
                                "/api/users", // Allow user listing
                                "/api/**", // Covers all API endpoints
                                "/api/login", // Allow login access
                                "/authenticate", // Authentication route
                                "/auth/**", // Covers all authentication-related endpoints
                                "/user/**",
                                "/api/user/**",
                                "/api/*/follow/**",
                                "/secured-endpoint" // Specific secured endpoint
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement
                        -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Stateless sessions
                );

        // Add JWT filter before the UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder
                = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }
}
