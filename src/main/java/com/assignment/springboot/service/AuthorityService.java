package com.assignment.springboot.service;

import com.assignment.springboot.domain.User;
import org.springframework.stereotype.Service;

@Service
public class AuthorityService {
    public boolean isReviewer(User user, String role){
        return user.getAuthorities().stream().
                filter(autho -> autho.getAuthority().equals(role)).count() > 0;
    }
}
