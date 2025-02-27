package com.example.socialmedia.Models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(name = "date_created", nullable = false)
    private Date dateCreated;

    @Column(name = "expiration_time", nullable = false)
    private Date expirationTime;

    @Column(name = "archived", nullable = false)
    private boolean archived;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

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

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getRemainingHours() {
        long diffInMillis = expirationTime.getTime() - new Date().getTime();
        return diffInMillis / (1000 * 60 * 60);
    }

    public boolean isExpired() {
        return new Date().after(expirationTime);
    }

    @Override
    public String toString() {
        return "Post{"
                + "id=" + id
                + ", content='" + content + '\''
                + ", dateCreated=" + dateCreated
                + ", expirationTime=" + expirationTime
                + ", archived=" + archived
                + ", user=" + user
                + '}';
    }
}
