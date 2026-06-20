---
title: "JVM 구조 이해"
date: "2025-01-31"
desc: "JVM 구조에 대해 알아보자"
tags: ["#CS"]
thumbnail: "/cs.svg"
---

![csgal-logo](/csgal.png)


# 1\. 이론

-   **JVM (Java Virtual Machine)**  
    자바 프로그램을 실행하기 위한 가상 머신. 자바 소스를 컴파일한 **바이트코드(.class)** 를 실행.  
    운영체제와 하드웨어에 독립적 실행 환경 제공.
-   **JVM 주요 역할**
    1.  **바이트코드 로딩**
    2.  **바이트코드 검증 및 실행**
    3.  **메모리 관리 (GC 포함)**
    4.  **네이티브 메서드 호출 지원**
-   **JVM 구성 요소**  
    
    | Class Loader | .class 파일을 메모리에 로드 |
    | --- | --- |
    | Runtime Data Area | 실행 시 데이터 저장 영역 (Heap, Stack 등) |
    | Execution Engine | 바이트코드 실행 (Interpreter, JIT Compiler) |
    | Native Method Interface | 자바 코드 ↔ 네이티브 라이브러리 연결 |
    | Native Method Library | C/C++ 등 네이티브 코드 라이브러리 |
    

  
  

# 2\. 활용

-   **개발자 관점에서 JVM 이해 포인트**
    -   GC 동작 원리를 이해해야 **메모리 최적화** 가능
    -   JIT Compiler와 Interpreter 차이를 알아야 **성능 튜닝** 가능
    -   Runtime Data Area의 구조를 알면 **스택/힙 메모리 이슈 디버깅** 가능
-   **예시: OutOfMemoryError 대응**
    -   Heap 영역 초과 → GC 튜닝, 객체 생명주기 최적화
    -   Metaspace 초과 → 클래스 로딩 구조 점검

  
  

# 3\. 심화

-   **Runtime Data Area 상세**
    
    | Method Area (Metaspace) | 클래스 메타정보, static 변수 저장 |
    | --- | --- |
    | Heap | 객체 저장, GC 관리 |
    | Stack | 각 스레드마다 존재, 메서드 호출/지역변수 저장 |
    | PC Register | 현재 실행 중인 명령어 주소 저장 |
    | Native Method Stack | JNI 기반 네이티브 메서드 실행 |
    

-   **Execution Engine 내부**
    -   **Interpreter**: 바이트코드를 한 줄씩 실행 (느림)
    -   **JIT (Just-In-Time) Compiler**: 자주 실행되는 코드 블록을 네이티브 코드로 컴파일 후 캐싱 → 성능 향상
    -   **GC (Garbage Collector)**: 사용하지 않는 객체 자동 회수


![jvm-flow](/jvm-flow.png)
  

# 4\. 면접 대비 핵심 포인트

-   JVM 구성 요소 (Class Loader, Runtime Data Area, Execution Engine) 설명 가능해야 함
-   Runtime Data Area 세부 영역 구분 (Heap vs Stack vs Metaspace)
-   GC와 JIT Compiler의 역할과 차이
-   OutOfMemoryError 원인별 대응 전략

  
  

# 5\. 실제 면접 질문 & 답변 (토글)

Q1. JVM의 주요 구성 요소는? 
A: Class Loader, Runtime Data Area, Execution Engine, Native Method Interface, Native Method Library. 

Q2. Heap과 Stack의 차이는? 
A: Heap은 객체 저장소이며 GC 대상. Stack은 각 스레드마다 존재하며 메서드 호출과 지역 변수를 저장. 

Q3. JIT Compiler가 하는 역할은? 
A: 자주 실행되는 바이트코드를 네이티브 코드로 컴파일하여 성능을 향상시킴. 

Q4. OutOfMemoryError가 발생하는 이유는? 
A: Heap 부족, Metaspace 초과, 스레드 생성 초과 등 영역별 자원 고갈에 따라 다르게 발생.

  
  

# 6\. 마무리

-   JVM은 **자바 실행 환경의 핵심 엔진**
-   구조 이해는 곧 **성능 최적화와 문제 해결 능력**으로 연결
-   면접에서는 **JVM 구성 요소, Heap vs Stack, GC, JIT Compiler** 중심으로 질문 빈출