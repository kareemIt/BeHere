package com.example.socialmedia.Controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.DTO.FollowerResponse;
import com.example.socialmedia.Models.Bio;
import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Service.SocialMediaService;
import com.example.socialmedia.Service.UserFollowingService;

@RestController
@RequestMapping("/api")
public class FollowingController {

    @Autowired
    private SocialMediaService socialMediaService;

    @Autowired
    private UserFollowingService userFollowingService;

    @PostMapping("/{userId}/follow/{followerId}")
    public ResponseEntity<UserFollowing> followUser(@PathVariable Long userId, @PathVariable Long followerId) {
        UserFollowing userFollowing = userFollowingService.followUser(userId, followerId);
        return ResponseEntity.ok(userFollowing);
    }

    @DeleteMapping("/{userId}/unfollow/{followerId}")
    public ResponseEntity<?> unfollowUser(@PathVariable Long userId, @PathVariable Long followerId) {
        userFollowingService.unfollowUser(userId, followerId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<Set<UserFollowing>> getFollowers(@PathVariable Long userId) {
        Set<UserFollowing> followers = userFollowingService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/{userId}/followingList")
    public ResponseEntity<List<FollowerResponse>> getFollowingByUserId(@PathVariable Long userId) {
        List<UserFollowing> userFollowingList = userFollowingService.getFollowingByUserId(userId);
        List<FollowerResponse> followingList = userFollowingList.stream()
                .map(userFollowing -> {
                    Long followerId = userFollowing.getFollowerId();
                    Bio followerUsername = socialMediaService.getAUser(followerId);
                    return new FollowerResponse(followerId, followerUsername.getUsername());
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(followingList);
    }
}
