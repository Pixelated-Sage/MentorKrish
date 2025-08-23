//package com.mentor.backend.config;
//
//import java.io.FileNotFoundException;
//import java.io.IOException;
//import java.io.InputStream;
//
//import javax.annotation.PostConstruct;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import com.google.firebase.auth.FirebaseAuth;
//
//
//@Configuration
//public class FirebaseConfig {
//
//    @PostConstruct
//    public void initializeFirebase() throws IOException {
//        try (InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("firebase-config.json")) {
//            if (serviceAccount == null) {
//                throw new FileNotFoundException("firebase-config.json not found in classpath");
//            }
//
//            FirebaseOptions options = FirebaseOptions.builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .build();
//
//            if (FirebaseApp.getApps().isEmpty()) {
//                FirebaseApp.initializeApp(options);
//            }
//        }
//    }
//
//    @Bean
//    public FirebaseAuth firebaseAuth() {
//        return FirebaseAuth.getInstance();
//    }
//}
