package com.example.socialmedia.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.socialmedia.Models.UserFollowing;

@Repository
public interface UserFollowingRepository extends JpaRepository<UserFollowing, Long> {

    List<UserFollowing> findByUserId(Long userId);

    List<UserFollowing> findByFollowerId(Long followerId);

    Optional<UserFollowing> findByUserIdAndFollowerId(Long userId, Long followerId);
}
