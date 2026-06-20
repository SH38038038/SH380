---
title: "비동기 처리와 Future 활용"
date: "2025-03-31"
desc: "비동기 처리와 Future에 대해 알아보자"
tags: ["#CS"]
thumbnail: "/cs.svg"
---

![csgal-logo](/csgal.png)

# 1\. 이론
​
-   **비동기 처리(Asynchronous Processing)**
    -   요청한 작업이 끝날 때까지 기다리지 않고, 다른 작업을 병렬로 수행하는 방식
    -   CPU, I/O 자원 활용도를 극대화해 성능 개선
-   **Future란?**
    -   자바에서 비동기 연산의 **결과를 나중에 받아올 수 있도록 하는 객체**
    -   ExecutorService.submit() 호출 시 반환
    -   비동기 작업의 결과를 get()으로 조회 가능
-   **핵심 개념**  
    
    | Blocking | 결과가 올 때까지 대기 (future.get()) |
    | --- | --- |
    | Non-Blocking | 콜백/완료 이벤트로 결과 확인 (CompletableFuture) |
    | 병렬 처리 | 여러 태스크를 동시에 실행 → 응답 시간 단축 |
    
​
  
  
​
# 2\. 활용
​
-   **기본 예제 (Java Future)**
​
```java
ExecutorService executor = Executors.newFixedThreadPool(2);
​
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 10;
});
​
System.out.println("작업 실행 중...");
// get() 호출 시 결과 대기
Integer result = future.get();
System.out.println("결과: " + result);
```
​
-   **CompletableFuture 활용**
    -   콜백 기반 체이닝 → Non-Blocking 처리 가능
        
        ```java
        CompletableFuture.supplyAsync(() -> {
        return "데이터 로딩";
        }).thenApply(data -> data + " 완료")
        .thenAccept(System.out::println);
        ```
        
-   **활용 사례**
    -   API 병렬 호출
    -   대규모 데이터 처리 시 I/O 비동기 처리
    -   UI 애플리케이션에서 메인 스레드 블로킹 방지
​
  
  
​
# 3\. 심화
​
-   **Future vs CompletableFuture**  
    
    | 항목 | Future | Completable Future |
    | --- | --- | --- |
    | 결과 조회 | get() (Blocking) | 콜백 기반 Non-Blocking 가능 |
    | 취소 가능 여부 | cancel() 지원 | 지원 |
    | 예외 처리 | 직접 try-catch 필요 | exceptionally() 제공 |
    | 병렬 조합 | 불편함 | allOf(), anyOf()로 다수 Future 조합 |
    
    **서버 성능 개선 관점**
    -   I/O Bound 작업(네트워크, DB 호출)에 적합
    -   CPU Bound 작업은 ForkJoinPool 기반 병렬 처리로 성능 향상
    -   불필요한 스레드 낭비 방지 → 스레드 풀 크기 조절 필수
-   **주의할 점**
    -   무분별한 비동기 → Context Switching 오버헤드 증가
    -   future.get() 남용 → 사실상 동기 처리와 다를 바 없음
    -   예외 처리 누락 → 장애 추적 어려움

![future-graph](/future-graph.png)
![completable-future-graph](/completable-future-graph.png)

# 4\. 면접 대비 핵심 포인트

-   비동기 처리의 정의와 장점 (성능 개선, 응답 지연 최소화)
-   Future의 개념과 한계 (Blocking 문제)
-   CompletableFuture의 강점 (Non-Blocking, 체이닝, 예외 처리, 조합 기능)
-   CPU Bound vs I/O Bound 작업에서 비동기 활용 전략
-   서버 성능 최적화와 스레드 풀 관리 중요성

  
  

# 5\. 면접 연습

Q1. 비동기 처리란 무엇이고 왜 필요한가요? 
A: 요청 결과를 기다리지 않고 다른 작업을 동시에 수행하는 방식입니다. 자원 활용도를 극대화하고, I/O 대기 시간 동안 CPU 낭비를 줄여 성능을 개선할 수 있습니다. 

Q2. Future의 한계는 무엇인가요? 
A: \\\`get()\\\` 호출 시 Blocking이 발생하고, 다수 Future를 조합하기 불편합니다. 예외 처리나 Non-Blocking 체이닝에도 제약이 있습니다. 

Q3. CompletableFuture가 Future보다 좋은 점은? 
A: 콜백 기반 Non-Blocking 지원, 체이닝, 예외 처리(\\\`exceptionally\\\`), Future 조합(\\\`allOf\\\`, \\\`anyOf\\\`) 기능을 제공합니다. 

Q4. 비동기 처리가 항상 성능을 높이나요? 
A: 아닙니다. CPU Bound 작업에선 스레드 전환 비용이 오히려 성능을 떨어뜨릴 수 있습니다. I/O Bound 작업에서 효과가 더 큽니다. 

Q5. 서버 성능 개선 관점에서 주의할 점은? 
A: 스레드 풀 크기를 적절히 조절해야 하며, 불필요한 비동기화는 오히려 성능 저하를 유발합니다. 예외 처리를 반드시 고려해야 합니다.

  
  

# 6\. 마무리

-   비동기 처리 = **성능 최적화 핵심 전략**
-   Future는 시작점, **CompletableFuture로 진화**
-   활용 시 I/O Bound와 CPU Bound 특성 구분 필요
-   면접 포인트: 비동기 개념, Future 한계, CompletableFuture 장점, 성능 관점 설명 가능