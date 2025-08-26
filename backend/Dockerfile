# ------------------------------
# Build stage
# ------------------------------
FROM eclipse-temurin:24-jdk AS build

WORKDIR /app

# Copy Maven/Gradle build files first for caching dependencies
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
# (or for Gradle: copy build.gradle, settings.gradle, gradlew, etc.)

# Download dependencies (this will be cached if pom.xml hasn’t changed)
RUN ./mvnw dependency:go-offline -B

# Copy source and build
COPY src src
RUN ./mvnw clean package -DskipTests

# ------------------------------
# Run stage
# ------------------------------
FROM eclipse-temurin:24-jre AS runtime

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
