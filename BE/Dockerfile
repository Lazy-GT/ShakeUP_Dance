FROM openjdk:11-jre
EXPOSE 8081
ARG JAR_FILE=build/libs/*.jar
COPY build/libs/shakeup-0.0.1-*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]