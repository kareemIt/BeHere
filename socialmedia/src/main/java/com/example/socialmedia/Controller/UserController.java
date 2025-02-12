package com.example.socialmedia.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.socialmedia.DTO.SearchResponse;
import com.example.socialmedia.Service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<SearchResponse>> searchUsers(@PathVariable String keyword) {
        List<SearchResponse> searchResults = userService.searchUsers(keyword);
        return ResponseEntity.ok(searchResults);
    }
}
