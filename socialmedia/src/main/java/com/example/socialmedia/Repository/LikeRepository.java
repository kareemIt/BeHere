package com.example.socialmedia.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.Models.Like;
import com.example.socialmedia.Models.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);

    int countByPostUser(User user);

    int countByPostId(Long postId);

    int countBy();

    int countByUserId(Long userId);
}
