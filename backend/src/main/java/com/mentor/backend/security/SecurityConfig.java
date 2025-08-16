package com.mentor.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.http.HttpMethod;

import java.util.List;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    var config = new org.springframework.web.cors.CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:3000"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    return config;
                }))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Public access to auth endpoints (including OTP)
                        .requestMatchers(
                                "/api/auth/send-otp",
                                "/api/auth/resend-otp",
                                "/api/auth/verify-otp",
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()

                        // Public GET endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/api/blogs/**",
                                "/api/announcements/**",
                                "/api/gallery/**",
                                "/api/about/**",
                                "/uploads/**" // Allow public access to uploaded files
                        ).permitAll()

                        // Public POST endpoints (forms)
                        .requestMatchers(HttpMethod.POST,
                                "/api/contact",
                                "/api/trials"
                        ).permitAll()

                        // Admin-only mutations (currently set to permitAll for testing)
                        .requestMatchers(HttpMethod.POST,
                                "/api/blogs/**",
                                "/api/announcements/**",
                                "/api/gallery/**",
                                "/api/about/**"
                        ).permitAll()
                        .requestMatchers(HttpMethod.PUT,
                                "/api/blogs/**",
                                "/api/announcements/**",
                                "/api/gallery/**",
                                "/api/about/**"
                        ).permitAll()
                        .requestMatchers(HttpMethod.DELETE,
                                "/api/blogs/**",
                                "/api/announcements/**",
                                "/api/gallery/**",
                                "/api/about/**"
                        ).permitAll()

                        // Admin-only GET listing
                        .requestMatchers(HttpMethod.GET,
                                "/api/trials"
                        ).hasRole("ADMIN")

                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                // Register the JWT filter before UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
