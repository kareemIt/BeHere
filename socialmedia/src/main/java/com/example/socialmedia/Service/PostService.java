package com.example.socialmedia.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Repository.LikeRepository;
import com.example.socialmedia.Repository.UserFollowingRepository;
import com.example.socialmedia.dto.PostResponse;

@Service
public class PostService {

    @Autowired
    private SocialMediaService socialMediaService;

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserFollowingRepository userFollowingRepository;

    public List<PostResponse> getAllActivePosts(Long userId) {
        List<Post> posts = socialMediaService.getAllActivePosts();
        Set<Long> followingUserIds = userFollowingRepository.findByUserId(userId)
                .stream()
                .map(UserFollowing::getFollowerId)
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

    public List<PostResponse> getArchivedPosts(Long userId) {
        List<Post> posts = socialMediaService.getArchivedPostsByUserId(userId);
        Set<Long> followingUserIds = userFollowingRepository.findByUserId(userId)
                .stream()
                .map(UserFollowing::getFollowerId)
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

    public List<PostResponse> getAllArchivedPosts(Long userId) {
        List<Post> posts = socialMediaService.getAllArchivedPosts();
        Set<Long> followingUserIds = userFollowingRepository.findByUserId(userId)
                .stream()
                .map(UserFollowing::getFollowerId)
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
}
