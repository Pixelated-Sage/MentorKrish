package com.mentor.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    // allow requests from local dev. Use a stricter list in production.
                    config.setAllowedOriginPatterns(List.of("http://localhost:3000", "http://127.0.0.1:3000", "http://yourdomain.com"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setExposedHeaders(List.of("Authorization", "Content-Disposition"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Allow preflight for all endpoints
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public auth endpoints
                        .requestMatchers("/api/auth/**").permitAll()

                        // Example public GET endpoints
                        .requestMatchers(HttpMethod.GET,
                                "/api/blogs/**",
                                "/api/announcements/**",
                                "/api/gallery/**",
                                "/api/about/**",
                                "/uploads/**"
                        ).permitAll()

                        // public POST forms
                        .requestMatchers(HttpMethod.POST,
                                "/api/contact",
                                "/api/trials"
                        ).permitAll()

                        // Admin endpoints - for now left open for testing, change to .hasRole("ADMIN") in prod
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

                        // Example admin-only listing
                        .requestMatchers(HttpMethod.GET, "/api/trials").hasRole("ADMIN")

                        // anything else requires authentication
                        .anyRequest().authenticated()
                )
                // JWT filter must be before UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
