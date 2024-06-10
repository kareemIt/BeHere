package com.example.socialmedia.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.Models.User;

    @Repository
    public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findById(Long id);
        List<User> findAll();
        @SuppressWarnings("unchecked")
        User save(User user);
        void deleteById(Long id);
        
        List<User> findAllByExpirationTimeBefore(Date date);
    }
