package com.example.socialmedia.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.Models.User;
import com.example.socialmedia.Service.LikeService;
import com.example.socialmedia.dto.LikeResponse;
import com.example.socialmedia.dto.PostResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${frontend.url}")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/users/{userId}/like/{postId}")
    public ResponseEntity<?> toggleLike(@PathVariable Long userId, @PathVariable Long postId) {
        User user = new User();
        user.setId(userId);
        boolean liked = likeService.toggleLike(user, postId);
        int likeCount = likeService.getLikeCountForPost(postId);
        String message = liked ? "Like added successfully" : "Like removed successfully";
        LikeResponse response = new LikeResponse(message, likeCount);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/likes/{postId}")
    public ResponseEntity<Integer> getLikeCountForPost(@PathVariable Long postId) {
        int likeCount = likeService.getLikeCountForPost(postId);
        return ResponseEntity.ok(likeCount);
    }

    @GetMapping("/likes/total")
    public ResponseEntity<Integer> getTotalLikeCount() {
        int totalLikeCount = likeService.getTotalLikeCount();
        return ResponseEntity.ok(totalLikeCount);
    }

    @GetMapping("/trending/{userId}")
    public ResponseEntity<List<PostResponse>> getTrendingPosts(@PathVariable Long userId) {
        List<PostResponse> trendingPosts = likeService.getTrendingPosts(userId);
        return ResponseEntity.ok(trendingPosts);
    }
}
