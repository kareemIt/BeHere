package com.example.socialmedia.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.socialmedia.Exceptions.UserAlreadyExistsException;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Repository.PostRepository;
import com.example.socialmedia.Repository.UserRepository;

@Service
@Transactional
public class SocialMediaService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public User createUser(User user) {
        Optional<User> userDB = userRepository.findByUsername(user.getUsername());
        if (userDB.isPresent()) {
            throw new UserAlreadyExistsException("User with username " + user.getUsername() + " already exists.");
        }
        user.setUsername(user.getUsername());
        user.setEmail(user.getEmail());
        user.setPassword(user.getPassword());
        user.setBio(user.getBio());
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

    public User getAUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    public User getAUser(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.orElse(null);
    }

    public Post getActivePost(Long userId) {
        Date now = new Date();
        Optional<Post> optionalPost = postRepository.findFirstByUserIdAndDateCreatedAndArchivedFalse(userId, now);
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

    public void archiveExpiredPosts() {
        List<Post> postsToArchive = postRepository.findAllByExpirationTimeBeforeAndArchivedFalse(new Date());
        for (Post post : postsToArchive) {
            post.setArchived(true);
            postRepository.save(post);
        }
    }

}
