package com.example.socialmedia.Controller;

import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Service.SocialMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SocialMediaController {

    @Autowired
    private SocialMediaService socialMediaService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return socialMediaService.getAllUsers();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return socialMediaService.createUser(user);
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return socialMediaService.getAllPosts();
    }

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        return socialMediaService.createPost(post.getUser().getId(), post.getContent());
    }
}
