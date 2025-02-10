package com.example.socialmedia.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.socialmedia.Models.User;
import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Repository.UserFollowingRepository;
import com.example.socialmedia.Repository.UserRepository;

@Service
public class UserFollowingService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserFollowingRepository userFollowingRepository;

    public UserFollowing followUser(Long userId, Long followerId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        User follower = userRepository.findById(followerId).orElseThrow(() -> new IllegalArgumentException("Follower not found"));
        UserFollowing userFollowing = new UserFollowing(user.getId(), follower.getId());
        return userFollowingRepository.save(userFollowing);
    }

    public void unfollowUser(Long userId, Long followerId) {
        UserFollowing userFollowing = userFollowingRepository.findByUserIdAndFollowerId(userId, followerId)
                .orElseThrow(() -> new IllegalArgumentException("UserFollowing not found"));
        userFollowingRepository.delete(userFollowing);
    }

    public Set<UserFollowing> getFollowers(Long userId) {
        List<UserFollowing> followersList = userFollowingRepository.findByUserId(userId);
        return new HashSet<>(followersList);
    }

    public Set<UserFollowing> getFollowing(Long followerId) {
        List<UserFollowing> followingList = userFollowingRepository.findByFollowerId(followerId);
        return new HashSet<>(followingList);
    }

    public List<UserFollowing> getFollowingByUserId(Long userId) {
        return userFollowingRepository.findByUserId(userId);
    }
}
