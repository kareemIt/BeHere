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

    // Post findTopByUserIdOrderByCreatedAtDesc(Long userId);
    List<Post> findByUserIdAndExpirationTimeAfterAndArchivedFalse(Long userId, Date now);

    @SuppressWarnings("unchecked")
    @Override
    Post save(Post post);

    List<Post> findAllByArchivedTrue();

    List<Post> findAllByUserId(Long userId);

    Optional<Post> findFirstByUserIdAndDateCreatedAndArchivedFalse(Long userId, Date dateCreated);

    List<Post> findByUserIdAndArchivedTrue(Long userId);

    Optional<Post> findFirstByUserIdAndArchivedFalseAndExpirationTimeAfter(Long userId, Date now);

    List<Post> findAllByExpirationTimeBefore(Date date);

    List<Post> findAllByExpirationTimeAfterAndArchivedFalse(Date date);

    @Override
    void deleteAll(Iterable<? extends Post> entities);

    List<Post> findAllByExpirationTimeBeforeAndArchivedFalse(Date date);

    @Override
    void deleteById(Long id);
}
