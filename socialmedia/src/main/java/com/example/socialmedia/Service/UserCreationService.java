// package com.example.socialmedia.Service;

// import java.util.Date;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.socialmedia.Controller.SocialMediaController;
// import com.example.socialmedia.Models.Post;
// import com.example.socialmedia.Models.User;

// @Service
// public class UserCreationService {

//     @Autowired
//     private SocialMediaController socialMediaController;

//     public void createUser() {
//         User user = new User();
//         user.setBio("test");
//         user.setDateCreated(new Date());
//         user.setEmail("test");
//         user.setId(1L);
//         user.setUsername("testTest");
//         user.setPassword("password");

//         socialMediaController.createUser(user);
//     }

//     public void createPost() {
//         Post post = new Post();
//         post.setContent("test");
//         post.setDateCreated(new Date());
//         post.setId(1L);
//         User user = socialMediaController.getUser(1L);
//         post.setUser(user);
//         post.setExpirationTime(post.calculateExpirationTime());

//         socialMediaController.createPost(post);
//     }
// }
