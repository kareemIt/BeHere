package com.example.socialmedia.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.socialmedia.Models.Like;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Repository.LikeRepository;
import com.example.socialmedia.Repository.PostRepository;
import com.example.socialmedia.dto.PostResponse;

@Service
@Transactional
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

    private PostService postService;

    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    // Removed SocialMediaService dependency to break the cycle
    public Optional<Like> findLikeByUserIdAndPostId(Long userId, Long postId) {
        return likeRepository.findByUserIdAndPostId(userId, postId);
    }

    public int countLikesByUser(User user) {
        return likeRepository.countByPostUser(user);
    }

    public Like saveLike(Like like) {
        return likeRepository.save(like);
    }

    public void deleteLike(Like like) {
        likeRepository.delete(like);
    }

    public boolean toggleLike(User user, Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (!postOptional.isPresent()) {
            throw new IllegalArgumentException("Post with ID " + postId + " does not exist");
        }

        Post post = postOptional.get();
        Optional<Like> existingLike = likeRepository.findByUserIdAndPostId(user.getId(), post.getId());
        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            return false; // Like removed
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setPost(post);
            likeRepository.save(like);
            return true; // Like added
        }
    }

    public int getLikeCountForPost(Long postId) {
        return likeRepository.countByPostId(postId);
    }

    public int getTotalLikeCount() {
        return (int) likeRepository.count();
    }

    public int getLikeCountForUser(Long userId) {
        return likeRepository.countByUserId(userId);
    }

    // UPDATED: Now using PostRepository directly to obtain active posts instead of SocialMediaService
    public List<PostResponse> getTrendingPosts() {
        List<Post> allActivePosts = postRepository.findAllByExpirationTimeAfterAndArchivedFalse(new Date());
        List<PostResponse> trendingList = allActivePosts.stream().map(post -> {
            int likeCount = getLikeCountForPost(post.getId());
            boolean isLiked = postService.isPostLikedByUser(post.getUser().getId(), post.getId());
            boolean isFollowed = postService.isUserFollowedByUser(post.getUser().getId(), post.getUser().getId());

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
            postResponse.setLikes(likeCount);
            return postResponse;
        }).collect(Collectors.toList());

        return trendingList.stream()
                .sorted((p1, p2) -> Integer.compare(p2.getLikes(), p1.getLikes()))
                .collect(Collectors.toList());
    }
}
