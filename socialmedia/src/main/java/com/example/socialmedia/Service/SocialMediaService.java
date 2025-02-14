package com.example.socialmedia.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.socialmedia.Exceptions.UserAlreadyExistsException;
import com.example.socialmedia.Models.Bio;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Repository.PostRepository;
import com.example.socialmedia.Repository.UserRepository;

@Service
@Transactional
public class SocialMediaService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    private LikeService likeService;

    private PostService postService;

    @Autowired
    public void setLikeService(LikeService likeService) {
        this.likeService = likeService;
    }

    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    @Autowired
    private UserFollowingService userFollowingService;

    public User createUser(User user) throws UserAlreadyExistsException {
        Optional<User> userDB = userRepository.findByUsername(user.getUsername());
        if (userDB.isPresent()) {
            throw new UserAlreadyExistsException("User with username " + user.getUsername() + " already exists.");
        }
        user.setDateCreated(new Date());
        return userRepository.save(user);
    }

    public Post createPost(Long userId, String content) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Post post = new Post();
        post.setUser(user);
        post.setContent(content);
        post.setDateCreated(new Date());
        post.setExpirationTime(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)); // 24 hours from now
        post.setArchived(false);
        return postRepository.save(post);
    }

    public void deleteExpiredPosts() {
        Date now = new Date();
        List<Post> expiredPosts = postRepository.findAllByExpirationTimeBefore(now);
        if (expiredPosts.isEmpty()) {
            System.out.println("No expired posts to delete.");
        } else {
            postRepository.deleteAll(expiredPosts);
            System.out.println("Deleted " + expiredPosts.size() + " expired posts.");
        }
    }

    public Post getAPost(Long userId) {
        return postRepository.findFirstByUserIdAndDateCreated(userId, new Date()).orElse(null);
    }

    public Bio getAUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            int totalLikes = likeService.getLikeCountForUser(id);
            Set<UserFollowing> followers = userFollowingService.getFollowers(id);
            Set<UserFollowing> following = userFollowingService.getFollowing(id);
            Bio bio = new Bio();
            bio.setUsername(user.getUsername());
            bio.setFollowersCount(followers.size());
            bio.setFollowingCount(following.size());
            bio.setTotalLikes(totalLikes);
            bio.setPostingStreak(user.getPostingStreak());
            bio.setBio(user.getBio());
            return bio;
        }
        return null;
    }

    public User getAUser(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.orElse(null);
    }

    public Post getActivePost(Long userId) {
        Date now = new Date();
        Optional<Post> optionalPost = postRepository.findFirstByUserIdAndArchivedFalseAndExpirationTimeAfter(userId, now);
        return optionalPost.orElse(null);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getAllActivePosts() {
        return postRepository.findAllByExpirationTimeAfterAndArchivedFalse(new Date());
    }

    public List<Post> getAllArchivedPosts() {
        return postRepository.findAllByArchivedTrue();
    }

    public List<Post> getUserActivePosts(Long userId) {
        Date now = new Date();
        return postRepository.findByUserIdAndExpirationTimeAfterAndArchivedFalse(userId, now);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean postExistsForUserToday(Long userId) {
        Optional<Post> post = postRepository.findFirstByUserIdAndDateCreated(userId, new Date());
        return post.isPresent();
    }

    public List<Post> getArchivedPostsByUserId(Long userId) {
        return postRepository.findByUserIdAndArchivedTrue(userId);
    }

    public void archiveExpiredPosts() {
        List<Post> postsToArchive = postRepository.findAllByExpirationTimeBeforeAndArchivedFalse(new Date());
        for (Post post : postsToArchive) {
            post.setArchived(true);
            postRepository.save(post);
        }
    }

    public void followUser(Long userId, Long followerId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User follower = userRepository.findById(followerId).orElseThrow(() -> new RuntimeException("Follower not found"));
        user.getFollowers().add(follower);
        userRepository.save(user);
    }

    public void unfollowUser(Long userId, Long followerId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User follower = userRepository.findById(followerId).orElseThrow(() -> new RuntimeException("Follower not found"));
        user.getFollowers().remove(follower);
        userRepository.save(user);
    }

    public Set<User> getFollowers(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFollowers();
    }

    public Set<User> getFollowing(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFollowing();
    }

    public int getLikeCountForUser(Long userId) {
        return likeService.getLikeCountForUser(userId);
    }
}
