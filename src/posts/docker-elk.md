---
title: "Docker 환경에서 Elasticsearch, Kibana 세팅 및 실행"
date: "2025-08-30"
desc: "Docker 환경에서 Elasticsearch, Kibana 세팅하고 실행해보자"
tags: ["#Elasticsearch", "#infra", "#Docker", "#Kibana"]
thumbnail: "/thumbnail.svg"
---

![elasticsearch-logo](/elasticsearch.png)

## 1\. 환경 준비

-   Windows 11 기준
-   Docker Desktop 설치는 D드라이브에 지정
-   WSL2 backend 사용
-   컨테이너 데이터도 D드라이브에 저장

### 설치 경로 예시

-   Docker Desktop 설치: D:\\Docker\\Docker Desktop
-   컨테이너 데이터: D:\\Docker
-   기존 C드라이브 사용 최소화

## 2\. Docker 네트워크 생성

-   Docker 컨테이너 간 통신을 위해 별도의 네트워크를 생성합니다.

```bash
docker network create es-network
```

-   생성된 네트워크 이름은 이후 Elasticsearch, Kibana 컨테이너에 연결됩니다.

## 3\. Elasticsearch 및 Kibana Docker Compose 파일 작성

```yml
# D:\Docker\elasticsearch\docker-compose.yml 예시:

version: "3.9"
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.15.0
    container_name: es01
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    networks:
      - es-network
    volumes:
      - esdata:/usr/share/elasticsearch/data

  kib01:
    image: docker.elastic.co/kibana/kibana:8.15.0
    container_name: kib01
    environment:
      - ELASTICSEARCH_HOSTS=http://es01:9200
    ports:
      - "5601:5601"
    networks:
      - es-network

networks:
  es-network:
    external: true

volumes:
  esdata:
```

-   xpack.security.enabled=false 옵션으로 인증 없이 테스트 환경 구성
-   ports를 통해 호스트와 포트 연결
-   volumes로 데이터 영속화

## 4\. 컨테이너 실행

```bash
cd D:\Docker\elasticsearch
docker-compose up -d
```

-   \-d 옵션으로 백그라운드 실행

컨테이너 실행 확인

```bash
docker ps
```

예시 출력:

```bash
CONTAINER ID   IMAGE                      STATUS
4e8383565cef   elasticsearch:8.15.0       Up
b3f7e3f2088b   kibana:8.15.0              Up
```

## 5\. 컨테이너 관리 CLI 명령어

-   실행 중인 컨테이너 확인:

```bash
docker ps
```

-   중지/시작/재시작:

```bash
docker stop es01
docker start es01
docker restart kib01
```

-   로그 확인:

```bash
docker logs -f es01
docker-compose logs -f kib01
```

-   컨테이너 내부 접속:

```bash
docker exec -it es01 /bin/bash
```

## 6\. 결론

-   **Docker Desktop GUI 없이도 CLI만으로 Elasticsearch, Kibana 실행 가능**
-   WSL2와 Docker CLI를 활용하면 컨테이너 관리와 데이터 영속화가 모두 가능
-   Spring Boot 등 애플리케이션 연동 테스트에도 문제 없음