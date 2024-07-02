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
        if(userDB.isPresent()){
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
        return postRepository.save(post);
    }

    public void deleteExpiredPosts() {
        List<Post> expiredPosts = postRepository.findAllByExpirationTimeBefore(new Date());
        postRepository.deleteAll(expiredPosts);
    }

    public Post getAPost(Long id){
        Optional<Post> optionaPost = postRepository.findByUserId(id);
        Post Post = optionaPost.get();
        return Post;
    }
    public User getAUser(Long id){
        Optional<User> optionalUser = userRepository.findById(id);
        User user = optionalUser.get();
        return user;
    }
    public User getAUser(String username){
        Optional<User> optionalUser = userRepository.findByUsername(username);
        User user = optionalUser.get();
        return user;

    }

    public List<Post> getAllPosts(){
        List<Post> AllPosts = postRepository.findAll();
        return AllPosts;
    }
    public List<User> getAllUsers(){
        List<User> allUsers = userRepository.findAll();
        return allUsers;
    }

    public boolean postExistsForUserToday(Long userId) {
        Optional<Post> post = postRepository.findFirstByUserIdAndDateCreated(userId, new Date());
        return post.isPresent();
    }

}
