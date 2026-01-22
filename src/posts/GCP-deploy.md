---
title: "Google Cloud Run 이용하여 Springboot 프로젝트 배포하기"
date: "2025-03-31"
desc: "GCP를 이용하여 Springboot 프로젝트를 배포해보자"
tags: ["#GCP", "#Springboot", "#infra"]
thumbnail: "/thumbnail.svg"
---

![gcp](/gcp.png)

## 1\. Cloud SQL(MySQL) 인스턴스 설정

먼저 Google Cloud SQL에서 MySQL 인스턴스를 생성하고, 외부에서 접근 가능하도록 설정

| DB 인스턴스 생성 | Cloud SQL 콘솔에서 MySQL 인스턴스 생성 |
| --- | --- |
| 외부 접속 허용 | 네트워크 탭에서 로컬 개발 머신 IP 등 외부 IP 허용 설정 |
| 테스트 | MySQL Workbench 등 툴로 로컬에서 DB 접속 테스트 |
| 환경 변수 적용 | Spring Boot 설정 파일(application-prod.yml 등)에 외부 DB 주소로 변경 |

\*Tip: 보안을 위해 접속 IP는 최소한으로 제한하는 것을 권장

## 2\. Dockerfile 작성

Spring Boot 애플리케이션을 컨테이너로 패키징하기 위한 Dockerfile 작성

```Dockerfile
# JDK 21 기반 이미지 사용
FROM openjdk:21

# 애플리케이션 포트 개방
EXPOSE 8080

# 빌드한 JAR 파일 복사
COPY build/libs/demo-0.0.1-SNAPSHOT.jar app.jar

# Spring Boot 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]

/*
* Dockerfile = 컨테이너 만드는 설명서
* “내 프로그램을 어떤 환경에서 실행할지”를 차례대로 적어둔 텍스트 파일
* 이 파일을 이용해 도커 이미지(Docker Image)를 만들고, 그 이미지를 실행하면 컨테이너(Container)가 뜸
* FROM → "어떤 OS/언어 환경에서 시작할지" (ex. Java, Python)
* COPY → "내 프로그램 파일을 컨테이너 안에 넣기"
* RUN → "필요한 설치 작업 실행"
* CMD / ENTRYPOINT → "컨테이너가 켜질 때 실행할 명령어"
*/
```

\*주의: COPY 경로는 실제 프로젝트 빌드 산출물 위치에 맞게 수정

## 3\. Google Cloud SDK를 이용한 배포 과정

-   **구글 계정 로그인**

```bash
gcloud auth login
```

-   **Docker 이미지 빌드**

```bash
docker build -t gcr.io/{PROJECT-ID}/{IMAGE-NAME} .
```

-   **이미지 존재 여부 확인**

```bash
docker images
```

-   **Container Registry에 이미지 푸시**

```bash
docker push gcr.io/{PROJECT-ID}/{IMAGE-NAME}
```

-   **Cloud Run에 배포**

```bash
gcloud run deploy \\
  --image gcr.io/{PROJECT-ID}/{IMAGE-NAME} \\
  --platform managed \\
  --region asia-northeast3 \\
  --allow-unauthenticated
```

## 4\. 배포 후 서비스 URL 확인

배포가 완료되면 Cloud Run에서 아래와 같은 URL이 출력

```bash
https://{SERVICE-NAME}-{HASH}-uc.a.run.app

# GCP는 기본이 https
```

이 URL로 서비스에 접근 가능

## 5\. 배포 시 발생할 수 있는 오류 및 해결법

### 환경 변수 미적용 문제

```bash
java.lang.RuntimeException:
Driver com.mysql.cj.jdbc.Driver claims to not accept jdbcUrl, ${DB_JDBC_URL}
```

-   원인: 환경 변수(DB\_JDBC\_URL)가 Cloud Run에 제대로 전달되지 않아 JDBC URL이 치환되지 않음
-   해결법: gcloud run deploy 시 -set-env-vars 옵션으로 환경 변수 직접 지정

```bash
gcloud run deploy \\
  --image gcr.io/{PROJECT-ID}/{IMAGE-NAME} \\
  --set-env-vars DB_JDBC_URL="jdbc:mysql://{DB_HOST}:3306/{DB_NAME}" \\
  --platform managed \\
  --region asia-northeast3
```