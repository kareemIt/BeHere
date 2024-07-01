package com.example.socialmedia.Models;

public class PostRequest {

    private Long userId;
    private String content;

    public String getContent() {
        return content;
    }

    public void setId(String content) {
        this.content = content;
    }

    public Long getUserId() {
        return userId;
    }

    public void setId(Long userId) {
        this.userId = userId;
    }

}
