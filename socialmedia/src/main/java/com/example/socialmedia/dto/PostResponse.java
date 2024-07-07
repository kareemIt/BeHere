package com.example.socialmedia.dto;

import java.util.Date;

public class PostResponse {
    private Long id;
    private String content;
    private Date dateCreated;
    private Date expirationTime;
    private String username;
    private long remainingHours;

    public PostResponse(Long id, String content, Date dateCreated, Date expirationTime, String username, long remainingHours) {
        this.id = id;
        this.content = content;
        this.dateCreated = dateCreated;
        this.expirationTime = expirationTime;
        this.username = username;
        this.remainingHours = remainingHours;
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
}
