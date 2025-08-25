# ---- build stage ----
FROM maven:3.9.0-eclipse-temurin-17 AS build
WORKDIR /build

# copy pom + mvnw for faster dependency caching (if you use mvnw)
COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn
RUN mvn -B -N dependency:go-offline || true

# copy source and build jar
COPY src ./src
RUN mvn -B -DskipTests clean package

# ---- runtime stage ----
FROM eclipse-temurin:17-jdk-slim
WORKDIR /app

# copy the produced jar from build stage
COPY --from=build /build/target/*.jar app.jar

# expose default port (Render provides $PORT)
EXPOSE 8080

# run with Render's dynamic port if present
CMD ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
