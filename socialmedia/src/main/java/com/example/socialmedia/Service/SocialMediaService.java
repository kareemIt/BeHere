package com.example.socialmedia.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.socialmedia.Exceptions.UserAlreadyExistsException;
import com.example.socialmedia.Models.Bio;
import com.example.socialmedia.Models.FriendBio;
import com.example.socialmedia.Models.Post;
import com.example.socialmedia.Models.User;
import com.example.socialmedia.Models.UserFollowing;
import com.example.socialmedia.Repository.PostRepository;
import com.example.socialmedia.Repository.UserFollowingRepository;
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
    @Autowired
    private UserFollowingRepository userFollowingRepository;

    public User createUser(User user) throws UserAlreadyExistsException {
        Optional<User> userDB = userRepository.findByUsername(user.getUsername());
        if (userDB.isPresent()) {
            throw new UserAlreadyExistsException("User with username " + user.getUsername() + " already exists.");
        }
        user.setDateCreated(new Date());
        user.setBio("Hello I'm new");
        return userRepository.save(user);
    }

    private void updateUserPostingStreak(User user, Date now) {
        if (user.getLastPostDate() != null) {
            long diffMillis = now.getTime() - user.getLastPostDate().getTime();
            long diffDays = diffMillis / (1000 * 60 * 60 * 24);

            if (diffDays == 1) {
                user.setPostingStreak(user.getPostingStreak() + 1);
            } else if (diffDays > 1) {
                user.setPostingStreak(1);
            }
        } else {
            user.setPostingStreak(1);
        }

        user.setLastPostDate(now);
    }

    public Post createPost(Long userId, String content) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Date now = new Date();
        Post post = new Post();
        post.setUser(user);
        post.setContent(content);
        post.setDateCreated(now);
        post.setExpirationTime(new Date(now.getTime() + 24 * 60 * 60 * 1000));
        post.setArchived(false);

        updateUserPostingStreak(user, now);

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
            int totalLikes = getLikeCountForUser(id);
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

    public FriendBio getFriendBio(Long userId, Long friendId) {
        // Get the list of friend IDs that the current user is following.
        Set<Long> followingUserIds = userFollowingRepository.findByUserId(userId)
                .stream()
                .map(userFollowing -> userFollowing.getFollowerId())
                .collect(Collectors.toSet());
        boolean isFollowing = followingUserIds.contains(friendId);
        Optional<User> optionalFriend = userRepository.findById(friendId);

        if (optionalFriend.isPresent()) {
            User friend = optionalFriend.get();
            int totalLikes = getLikeCountForUser(friendId);
            Set<UserFollowing> friendFollowers = userFollowingService.getFollowers(friendId);
            Set<UserFollowing> friendFollowing = userFollowingService.getFollowing(friendId);

            FriendBio bio = new FriendBio();
            bio.setUsername(friend.getUsername());
            bio.setFollowersCount(friendFollowers.size());
            bio.setFollowingCount(friendFollowing.size());
            bio.setTotalLikes(totalLikes);
            bio.setPostingStreak(friend.getPostingStreak());
            bio.setBio(friend.getBio());
            bio.setFollowing(isFollowing);
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

    public List<Post> getAllPostsForUser(Long userId) {
        return postRepository.findAllByUserId(userId);
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
        int totalLike = 0;
        List<Post> userPosts = getAllPostsForUser(userId);
        List<Long> listOfPostIds = new ArrayList<>();
        for (Post post : userPosts) {
            listOfPostIds.add(post.getId());
        }
        for (Long postId : listOfPostIds) {
            totalLike += likeService.getLikeCountForPost(postId);
        }

        return totalLike;
    }

    public Optional<User> getUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser;
    }
}
