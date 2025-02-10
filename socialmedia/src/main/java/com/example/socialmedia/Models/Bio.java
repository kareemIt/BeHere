package com.example.socialmedia.Models;

public class Bio {

    private String bio;
    private int followersCount;
    private int followingCount;
    private int totalLikes;
    private int postingStreak;
    private String username;

    public Bio() {
    }

    public Bio(String bio, int followersCount, int followingCount, int totalLikes, int postingStreak, String username) {
        this.bio = bio;
        this.followersCount = followersCount;
        this.followingCount = followingCount;
        this.totalLikes = totalLikes;
        this.postingStreak = postingStreak;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public int getFollowersCount() {
        return followersCount;
    }

    public void setFollowersCount(int followersCount) {
        this.followersCount = followersCount;
    }

    public int getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(int followingCount) {
        this.followingCount = followingCount;
    }

    public int getTotalLikes() {
        return totalLikes;
    }

    public void setTotalLikes(int totalLikes) {
        this.totalLikes = totalLikes;
    }

    public int getPostingStreak() {
        return postingStreak;
    }

    public void setPostingStreak(int postingStreak) {
        this.postingStreak = postingStreak;
    }
}
