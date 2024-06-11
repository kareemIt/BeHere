package com.example.socialmedia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "com.example.socialmedia" })
public class SocialmediaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialmediaApplication.class, args);
    }

}
