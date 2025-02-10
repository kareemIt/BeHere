package com.example.socialmedia.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.Models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Override
    Optional<User> findById(Long id);

    @Override
    List<User> findAll();

    @SuppressWarnings("unchecked")
    @Override
    User save(User user);

    @Override
    void deleteById(Long id);

    Optional<User> findByUsername(String username);

}
