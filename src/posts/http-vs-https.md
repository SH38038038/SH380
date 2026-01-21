---
title: "HTTP와 HTTPS 차이"
date: "2025-03-30"
desc: "http와 https 차이에 대해 알아보자"
tags: ["#CS"]
thumbnail: "/cs.svg"
---

![csgal-logo](/csgal.png)
# 1\. 이론

-   **HTTP (HyperText Transfer Protocol)**
    -   웹에서 **클라이언트 ↔ 서버 간 데이터 전송 프로토콜**
    -   데이터 **암호화 없이 평문 전송**
    -   포트: 80
    -   특징: 빠름, 보안 취약
-   **HTTPS (HTTP Secure)**
    -   HTTP + **TLS/SSL 암호화**
    -   데이터 전송 시 **기밀성, 무결성, 인증** 제공
    -   포트: 443
    -   특징: 보안 강화, 인증서 필요
-   **HTTPS의 보안 요소**  
    
    | 암호화 | 전송 데이터 암호화 → 도청 방지 |
    | --- | --- |
    | 인증 | 서버 인증서 → 신뢰할 수 있는 서버 확인 |
    | 무결성 | 데이터 변조 여부 확인 |
    

  
  

# 2\. 활용

-   **HTTP**
    -   내부 네트워크, 테스트 서버, 캐시 서버 등 보안 부담 낮은 환경
-   **HTTPS**
    -   로그인, 결제, 개인정보 처리, API 통신 등 보안 필수 환경
-   **Spring Boot HTTPS 설정 예제**

```json
server:
  port: 443
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: password
    key-store-type: PKCS12
    key-alias: tomcat
```

-   **리버스 프록시 (Nginx) 사용**

```json
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;
    ssl_certificate /etc/ssl/certs/cert.pem;
    ssl_certificate_key /etc/ssl/private/key.pem;
    location / {
        proxy_pass http://localhost:8080;
    }
}
```

  
  

# 3\. 심화

-   **TLS 동작 원리**
    1.  클라이언트 → 서버 접속 요청
    2.  서버 인증서 전송 → 클라이언트 검증
    3.  세션 키 교환 → 대칭키 기반 암호화 시작
    4.  데이터 암호화 전송
-   **HTTPS 성능**
    -   초기 TLS 핸드쉐이크 → 약간 느림
    -   HTTP/2 + HTTPS → 성능 최적화 가능
-   **중간자 공격(MITM) 방지**
    -   HTTPS 사용 시, 인증서 검증을 통해 데이터 변조/도청 차단
-   **인증서 종류**  
    
    | DV | 도메인 인증만 수행 |
    | --- | --- |
    | OV | 조직 인증 포함 |
    | EV | 확장 인증, 브라우저 주소창 녹색 표시 |
    

![http-vs-https-graph](/http-vs-https-graph.png)

  
  

# 4\. 면접 대비 핵심 포인트

-   HTTP와 HTTPS 차이 명확히 설명 가능
-   TLS/SSL 동작 원리 이해
-   인증서 종류 및 용도 이해
-   HTTPS 사용 시 성능과 보안 고려 사항
-   리버스 프록시 + HTTPS 적용 방법

  
  

# 5\. 면접 연습

Q1. HTTP와 HTTPS 차이? 
A: HTTP → 평문 전송, 포트 80, 보안 취약 HTTPS → TLS/SSL 암호화, 포트 443, 기밀성·무결성·인증 제공 

Q2. HTTPS에서 암호화는 어떻게 이루어지나요? 
A: TLS 핸드쉐이크로 세션 키 교환 → 대칭키로 데이터 암호화 전송 

Q3. 인증서 종류와 차이? 
A: DV → 도메인 인증 OV → 조직 인증 포함 EV → 확장 인증, 브라우저 주소창 녹색 표시 

Q4. HTTP만 사용하는 서비스의 위험? 
A: 데이터 도청, 중간자 공격, 변조 가능 → 로그인, 결제, 개인정보 처리 시 위험 

Q5. HTTPS 적용 시 성능 고려 사항? 
A: TLS 핸드쉐이크 비용, HTTP/2로 최적화 가능, 세션 재사용, 캐싱 활용

  
  

# 6\. 마무리

-   HTTP: 단순 전송, 보안 취약
-   HTTPS: TLS/SSL 기반 암호화 + 인증 + 무결성 제공
-   실무: 로그인, 결제, API 통신은 반드시 HTTPS
-   면접: TLS 동작 원리, 인증서 종류, MITM 방지, 성능 최적화 전략까지 설명 가능해야 함

