package com.example.socialmedia.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Repository.UserFollowingRepository;

@Service
public class UserFollowingService {

    @Autowired
    private UserFollowingRepository userFollowingRepository;

    public UserFollowing followUser(Long userId, Long followerId) {
        UserFollowing userFollowing = new UserFollowing(userId, followerId);
        return userFollowingRepository.save(userFollowing);
    }

    public void unfollowUser(Long userId, Long followerId) {
        UserFollowing userFollowing = userFollowingRepository.findByUserIdAndFollowerId(userId, followerId);
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
}
