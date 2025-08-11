package com.mentor.backend.filter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.mentor.backend.entity.User;
import com.mentor.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

// @Component
@RequiredArgsConstructor
public class FirebaseAuthFilter extends OncePerRequestFilter {

    private final FirebaseAuth firebaseAuth;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String idToken = authHeader.substring(7);
            try {
                FirebaseToken decodedToken = firebaseAuth.verifyIdToken(idToken);

                String email = decodedToken.getEmail();
                String uid = decodedToken.getUid();
                String name = decodedToken.getName();
                Object phoneObj = decodedToken.getClaims().get("phone_number");
                String phoneNumber = phoneObj != null ? phoneObj.toString() : null;
                boolean emailVerified = decodedToken.isEmailVerified();

                // Save user if not exists, and fetch from DB
                User user = userService.saveUserIfNotExists(
                        uid,
                        email,
                        name,
                        phoneNumber,
                        emailVerified,
                        "GOOGLE"
                );

                // Add ROLE_ prefix so Spring Security understands it
                List<SimpleGrantedAuthority> authorities =
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()));

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(uid, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (Exception e) {
                logger.warn("Firebase token invalid: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
