package com.example.socialmedia.Service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.socialmedia.Controller.SocialMediaController;
import com.example.socialmedia.Models.User;

@Service
public class UserCreationService {

    @Autowired
    private SocialMediaController socialMediaController;

    public void createUser() {
        System.out.println("Started process");
        User user = new User();
        user.setBio("test");
        user.setDateCreated(new Date());
        user.setEmail("test");
        user.setId(1L);
        user.setUsername("testTest");
        user.setPassword("password");

        System.out.println(user);
        System.out.println("Finished process");

        socialMediaController.createUser(user);
    }
}
