package com.example.socialmedia.Models;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "content", nullable = false)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_created", nullable = false, updatable = false)
    private Date dateCreated = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expiration_time", nullable = false)
    private Date expirationTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "archived", nullable = false)
    private boolean archived = false;

    public  Date calculateExpirationTime() {
        long currentTimeInMillis = this.dateCreated.getTime();
        long expirationTimeInMillis = currentTimeInMillis + (24 * 60 * 60 * 1000); // 24 hours in milliseconds
        return new Date(expirationTimeInMillis);
    }

    public long getRemainingHours() {
        Date now = new Date();
        long diffInMillis = expirationTime.getTime() - now.getTime();
        return TimeUnit.MILLISECONDS.toHours(diffInMillis);
    }

    public boolean expiredPost(Date expiredDate) {
        return expiredDate.before(new Date());
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public boolean getArchived() {
        return archived;
    }


    @Override
    public String toString() {
        return "Post{" +
                "id= " + id +
                ", content= '" + content + '\'' +
                ", dateCreated= " + dateCreated +
                ", expirationTime= " + expirationTime +
                ", user= " + user.getUsername() + 
                ", archived= " + archived +
                '}';
    }
}
