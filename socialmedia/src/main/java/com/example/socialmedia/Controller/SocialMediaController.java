package com.example.socialmedia.Controller;

import java.util.List;

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
import com.example.socialmedia.Models.Bio;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.PostRequest;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Service.PostService;
import com.example.socialmedia.Service.SocialMediaService;
import com.example.socialmedia.dto.PostResponse;

@RestController
@RequestMapping("/api")
public class SocialMediaController {

    @Autowired
    private SocialMediaService socialMediaService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private PostService postService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return socialMediaService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public Bio getUser(@PathVariable Long id) {
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
        List<PostResponse> postsList = postService.getAllActivePosts(id);
        return ResponseEntity.ok(postsList);
    }

    @GetMapping("/posts/allActivePosts/{id}")
    public ResponseEntity<List<PostResponse>> getAllActivePosts(@PathVariable Long id) {
        List<PostResponse> postResponses = postService.getAllActivePosts(id);
        return ResponseEntity.ok(postResponses);
    }

    @GetMapping("/posts/active/{id}")
    public ResponseEntity<PostResponse> getUserPost(@PathVariable Long id) {
        Post post = socialMediaService.getActivePost(id);
        if (post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        int likeCount = postService.getLikeCountForPost(post.getId());
        boolean isLiked = postService.isPostLikedByUser(id, post.getId());
        boolean isFollowed = postService.isUserFollowedByUser(id, post.getUser().getId());

        PostResponse postResponse = new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours(),
                isFollowed,
                post.getUser().getId(),
                likeCount,
                isLiked
        );
        return ResponseEntity.ok(postResponse);
    }

    @GetMapping("/posts/archived/{id}")
    public ResponseEntity<List<PostResponse>> getArchivedPosts(@PathVariable Long id) {
        List<PostResponse> postResponses = postService.getArchivedPosts(id);
        return ResponseEntity.ok(postResponses);
    }

    @GetMapping("/posts/allArchivedPosts/{id}")
    public ResponseEntity<List<PostResponse>> getAllArchivedPosts(@PathVariable Long id) {
        List<PostResponse> postResponses = postService.getAllArchivedPosts(id);
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

}
