# Use official OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy built jar file
COPY target/mentor-chris-backend.jar app.jar

# Expose port (Render uses PORT env variable)
EXPOSE 10000

# Command to run the jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
