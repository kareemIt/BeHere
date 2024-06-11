package com.example.socialmedia.Service;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;


    public void checkPostDate(Post post) {
        Date currentDate = new Date();
        long diffInMillies = Math.abs(currentDate.getTime() - post.getDateCreated().getTime());
        long diffInDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);

        if (diffInDays == 0) {
            System.err.println("Post was created within the same day");
            System.err.println(post.toString());
        }
    }
}
