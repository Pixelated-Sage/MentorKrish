package com.mentor.backend.service;

import com.mentor.backend.entity.User;
import com.mentor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void saveUserIfNotExists(String firebaseUid,
                                    String email,
                                    String fullName,
                                    String phoneNumber,
                                    boolean emailVerified,
                                    String loginMethod) {

        Optional<User> existingUser = userRepository.findByFirebaseUid(firebaseUid);

        if (existingUser.isEmpty()) {
            User user = User.builder()
                    .firebaseUid(firebaseUid)
                    .email(email)
                    .fullName(fullName)
                    .phoneNumber(phoneNumber)
                    .emailVerified(emailVerified)
                    .phoneVerified(phoneNumber != null) // mark as verified if exists
                    .loginMethod(loginMethod)
                    .role("USER") // default role
                    .build();

            userRepository.save(user);
        }
    }
}
