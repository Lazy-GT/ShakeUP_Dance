# 🌈AWS 배포 방법

## ⚡️Version

- IDE 버전
	- IntelliJ IDEA 2021.3.1

- JVM, JDK 버전
	- Oracle OpenJDK Version 11.0.13



## 🔗Gradle 의존성

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



## 🐬Workbench

- Hostname : 52.78.97.122
- Username : ssafy
- UserPW : ssafy
- Port : 3306



## 🌐AWS 접속 방법

```bash
ssh -i I6D103T.pem ubuntu@I6D103.p.ssafy.io
```

- Git Bash 또는 Putty 를 사용해서 접속 가능



## ✨Jenkins ⇔ Gitlab

- Secret key : b7d25cfc529c1c595346d0e111ac5244
- Git Access Token : 64Lg41EfHgKMPyq8adjy



## ❄️Nginx 설정

```bash
sudo vim /etc/nginx/sites-available/default
```

```bash
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

```bash
# 상태확인

systemctl status nginx

# 웹서버 정지(Stop)

sudo systemctl stop nginx

# 웹서버 시작(Start)

sudo systemctl start nginx

# 웹서버 재시작(restart)

sudo systemctl restart nginx

# 설정 리로드(reload)

sudo systemctl reload nginx
```



## ⭐️Jenkins

- 비밀번호 : af3b7e1b68f64320926a8f7acde2530f

- 주소 : 52.78.97.122:8000
- 포트 : 8000
- ID: shakeup
- PW: ssafy

```bash
# 시작

sudo service jenkins start

# 종료

sudo service jenkins stop

# restart

sudo service jenkins restart

# enable 설정

systemctl enable jenkins
```



### ❄️Jenkins 설정

- Git Repository URL: https://lab.ssafy.com/s06-webmobile2-sub2/S06P12D103.git
- JDK Version : java-11-openjdk-amd64 Path: /usr/lib/jvm/java-11-openjdk-amd64
- Git Path : /usr/bin/git
- NodeJS Version : 12.22.10



### 🛠Build

- BE Build

```bash
#!/bin/bash
sudo chmod 777 BE
cd BE
sudo chmod 777 gradlew
sudo ./gradlew clean
sudo ./gradlew build
```

- FE Build

```bash
#!/bin/bash
sudo chmod 777 FE
cd FE
sudo rm package-lock.json
sudo npm install
sudo npm run build
```



### ▶️실행 (자동 배포)

- FE 실행

```bash
sudo systemctl restart nginx
```

- BE 실행

```bash
nohup java -jar /var/lib/jenkins/workspace/shakeup/BE/build/libs/shakeup-0.0.1-SNAPSHOT.jar &
```



#### 👀Jenkins 설정 화면

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2af47d57-dd82-4672-9c72-58438187fed1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220217T194810Z&X-Amz-Expires=86400&X-Amz-Signature=37b1b81aa0303bdbf0e21e5f73151fcc115c74ea2eae17b94dac2f7bb065631c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e9df80f4-b804-41e5-93cd-0cfbb2696ce8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220217T194815Z&X-Amz-Expires=86400&X-Amz-Signature=45313021220181e42181fcb4b8d9e1b1a2ed9f3da79b278c87ed7ba510af77b9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f5e91980-96c0-4642-ac01-3b6e17eedc42/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220217T194819Z&X-Amz-Expires=86400&X-Amz-Signature=40730539ce549c14d2ded3e414cad32b07b370b4c2d91dcb2c85275a7a0a645b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/07dfbe01-3c30-4478-bcf5-ffc6f1fec626/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220217T194822Z&X-Amz-Expires=86400&X-Amz-Signature=6a76976157d1efd1e7ad0c54efab061d382eb447447fdcd51d481e302e6fcfd3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)
