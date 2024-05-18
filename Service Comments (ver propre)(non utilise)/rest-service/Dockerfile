# Use the official OpenJDK image as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the jar file from your target folder into the container
COPY target/rest-service-0.0.1-SNAPSHOT.jar /app/your-app.jar

# Command to run the application
CMD ["java", "-jar", "/app/your-app.jar"]