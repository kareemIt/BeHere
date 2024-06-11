package com.example.socialmedia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.socialmedia.Service.UserCreationService;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
@ComponentScan(basePackages = { "com.example.socialmedia" })
public class SocialmediaApplication {

     @Autowired
    private UserCreationService userCreationService;

    public static void main(String[] args) {
        SpringApplication.run(SocialmediaApplication.class, args);
    }

    @PostConstruct
    public void init() {
        // userCreationService.createUser();
        userCreationService.createPost();
    }

}
