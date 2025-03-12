# Build Stage
FROM eclipse-temurin:22-jdk AS build

WORKDIR /app

# Copy only necessary files first to improve caching
COPY mvnw pom.xml ./
COPY .mvn .mvn
COPY src src

# Give execute permissions to mvnw
RUN chmod +x mvnw

# Build the application (Skip tests for faster builds in CI/CD)
RUN ./mvnw clean package -DskipTests -B

# Run Stage
FROM eclipse-temurin:22-jdk
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
CMD ["java", "-jar", "app.jar"]
