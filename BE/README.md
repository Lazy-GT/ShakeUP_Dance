<h1>Spring</h1>

## Version



- IDE 버전
intelliJ IDEA 2021.3.1
- JVM, JDK 버전
Oracle OpenJDK version 11.0.13
- 

## Gradle 의존성



```java
plugins {
	id 'org.springframework.boot' version '2.4.0'	// 2.6.1 버전 썼을 때, Swagger 오류
	id 'io.spring.dependency-management' version '1.0.11.RELEASE'
	id 'java'
}

group = 'com'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-mail'
	implementation 'org.springframework.boot:spring-boot-starter'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'

	
	// lombok 의존성
	implementation('org.projectlombok:lombok')
	annotationProcessor('org.projectlombok:lombok')

	// mysql
	implementation 'mysql:mysql-connector-java'
	// jpa 의존성
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa:2.5.4'
	// mariadb 의존성
	runtimeOnly('org.mariadb.jdbc:mariadb-java-client')
	// swagger2 의존성
	implementation 'io.springfox:springfox-swagger2:2.9.2'
	implementation 'io.springfox:springfox-swagger-ui:2.9.2'
	
	// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web
	implementation 'org.springframework.boot:spring-boot-starter-web:2.5.5'
	// JWT 의존성
	implementation 'io.jsonwebtoken:jjwt:0.9.1'
	// spring security 의존성
	implementation 'org.springframework.boot:spring-boot-starter-security'

}

test {
	useJUnitPlatform()
}
```

<h1> AWS</h1>

# [http://i6d103.p.ssafy.io/](http://i6d103.p.ssafy.io/)

## **<Workbanch> - <AWS> 연동**



- **hostname : 52.78.97.122**
- **username , pw : ssaf**~~y~~
- port:  3306

## AWS 접속 방법



```jsx
ssh -i I6D103T.pem [ubuntu@I6D103.p.ssafy.io](mailto:ubuntu@I6D103.p.ssafy.io)
```

→ 깃배쉬 또는 putty를 사용해서 접속가능

## 젠킨스 x gitlab



- secret key : b7d25cfc529c1c595346d0e111ac5244
- git access token: 64Lg41EfHgKMPyq8adjy

## Nginx 설정



```jsx
sudo vim /etc/nginx/sites-available/default
```

```jsx
server{
listen 80 ;
    listen [::]:80 ;

    server_name I6D103.p.ssafy.io;

    location / {
            try_files $uri /index.html;
            root /var/lib/jenkins/workspace/shakeup/FE/build;
            index index.html index.htm;
    }
}

```

```jsx
- -상태확인

systemctl status nginx

- -웹서버 정지(Stop)

sudo systemctl stop nginx

- -웹서버 시작(Start)

sudo systemctl start nginx

- -웹서버 재시작(restart

sudo systemctl restart nginx

- -설정 리로드(reload)

sudo systemctl reload nginx
```

## Jenkins



- 비밀번호 : af3b7e1b68f64320926a8f7acde2530f
- 주소 : 52.78.97.122:8000
- 포트 : 8000
- ID: shakeup
- PW: ssafy

```jsx
- -시작

sudo service jenkins start

- -종료

sudo service jenkins stop

- -restart

sudo service jenkins restart

- -enable 설정

systemctl enable jenkins
```

## Jenkins 설정



- Git Repository URL:
[https://lab.ssafy.com/s06-webmobile2-sub2/S06P12D103.git](https://lab.ssafy.com/s06-webmobile2-sub2/S06P12D103.git)

- JDK
Version : java-11-openjdk-amd64
Path: /usr/lib/jvm/java-11-openjdk-amd64

- Git
Path : /usr/bin/git

- NodeJS
Version : 12.22.10

## 빌드



- BE Build

```jsx
#!/bin/bash
sudo chmod 777 BE
cd BE
sudo chmod 777 gradlew
sudo ./gradlew clean
sudo ./gradlew build
```

- FE Build

```jsx
#!/bin/bash
sudo chmod 777 FE
cd FE
sudo rm package-lock.json
sudo npm install
sudo npm run build
```

## 실행(자동 배포)


- FE 실행

```jsx
sudo systemctl restart nginx
```

- BE 실행

```jsx
nohup java -jar /var/lib/jenkins/workspace/shakeup/BE/build/libs/shakeup-0.0.1-SNAPSHOT.jar &
```

## Jenkins 설정 사진
![1](/uploads/2d1d511830a51568730a76401dc1fbd5/1.PNG)
![2](/uploads/62a17c5bef80426696177d21ffbd77cb/2.PNG)
![3](/uploads/d22c07257dd7be9a3b02513018e11f0e/3.PNG)
![4](/uploads/6ad94ad52698d88cb006f57e1fb10cda/4.PNG)

