package com.example.socialmedia.Controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
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
import com.example.socialmedia.Models.LoginRequest;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.PostRequest;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Service.SocialMediaService;
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if (userService.authenticateUser(username, password)) {
            User user = socialMediaService.getAUser(username);
            Long userId = user.getId();
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/posts")
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<Post> posts = socialMediaService.getAllPosts();
        List<PostResponse> postResponses = posts.stream().map(post -> new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours()
        )).collect(Collectors.toList());
         //archieved check here skip it before getting

        return ResponseEntity.ok(postResponses);
    }

    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest) {
        Long userId = postRequest.getUserId();
        String content = postRequest.getContent();
        //archieved check before posting

        Optional<Post> existingPostOptional = Optional.ofNullable(socialMediaService.getAPost(userId));

        if (existingPostOptional.isPresent()) {
            Post existingPost = existingPostOptional.get();
            Date expirationTime = existingPost.getExpirationTime();

            if (!existingPost.expiredPost(expirationTime)) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Post already created today");
            }
        }

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
