---
title: "캐시 무효화 전략"
date: "2025-03-31"
desc: "캐시 무효화 전략에 대해 알아보자"
tags: ["#CS"]
thumbnail: "/csgal.png"
---

![csgal-logo](/csgal.png)
# 1\. 이론

-   **캐시(Cache)**: 자주 사용하는 데이터를 **빠른 접근이 가능한 메모리**에 임시 저장
-   **캐시 무효화(Cache Invalidation)**: 원본 데이터 변경 시 **캐시를 최신 상태로 유지**하기 위해 기존 캐시 데이터를 삭제/갱신하는 전략
-   **필요성**
    -   캐시는 데이터 읽기 속도를 높이지만 **데이터 불일치 위험** 존재
    -   무효화 전략 없으면 **Stale Data** 문제가 발생

# 2\. 주요 캐시 무효화 전략

| **TTL(Time-To-Live)** | 캐시 항목에 유효기간 설정, 만료 시 자동 삭제 | 구현 간단, 자동화 | 최신성 보장 어렵고 TTL 짧으면 캐시 효율 감소 | Redis Key TTL, Memcached |
| --- | --- | --- | --- | --- |
| **LRU(Least Recently Used)** | 오래된 캐시 항목부터 제거 | 메모리 효율, 최신 데이터 유지 | 삭제 기준 단순, 최신성 보장 아님 | 서버 메모리 캐시 |
| **Write-through** | 원본 DB에 쓰기 시 **동시에 캐시 업데이트** | 데이터 항상 최신 | 쓰기 속도 느림 | Redis + DB 연동 |
| **Write-back / Write-behind** | 캐시만 먼저 갱신, 일정 시간 후 DB 반영 | 읽기 성능 우수 | 데이터 손실 가능 | 대규모 캐시 시스템 |
| **Explicit Invalidation** | 애플리케이션에서 명시적으로 캐시 삭제 | 제어 용이 | 코드 복잡, 실수 위험 | 특정 이벤트 발생 시 캐시 삭제 |
| **Event-driven Invalidation** | 데이터 변경 이벤트 발생 시 캐시 삭제 | 실시간성 보장 | 이벤트 처리 추가 필요 | Kafka 이벤트 기반 캐시 무효화 |

# 3\. 활용

-   **서비스 성능 최적화**
    -   DB 조회 횟수 감소 → 응답 속도 향상
    -   인기 데이터 캐싱 → 서버 부하 감소
-   **데이터 일관성 보장**
    -   Write-through / Explicit 전략 → 최신 데이터 유지
    -   TTL 전략 → 일정 시간 동안 Stale 데이터 허용 가능
-   **분산 캐시 환경**
    -   Event-driven Invalidation → 여러 서버 캐시 동기화
    -   Redis Pub/Sub, Kafka, RabbitMQ 활용 가능

# 4\. 심화

-   **분산 환경 문제**
    -   캐시 무효화 시 **Race Condition** 발생 가능
    -   해결 방법:
        -   **Locking**: 캐시 삭제/갱신 시 동시 접근 제어
        -   **Versioning**: 데이터 버전 관리 → 최신 버전만 사용
-   **캐시 스탬프(Cache Stampede) 방지**
    -   다수 요청이 동시에 만료된 캐시 접근 → DB 부하 폭주
    -   해결 전략:
        -   랜덤 TTL 적용
        -   요청 중복 방지(Locking / Request Coalescing)
-   **메모리 효율 vs 최신성 트레이드오프**
    -   TTL 짧으면 최신성↑, 캐시 효율↓
    -   TTL 길면 최신성↓, 캐시 효율↑

![cache-graph](/cache-graph.png)

# 5\. 면접 대비 핵심 포인트

-   캐시 무효화의 **필요성** 명확히 이해
-   TTL, Write-through, Write-back, Explicit 전략 구분
-   분산 환경 캐시 무효화 문제점(Race Condition, Cache Stampede)
-   Redis, Memcached 등 구현 경험 있으면 가산점

# 6\. 면접 연습

Q1. 캐시 무효화가 필요한 이유는? 
A: 원본 데이터 변경 시 캐시가 최신 상태가 아니면 Stale Data 문제가 발생하기 때문에 필요합니다. 

Q2. TTL 전략의 장단점은? 
A: 장점: 구현이 간단하고 자동 무효화. 단점: 최신성 보장 어려움, TTL 짧으면 캐시 효율 감소. 

Q3. Write-through와 Write-back 차이는? 
A: Write-through: DB와 캐시 동시 업데이트 → 최신성 보장. Write-back: 캐시만 먼저 업데이트 후 일정 시간 후 DB 반영 → 쓰기 성능 향상. 

Q4. 캐시 스탬프(Cache Stampede)란? 
A: 여러 요청이 동시에 만료된 캐시에 접근 → DB로 요청 폭주 현상. 

Q5. 분산 캐시 환경에서 무효화 전략은 어떻게 달라지나요? 
A: 여러 서버 캐시 동기화를 위해 Event-driven Invalidation, Pub/Sub, 메시지 큐 등을 사용하여 실시간 무효화 처리.

# 7\. 마무리

-   캐시는 성능 최적화의 핵심 도구이지만 **무효화 전략 없으면 데이터 불일치 발생**
-   TTL, Write-through, Write-back, Explicit 등 **상황에 맞는 전략 선택 필수**
-   면접 포인트: **필요성, 전략 구분, 분산 환경 문제, 캐시 스탬프 대응**