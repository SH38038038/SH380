---
title: "GCP Cloud Build 기반 CI/CD 구축하기"
date: "2025-04-01"
desc: "GCP를 이용해 배포된 프로젝트에 CI/CD를 구축해보자"
tags: ["#GCP", "#Springboot", "#infra"]
thumbnail: "/thumbnail.svg"
---

![gcp](/gcp.png)

## 1\. 왜 CI/CD인가?

### 기존의 문제

-   코드 변경 → 직접 서버 로그인 → 수동 빌드 → 재시작 → 실수 가능성 O
-   팀원 간 작업 충돌, 배포 누락 등 **비효율 발생**

### CI/CD 도입 목적

-   **CI(지속적 통합)**: GitHub에 push → 자동 빌드
-   **CD(지속적 배포)**: 빌드 성공 → 자동 배포
-   main 브랜치에 푸시하면 곧바로 실서비스에 반영되는 환경 구축

## 2\. 아키텍처 한눈에 보기

```textplain
GitHub → Cloud Build → Docker Build → Artifact Registry → Cloud Run Deploy
                                 ↑                      ↓
                        Secret Manager (보안 정보 관리)     IAM 권한으로 GCP 접근 허용
```

## 3\. 사용 기술 및 도구

| GitHub | 소스코드 저장소 |
| --- | --- |
| GCP Cloud Build | 빌드 및 배포 자동화 |
| Docker | 애플리케이션 컨테이너화 |
| Artifact Registry | Docker 이미지 저장 |
| Cloud Run | 컨테이너 서버리스 배포 |
| Secret Manager (선택) | 환경 변수 보안 관리 |
| Cloud SQL (선택) | MySQL 등 DB 연결 시 |

## 4\. 사전 준비

### 1\. GCP 프로젝트 생성 및 서비스 설정

-   GCP 프로젝트 만들기
-   Cloud Build, Artifact Registry, Cloud Run API 활성화
-   Cloud SQL 사용 시 SQL API도 함께 활성화

### 2\. 서비스 계정 생성

```bash
gcloud iam service-accounts create github-ci-cd \\
  --display-name="GitHub CI/CD"
```

필요한 권한:

-   Cloud Run Admin
-   Artifact Registry Writer
-   Cloud Build Editor
-   (선택) Secret Manager Accessor

## 5-1. Dockerfile 작성

```textplain
Gradle 빌드 → JAR 생성 → 실행 컨테이너 구성 (멀티 스테이지 빌드)
```

```Dockerfile
# --- Step 1: Build with Gradle ---
FROM gradle:8.4.0-jdk21 AS build
COPY --chown=gradle:gradle . /home/gradle/project
WORKDIR /home/gradle/project
RUN gradle build -x test

# --- Step 2: Run with OpenJDK ---
FROM openjdk:21
WORKDIR /app
COPY --from=build /home/gradle/project/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

\*.jar 파일은 Gradle 빌드 결과물로 생성됨

\*실행 이미지는 최소 구성(OpenJDK)으로 성능 최적화

## 5-2. cloudbuild.yaml 작성

\*Cloud Build가 실행할 명령어들을 YAML로 정의

```yaml
steps:
  # 1. Docker 이미지 빌드
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'asia-northeast3-docker.pkg.dev/my-project-id/my-repo/icey-backend:$SHORT_SHA'
      - '-f'
      - 'Dockerfile'
      - '.'

  # 2. 이미지 푸시
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'asia-northeast3-docker.pkg.dev/my-project-id/my-repo/icey-backend:$SHORT_SHA'

  # 3. Cloud Run 배포
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      [
        'run', 'deploy', 'icey-backend',
        '--image', 'asia-northeast3-docker.pkg.dev/my-project-id/my-repo/icey-backend:$SHORT_SHA',
        '--platform', 'managed',
        '--region', 'asia-northeast3',
        '--allow-unauthenticated',
        '--set-env-vars',
        'SPRING_PROFILES_ACTIVE=prod,DB_USER=myuser,DB_PASSWORD=mypassword,JWT_SECRET=myjwtsecret,FRONTEND_BASE_URL=https://icey.app'
      ]

images:
  - 'asia-northeast3-docker.pkg.dev/my-project-id/my-repo/icey-backend:$SHORT_SHA'
```

### 주요 변수 설명

변수명 의미

| $SHORT\_SHA | 커밋 해시로 이미지 버전 구분 |
| --- | --- |
| \--set-env-vars | Spring Boot 앱에 환경 변수 전달 |
| \--platform=managed | Cloud Run 서버리스 모드로 배포 |

## 5-3. Cloud Build Trigger 생성

### GCP 콘솔 진입 → Cloud Build → Triggers → Create

-   **Source**: GitHub 연결
-   **Event**: Push to branch
-   **Branch**: main
-   **Build config**: cloudbuild.yaml 선택

**이제 main 브랜치에 코드 push → 자동 빌드 및 Cloud Run 배포 완료!**

## 6\. 보안 및 실전 팁

### 환경 변수 보안 처리

-   실무에서는 -set-env-vars 대신 **Secret Manager** 사용 권장

```bash
gcloud secrets create DB_PASSWORD --replication-policy=automatic
gcloud secrets versions add DB_PASSWORD --data-file=db_password.txt
```

Cloud Run 배포 시:

```bash
--set-secrets=DB_PASSWORD=projects/my-project-id/secrets/DB_PASSWORD:latest
```

## 참고 링크

-   Cloud Build 공식 문서
-   Cloud Run 소개
-   Secret Manager 활용 가이드