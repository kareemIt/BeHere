package com.example.socialmedia.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.Models.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Override
    Optional<Post> findById(Long id);
    Optional<Post> findByUserId(Long id);
    Optional<Post> findFirstByUserIdAndDateCreated(Long userId, Date dateCreated);
    @Override
    List<Post> findAll();
    @SuppressWarnings("unchecked")
    @Override
    Post save(Post post);
    List<Post> findAllByExpirationTimeBefore(Date date);
    @Override
    void deleteById(Long id);
}
