package com.mentor.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Allow preflight requests through without authentication
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        try {
            // Check if Bearer token is present
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7).trim();
                username = jwtUtil.extractUsername(token);
                log.debug("JwtAuthFilter: extracted username -> {}", username);
            }
        } catch (Exception e) {
            log.warn("JwtAuthFilter: failed to extract username from token: {}", e.getMessage());
            // continue the filter chain — invalid token will simply not authenticate
        }

        // If username found and SecurityContext is empty
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                var userDetails = userDetailsService.loadUserByUsername(username);

                if (userDetails != null && jwtUtil.validateToken(token, userDetails)) {
                    // Use username as principal to make auth.getName() predictable (email/username)
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails.getUsername(), // principal (so auth.getName() == username)
                                    null,
                                    userDetails.getAuthorities());

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.debug("JwtAuthFilter: authentication set for user {}", userDetails.getUsername());
                } else {
                    log.debug("JwtAuthFilter: token invalid for username {}", username);
                }
            } catch (Exception e) {
                log.error("JwtAuthFilter: error during authentication setup for user {}: {}", username, e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
