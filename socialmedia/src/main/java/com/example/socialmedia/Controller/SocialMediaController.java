package com.example.socialmedia.Controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.Exceptions.UserAlreadyExistsException;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.PostRequest;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Service.SocialMediaService;
import com.example.socialmedia.Service.UserFollowingService;
import com.example.socialmedia.Service.UserService;
import com.example.socialmedia.dto.PostResponse;

@RestController
@RequestMapping("/api")
public class SocialMediaController {

    @Autowired
    private SocialMediaService socialMediaService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserFollowingService userFollowingService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return socialMediaService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return socialMediaService.getAUser(id);
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User createdUser = socialMediaService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<List<PostResponse>> getAllPosts(@PathVariable Long id) {
        List<Post> posts = socialMediaService.getAllPosts();
        Set<UserFollowing> followers = userFollowingService.getFollowers(id);
        boolean isFollowed = followers.stream().anyMatch(follower -> follower.getFollowerId().equals(id));
        List<PostResponse> postResponses = posts.stream().map(post -> new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours(),
                isFollowed,
                post.getUser().getId()
        )).collect(Collectors.toList());

        return ResponseEntity.ok(postResponses);
    }

    @GetMapping("/posts/allActivePosts/{id}")
    public ResponseEntity<List<PostResponse>> getAllActivePosts(@PathVariable Long id) {
        List<Post> posts = socialMediaService.getAllActivePosts();
        List<PostResponse> postResponses = posts.stream().map(post -> {
            Set<UserFollowing> followers = userFollowingService.getFollowers(id);
            boolean isFollowed = followers.stream().anyMatch(follower -> follower.getFollowerId().equals(post.getUser().getId()));
            return new PostResponse(
                    post.getId(),
                    post.getContent(),
                    post.getDateCreated(),
                    post.getExpirationTime(),
                    post.getUser().getUsername(),
                    post.getRemainingHours(),
                    isFollowed,
                    post.getUser().getId()
            );
        }).collect(Collectors.toList());

        return ResponseEntity.ok(postResponses);
    }

    @GetMapping("/posts/active/{id}")
    public ResponseEntity<PostResponse> getUserPost(@PathVariable Long id) {
        Post post = socialMediaService.getActivePost(id);
        Set<User> followers = socialMediaService.getFollowers(id);
        boolean isFollowed = followers.contains(post.getUser());
        PostResponse postResponse = new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours(),
                isFollowed,
                post.getUser().getId()
        );
        return ResponseEntity.ok(postResponse);
    }

    @GetMapping("/posts/archived/{id}")
    public ResponseEntity<List<PostResponse>> getArchivedPosts(@PathVariable Long id) {
        List<Post> posts = socialMediaService.getArchivedPostsByUserId(id);
        boolean isFollowed = true;
        List<PostResponse> postResponses = posts.stream().map(post -> new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours(),
                isFollowed,
                post.getUser().getId()
        )).collect(Collectors.toList());

        return ResponseEntity.ok(postResponses);
    }

    @GetMapping("/posts/archived")
    public ResponseEntity<List<PostResponse>> getAllArchivedPosts() {
        List<Post> posts = socialMediaService.getAllArchivedPosts();
        boolean isFollowed = true;

        List<PostResponse> postResponses = posts.stream().map(post -> new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours(),
                isFollowed,
                post.getUser().getId()
        )).collect(Collectors.toList());

        return ResponseEntity.ok(postResponses);
    }

    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest) {
        Long userId = postRequest.getUserId();
        String content = postRequest.getContent();

        Post existingPost = socialMediaService.getActivePost(userId);

        if (existingPost != null) {
            // Check if the existing post is expired
            if (!existingPost.isExpired()) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Post already created today");
            }
        }

        // Create a new post if no active post is found or if the existing post is expired
        Post newPost = socialMediaService.createPost(userId, content);
        if (newPost != null) {
            return ResponseEntity.ok(newPost);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create post");
        }
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@RequestBody Long userId, @PathVariable Long postId) {
        socialMediaService.likePost(userId, postId);
        return ResponseEntity.ok("Post liked successfully");
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<?> unlikePost(@RequestBody Long userId, @PathVariable Long postId) {
        socialMediaService.unlikePost(userId, postId);
        return ResponseEntity.ok("Post unliked successfully");
    }

    @GetMapping("/{postId}/likes")
    public ResponseEntity<Integer> getLikeCount(@PathVariable Long postId) {
        int likeCount = socialMediaService.getLikeCount(postId);
        return ResponseEntity.ok(likeCount);
    }

    @GetMapping("/users/{id}/totalLikes")
    public ResponseEntity<Integer> getTotalLikesForUser(@PathVariable Long id) {
        int totalLikes = socialMediaService.getTotalLikesForUser(id);
        return ResponseEntity.ok(totalLikes);
    }

}
