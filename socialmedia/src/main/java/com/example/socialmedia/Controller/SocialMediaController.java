package com.example.socialmedia.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.Exceptions.UserAlreadyExistsException;
import com.example.socialmedia.Models.LoginRequest;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Service.PostService;
import com.example.socialmedia.Service.SocialMediaService;
import com.example.socialmedia.Service.UserService;

@RestController
@RequestMapping("/api")
public class SocialMediaController {

    @Autowired
    private SocialMediaService socialMediaService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return socialMediaService.getAllUsers();
    }

    @GetMapping("/user")
    public User getUser(Long id) {
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
    public List<Post> getAllPosts() {
        return socialMediaService.getAllPosts();
    }

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        postService.checkPostDate(post);
        return socialMediaService.createPost(post.getUser().getId(), post.getContent());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
