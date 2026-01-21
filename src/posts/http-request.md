---
title: "HTTP Request 파이프라이닝"
date: "2025-03-31"
desc: "HTTP Request 파이프라이닝에 대해 알아보자"
tags: ["#CS"]
thumbnail: "/cs.svg"
---

![csgal-logo](/csgal.png)

# 1\. 이론

-   **정의**  
    HTTP Request 파이프라이닝(Pipelining)은 **한 TCP 연결에서 이전 응답을 기다리지 않고 여러 HTTP 요청을 연속적으로 전송하는 기술**입니다.
    -   HTTP/1.1에서 지원
    -   HTTP/2에서는 Multiplexing으로 대체됨
-   **원리**
    1.  클라이언트가 요청 A, B, C를 연속으로 서버에 전송
    2.  서버는 요청 순서대로 응답(A → B → C) 전송
    3.  **응답 순서는 요청 순서와 동일**
-   **목적**
    -   RTT(Round-Trip Time) 감소
    -   TCP 연결 재사용 효율 향상
    -   페이지 로딩 속도 개선

  
  

# 2\. 활용

-   **HTTP/1.1 환경**

```json
GET /resource1 HTTP/1.1
Host: example.com

GET /resource2 HTTP/1.1
Host: example.com
```

-   서버는 순서대로 응답을 반환
-   클라이언트는 응답을 받을 때까지 다음 요청 처리 가능
-   **사용 사례**
    -   웹 브라우저에서 여러 이미지, CSS, JS 요청 최적화
    -   AJAX 요청 시 RTT 감소
-   **주의**
    -   하나의 요청 지연 → 뒤에 요청도 지연 (Head-of-Line blocking)
    -   모든 서버/프록시가 파이프라이닝 지원하지 않음

  
  

# 3\. 심화

-   **Head-of-Line Blocking**
    -   파이프라인에서 첫 요청이 느리면 뒤 요청도 대기
    -   HTTP/2의 **Multiplexing**으로 해결
-   ****HTTP/2와 비교****
    
    | 요청 전송 | 순차, 하나의 연결 | Multiplexed, 하나 연결에서 병렬 |
    | --- | --- | --- |
    | 응답 순서 | 요청 순서대로 | 순서 자유, Stream ID 기반 |
    | 성능 | Head-of-Line 발생 가능 | Head-of-Line 문제 최소화 |
    
-   **보안/Proxy 문제**
    -   일부 프록시 서버는 파이프라이닝 지원 안 함 → 성능 저하 가능

### 3-1. HTTP/1.1 파이프라이닝

-   **장점**
    -   단일 TCP 연결에서 여러 요청 전송 → **RTT 감소**
    -   서버 연결 재사용 → **커넥션 생성 비용 절감**
-   **단점**
    -   Head-of-Line Blocking 발생 → 느린 요청이 뒤 요청 처리 지연
    -   일부 프록시 서버 미지원 → 성능 저하 가능
-   **성능 개선 포인트**
    -   요청 순서를 최적화하거나 자주 지연되는 요청 분리
    -   Keep-Alive + 파이프라이닝 결합으로 TCP 연결 효율 향상

### 3-2. HTTPS

-   **성능 고려 사항**
    -   TLS 핸드쉐이크 초기 비용 → 연결 지연 발생
    -   암호화/복호화 CPU 부하 발생
-   **성능 개선 방법**
    -   TLS 세션 재사용(Session Resumption) → 핸드쉐이크 비용 절감
    -   HTTP/2 + HTTPS → 한 연결에서 병렬 요청 처리
    -   하드웨어 가속: AES-NI 지원 CPU 활용

### 3-3. HTTP/2 Multiplexing

-   **장점**
    -   단일 연결에서 다수 요청/응답 병렬 처리 → Head-of-Line Blocking 최소화
    -   요청/응답 순서 자유 → I/O 병목 감소
    -   서버 리소스 효율 향상: 커넥션 수 감소, 스레드 오버헤드 절감
-   **성능 최적화 포인트**
    -   Stream prioritization 활용 → 중요한 요청 먼저 처리
    -   서버 푸시(Server Push) → 클라이언트 필요 리소스 미리 전송
    -   적절한 최대 동시 스트림 제한 → 메모리 과다 사용 방지

### 3-4. 서버 성능 개선 종합 팁

-   Keep-Alive + 파이프라이닝/Multiplexing 조합 → TCP 연결 재사용 최대화
-   HTTPS/TLS → 세션 재사용과 HTTP/2 병행
-   요청 순서, 중요도 고려 → Head-of-Line Blocking 최소화
-   서버 CPU/메모리 모니터링 → 암호화 및 병렬 처리 부하 관리
-   CDN, 압축(Gzip/Brotli) 활용 → 네트워크 I/O 부담 감소

![http-request-graph](/http-request-graph.png)
# 4\. 면접 대비 핵심 포인트

-   파이프라이닝 정의와 목적 이해
-   HTTP/1.1 vs HTTP/2 차이
-   Head-of-Line Blocking 개념 이해
-   브라우저, 프록시 지원 여부 고려
-   성능 최적화 관점에서 사용/한계 설명 가능

  
  

# 5\. 면접 연습

Q1. HTTP Request 파이프라이닝이란? 
A: 한 TCP 연결에서 이전 응답을 기다리지 않고 여러 HTTP 요청을 연속적으로 전송하는 기술, HTTP/1.1에서 지원. 

Q2. 파이프라이닝의 장점은? 
A: RTT 감소, TCP 연결 재사용 효율 향상, 페이지 로딩 속도 개선. 

Q3. 파이프라이닝 단점/주의점은? 
A: Head-of-Line Blocking 발생 가능, 모든 서버/프록시가 지원하지 않음. 

Q4. HTTP/2에서 파이프라이닝을 왜 쓰지 않는가? 
A: HTTP/2에서는 Multiplexing 지원 → 하나 연결에서 여러 요청/응답 병렬 처리, Head-of-Line 문제 해결. 

Q5. 웹 브라우저에서 파이프라이닝 활용 사례?
A: 여러 이미지, CSS, JS 요청 시 RTT 감소 → 페이지 로딩 최적화.

  
  

# 6\. 마무리

-   HTTP Request 파이프라이닝: **HTTP/1.1 성능 개선 기술**
-   장점: RTT 감소, TCP 효율 향상
-   단점: Head-of-Line Blocking, 서버/프록시 제한
-   현대 환경: **HTTP/2 Multiplexing**으로 대부분 대체
-   면접 포인트: 정의, 목적, 장단점, HTTP/2 대비 설명 가능