package com.example.socialmedia.Controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Service.SocialMediaService;
import com.example.socialmedia.Service.UserFollowingService;
import com.example.socialmedia.Service.UserService;

@RestController
@RequestMapping("/api")
public class FollowingController {

    @Autowired
    private SocialMediaService socialMediaService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserFollowingService userFollowingService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/{userId}/follow/{followerId}")
    public ResponseEntity<?> followUser(@PathVariable Long userId, @PathVariable Long followerId) {
        userFollowingService.followUser(userId, followerId);
        return ResponseEntity.ok("User followed successfully");
    }

    @PostMapping("/{userId}/unfollow/{followerId}")
    public ResponseEntity<?> unfollowUser(@PathVariable Long userId, @PathVariable Long followerId) {
        userFollowingService.unfollowUser(userId, followerId);
        return ResponseEntity.ok("User unfollowed successfully");
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<Set<UserFollowing>> getFollowers(@PathVariable Long userId) {
        Set<UserFollowing> followers = userFollowingService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<Set<UserFollowing>> getFollowing(@PathVariable Long userId) {
        Set<UserFollowing> following = userFollowingService.getFollowing(userId);
        return ResponseEntity.ok(following);
    }

}
