package com.mentor.backend.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initializeFirebase() throws IOException {
        String firebaseJson = System.getenv("FIREBASE_SERVICE_ACCOUNT");
        if (firebaseJson == null || firebaseJson.isEmpty()) {
            throw new FileNotFoundException("FIREBASE_SERVICE_ACCOUNT env var not set");
        }

        // Create temp file with service account
        File tempFile = File.createTempFile("firebase-admin-sdk", ".json");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(firebaseJson);
        }

        try (FileInputStream serviceAccount = new FileInputStream(tempFile)) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        }

        // Temp file auto-deletes on JVM exit
        tempFile.deleteOnExit();
    }

    @Bean
    public FirebaseAuth firebaseAuth() {
        return FirebaseAuth.getInstance();
    }
}


// for local use 


// @Configuration
// public class FirebaseConfig {

//    @PostConstruct
//    public void initializeFirebase() throws IOException {
//        try (InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json")) {
//            if (serviceAccount == null) {
//                throw new FileNotFoundException("firebase-config.json not found in classpath");
//            }

//            FirebaseOptions options = FirebaseOptions.builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .build();

//            if (FirebaseApp.getApps().isEmpty()) {
//                FirebaseApp.initializeApp(options);
//            }
//        }
//    }

//    @Bean
//    public FirebaseAuth firebaseAuth() {
//        return FirebaseAuth.getInstance();
//    }
// }
