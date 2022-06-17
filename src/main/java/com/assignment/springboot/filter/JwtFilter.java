package com.assignment.springboot.filter;

import com.assignment.springboot.repository.UserRepository;
import com.assignment.springboot.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepo;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        // Get authorization header and validate
        if (!StringUtils.hasText(header) || (StringUtils.hasText(header)&&!header.startsWith("Bearer "))) {
            chain.doFilter(request, response);
            return;
        }
        final String token = header.split(" ")[1].trim();
        // Get user identity and set it on the spring security context
        UserDetails userDetails = userRepo.findByUsername(jwtUtil.getUsernameFromToken(token))
                .orElse(null);
        System.out.println("userDetails: "+userDetails);

        // Get jwt token and validate
        if (!jwtUtil.validateToken(token,userDetails)) {
            chain.doFilter(request, response);
            return;
        }



        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null ? List.of() : userDetails.getAuthorities()
        );

        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );
    //this is where the authentication magic happens and the user is valid and should have all the accesses his authorities gives him
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);

    }
}
