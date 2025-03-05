package com.example.socialmedia.dto;

import java.util.Date;

public class PostResponse {

    private Long id;
    private String content;
    private Date dateCreated;
    private Date expirationTime;
    private String username;
    private long remainingHours;
    private boolean isFollowed;
    private Long userId;
    private int likeCount;
    private boolean isLiked;
    private int likes;

    public PostResponse() {
    }

    public PostResponse(Long id, String content, Date dateCreated, Date expirationTime, String username, long remainingHours, boolean isFollowed, Long userId, int likeCount, boolean isLiked) {
        this.id = id;
        this.content = content;
        this.dateCreated = dateCreated;
        this.expirationTime = expirationTime;
        this.username = username;
        this.remainingHours = remainingHours;
        this.isFollowed = isFollowed;
        this.userId = userId;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isFollowed() {
        return isFollowed;
    }

    public void setFollowed(boolean isFollowed) {
        this.isFollowed = isFollowed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Date expirationTime) {
        this.expirationTime = expirationTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getRemainingHours() {
        return remainingHours;
    }

    public void setRemainingHours(long remainingHours) {
        this.remainingHours = remainingHours;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public boolean isLiked() {
        return isLiked;
    }

    public void setLiked(boolean liked) {
        this.isLiked = liked;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private Long id;
        private String content;
        private Long userId;
        private String username;
        private Date dateCreated;
        private Date expirationTime;
        private boolean isFollowed;
        private boolean liked;
        private int likeCount;
        private int remainingHours;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder content(String content) {
            this.content = content;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder dateCreated(Date dateCreated) {
            this.dateCreated = dateCreated;
            return this;
        }

        public Builder expirationTime(Date expirationTime) {
            this.expirationTime = expirationTime;
            return this;
        }

        public Builder followed(boolean isFollowed) {
            this.isFollowed = isFollowed;
            return this;
        }

        public Builder liked(boolean liked) {
            this.liked = liked;
            return this;
        }

        public Builder likeCount(int likeCount) {
            this.likeCount = likeCount;
            return this;
        }

        public Builder remainingHours(int remainingHours) {
            this.remainingHours = remainingHours;
            return this;
        }

        public PostResponse build() {
            PostResponse postResponse = new PostResponse();
            postResponse.id = this.id;
            postResponse.content = this.content;
            postResponse.userId = this.userId;
            postResponse.username = this.username;
            postResponse.dateCreated = this.dateCreated;
            postResponse.expirationTime = this.expirationTime;
            postResponse.isFollowed = this.isFollowed;
            postResponse.isLiked = this.liked;
            postResponse.likeCount = this.likeCount;
            postResponse.remainingHours = this.remainingHours;
            return postResponse;
        }
    }
}
