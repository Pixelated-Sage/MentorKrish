# Step 1: Use an official OpenJDK image as base
FROM openjdk:24-jdk-slim

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy built jar file into container
COPY target/*.jar app.jar

# Step 4: Expose port (same as in application.properties)
EXPOSE 8080

# Step 5: Run jar
ENTRYPOINT ["java", "-jar", "app.jar"]
