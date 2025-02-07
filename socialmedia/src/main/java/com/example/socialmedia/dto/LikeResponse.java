package com.example.socialmedia.dto;

public class LikeResponse {

    private String message;
    private int likeCount;

    public LikeResponse(String message, int likeCount) {
        this.message = message;
        this.likeCount = likeCount;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
}
