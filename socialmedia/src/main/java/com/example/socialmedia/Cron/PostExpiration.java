package com.example.socialmedia.Cron;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.socialmedia.Service.SocialMediaService;

@Component
public class PostExpiration {

    @Autowired
    private SocialMediaService socialMediaService;

    @Scheduled(cron = "0 0 * * * *")
    public void archivePosts() {
        socialMediaService.archiveExpiredPosts();
    }
}
