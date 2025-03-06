package com.example.socialmedia.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Repository.LikeRepository;
import com.example.socialmedia.Repository.PostRepository;
import com.example.socialmedia.Repository.UserFollowingRepository;
import com.example.socialmedia.dto.ArchievedResponse;
import com.example.socialmedia.dto.PostResponse;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserFollowingRepository userFollowingRepository;

    public List<PostResponse> getAllActivePosts(Long userId) {
        List<Post> posts = postRepository.findAllByExpirationTimeAfterAndArchivedFalse(new Date());
        Set<Long> followingUserIds = userFollowingRepository.findByUserId(userId)
                .stream()
                .map(userFollowing -> userFollowing.getFollowerId())
                .collect(Collectors.toSet());

        return posts.stream().map(post -> {
            int likeCount = likeRepository.countByPostId(post.getId());
            boolean isLiked = likeRepository.findByUserIdAndPostId(userId, post.getId()).isPresent();
            boolean isFollowed = followingUserIds.contains(post.getUser().getId());

            return new PostResponse(
                    post.getId(),
                    post.getContent(),
                    post.getDateCreated(),
                    post.getExpirationTime(),
                    post.getUser().getUsername(),
                    post.getRemainingHours(),
                    isFollowed,
                    post.getUser().getId(),
                    likeCount,
                    isLiked
            );
        }).collect(Collectors.toList());
    }

    public List<ArchievedResponse> getArchivedPosts(Long userId) {
        List<Post> posts = postRepository.findByUserIdAndArchivedTrue(userId);
        Set<Long> followingUserIds = userFollowingRepository.findByUserId(userId)
                .stream()
                .map(userFollowing -> userFollowing.getFollowerId())
                .collect(Collectors.toSet());

        return posts.stream().map(post -> {
            int likeCount = likeRepository.countByPostId(post.getId());
            boolean isLiked = likeRepository.findByUserIdAndPostId(userId, post.getId()).isPresent();
            boolean isFollowed = followingUserIds.contains(post.getUser().getId());
            int year = post.getExpirationTime().getYear() + 1900;
            int month = post.getExpirationTime().getMonth();
            int day = post.getExpirationTime().getDate();
            String dayExpired = month + "/" + day + "/" + year;

            return new ArchievedResponse(
                    post.getId(),
                    post.getContent(),
                    post.getDateCreated(),
                    dayExpired,
                    post.getUser().getUsername(),
                    post.getRemainingHours(),
                    isFollowed,
                    post.getUser().getId(),
                    likeCount,
                    isLiked
            );
        }).collect(Collectors.toList());
    }

    public List<PostResponse> getAllArchivedPosts(Long userId) {
        List<Post> posts = postRepository.findAllByArchivedTrue();
        Set<Long> followingUserIds = userFollowingRepository.findByUserId(userId)
                .stream()
                .map(userFollowing -> userFollowing.getFollowerId())
                .collect(Collectors.toSet());

        return posts.stream().map(post -> {
            int likeCount = likeRepository.countByPostId(post.getId());
            boolean isLiked = likeRepository.findByUserIdAndPostId(userId, post.getId()).isPresent();
            boolean isFollowed = followingUserIds.contains(post.getUser().getId());

            return new PostResponse(
                    post.getId(),
                    post.getContent(),
                    post.getDateCreated(),
                    post.getExpirationTime(),
                    post.getUser().getUsername(),
                    post.getRemainingHours(),
                    isFollowed,
                    post.getUser().getId(),
                    likeCount,
                    isLiked
            );
        }).collect(Collectors.toList());
    }

    public int getLikeCountForPost(Long postId) {
        return likeRepository.countByPostId(postId);
    }

    public boolean isPostLikedByUser(Long userId, Long postId) {
        return likeRepository.findByUserIdAndPostId(userId, postId).isPresent();
    }

    public boolean isUserFollowedByUser(Long userId, Long followedUserId) {
        return userFollowingRepository.findByUserIdAndFollowerId(userId, followedUserId) != null;
    }

    public ResponseEntity<PostResponse> getUserPost(Long userId) {
        Post post = postRepository.findFirstByUserIdAndArchivedFalseAndExpirationTimeAfter(userId, new Date()).orElse(null);
        if (post == null) {
            return ResponseEntity.ok(new PostResponse());
        }
        int likeCount = getLikeCountForPost(post.getId());
        boolean isLiked = isPostLikedByUser(userId, post.getId());
        boolean isFollowed = isUserFollowedByUser(userId, post.getUser().getId());
        PostResponse postResponse = new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours(),
                isFollowed,
                post.getUser().getId(),
                likeCount,
                isLiked
        );
        return ResponseEntity.ok(postResponse);
    }

    public ResponseEntity<PostResponse> getFriendsUser(Long userId, Long friendId) {
        Post post = postRepository.findFirstByUserIdAndArchivedFalseAndExpirationTimeAfter(friendId, new Date()).orElse(null);
        if (post == null) {
            return ResponseEntity.ok(new PostResponse());
        }
        int likeCount = getLikeCountForPost(post.getId());
        boolean isLiked = isPostLikedByUser(userId, post.getId());
        boolean isFollowed = isUserFollowedByUser(userId, post.getUser().getId());
        PostResponse postResponse = new PostResponse(
                post.getId(),
                post.getContent(),
                post.getDateCreated(),
                post.getExpirationTime(),
                post.getUser().getUsername(),
                post.getRemainingHours(),
                isFollowed,
                post.getUser().getId(),
                likeCount,
                isLiked
        );
        return ResponseEntity.ok(postResponse);
    }

}
