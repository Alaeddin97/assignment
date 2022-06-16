package com.assignment.springboot.service;

import com.assignment.springboot.domain.User;
import com.assignment.springboot.repository.UserRepository;
import com.assignment.springboot.util.CustomPasswordEncorder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    CustomPasswordEncorder customPasswordEncorder;
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> OptUser = userRepository.findByUsername(username);
        return OptUser.orElseThrow(() -> new UsernameNotFoundException("bad credentials"));

    }
}
