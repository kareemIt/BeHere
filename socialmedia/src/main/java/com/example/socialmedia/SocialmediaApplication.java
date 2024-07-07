package com.example.socialmedia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
@ComponentScan(basePackages = { "com.example.socialmedia" })
@EnableScheduling
public class SocialmediaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialmediaApplication.class, args);
    }

    @PostConstruct
    public void init() {
        // userCreationService.createUser();
        // userCreationService.createPost();
    }

}
