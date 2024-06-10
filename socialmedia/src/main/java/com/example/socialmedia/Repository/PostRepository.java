package com.example.socialmedia.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.Models.Post;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findById(Long id);
    List<Post> findAll();
    @SuppressWarnings("unchecked")
    Post save(Post post);
    List<Post> findAllByExpirationTimeBefore(Date date);
    void deleteById(Long id);
}
