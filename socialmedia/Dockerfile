# Use Java 21 (recommended) or Java 22 if needed
FROM eclipse-temurin:22-jdk AS build

WORKDIR /app

# Copy project files
COPY . .

# Give execute permissions to mvnw
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package

# Run stage
FROM eclipse-temurin:22-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
