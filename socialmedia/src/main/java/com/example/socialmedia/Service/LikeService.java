package com.example.socialmedia.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.socialmedia.Models.Like;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Repository.LikeRepository;
import com.example.socialmedia.Repository.PostRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

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

}
