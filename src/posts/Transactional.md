---
title: "@Transactional 이해와 활용"
date: "2025-03-30"
desc: "@Transactional에 대해 알아보자"
tags: ["#CS"]
thumbnail: "/csgal.png"
---

![csgal-logo](/csgal.png)

# 1\. 이론

-   **정의**: 스프링에서 데이터베이스 트랜잭션을 선언적으로 관리하는 어노테이션.
-   **역할**:
    -   여러 DB 연산을 하나의 단위로 묶어 **원자성 보장**
    -   예외 발생 시 자동 롤백
-   **트랜잭션 속성**

| propagation | 트랜잭션 전파 방식 (기본: REQUIRED) |
| --- | --- |
| isolation | 격리 수준 (READ\_COMMITTED 등) |
| timeout | 트랜잭션 수행 시간 제한 |
| readOnly | 읽기 전용 트랜잭션 설정 |
| rollbackFor | 특정 예외 발생 시 롤백 지정 |

  
  

# 2\. 활용

-   **Service 계층에 주로 적용**:
    -   Repository는 단일 DB 작업만 수행 → 트랜잭션 불필요한 경우 많음
    -   Service 계층에서 여러 Repository 호출 시 데이터 일관성 보장
-   **예제**

```java
@Service
public class UserService {
    @Transactional
    public void registerUser(UserDto dto) {
        userRepository.save(dto.toEntity());
        emailService.sendWelcomeEmail(dto.getEmail());
    }
}
```

-   **주의**
    -   같은 클래스 내부 메서드 호출 시 트랜잭션 적용되지 않음 (self-invocation 문제)
    -   체크 예외(Exception)는 기본 롤백 안 됨 → rollbackFor 필요

  
  

# 3\. 트랜잭션 심화

## 3-1. 전파(Propagation)

| REQUIRED | 기존 트랜잭션 있으면 참여, 없으면 새 생성 (기본) |
| --- | --- |
| REQUIRES\_NEW | 항상 새 트랜잭션 생성, 기존 트랜잭션 일시 중단 |
| NESTED | 기존 트랜잭션 안에서 savepoint 활용 |

\*Tip: 외부 트랜잭션과 독립적으로 처리하고 싶으면 REQUIRES\_NEW 사용

## 3-2. 격리(Isolation)

| READ\_UNCOMMITTED | 다른 트랜잭션 커밋 전 데이터도 읽음 (Dirty Read 가능) | 로그성 조회 |
| --- | --- | --- |
| READ\_COMMITTED | 커밋된 데이터만 읽음 (Default) | 대부분 실무 |
| REPEATABLE\_READ | 같은 트랜잭션 내 동일 쿼리 결과 보장 | 재고 처리 등 |
| SERIALIZABLE | 가장 엄격, 동시에 처리 불가 | 금융 트랜잭션 |

## 3-3. 롤백 규칙

-   **언체크 예외(RuntimeException)** → 기본 롤백
-   **체크 예외(Exception)** → 기본 롤백 안 됨 → 필요 시 rollbackFor

```java
@Transactional(rollbackFor = Exception.class)
```

## 3-4. self-invocation & 프록시

-   스프링 트랜잭션은 **AOP 기반 프록시** 적용
-   같은 클래스 내부 호출 시 프록시를 거치지 않으므로 트랜잭션 동작 안 함
-   해결 방법:
    -   트랜잭션 메서드를 다른 Bean으로 분리
    -   @Autowired로 자기 자신을 주입하여 호출

![transactional-graph](/transactional-graph.png)
# 4\. 면접 대비 핵심 포인트

-   트랜잭션이 **왜 Service 계층에 적용되는지**
-   **전파(propagation)**와 **격리(isolation) 수준** 이해
-   롤백 기준과 체크/언체크 예외 차이
-   readOnly와 성능 최적화
-   self-invocation 문제와 AOP 기반 트랜잭션 동작 원리

  
  

# 5\. 면접 연습

Q1. @Transactional을 Service 계층에 적용하는 이유? 
A: Repository는 단일 DB 작업만 수행 → 트랜잭션 필요성이 낮음. Service 계층에서 여러 Repository 호출 시 하나의 논리적 단위로 묶어 데이터 일관성을 보장. 

Q2. 트랜잭션 전파(propagation)란? 
A: 이미 존재하는 트랜잭션 안에서 새 메서드가 호출될 때 트랜잭션 처리 방식을 지정. 예: REQUIRED, REQUIRES\_NEW, NESTED 

Q3. 롤백이 자동으로 되지 않는 경우가 있나요? 
A: 체크 예외(\`Exception\`) 발생 시 기본 롤백 안 됨. 필요 시 \`rollbackFor\` 속성 사용 

Q4. self-invocation 문제란? 
A: 같은 클래스 내부에서 트랜잭션 메서드를 호출하면 프록시가 적용되지 않아 트랜잭션이 동작하지 않는 현상 

Q5. readOnly 옵션은 언제 사용하는가? 
A: 조회 전용 트랜잭션 시 성능 최적화를 위해 사용. 쓰기 작업 수행 시 예외 발생 가능

  
  

# 6\. 마무리

-   @Transactional은 **데이터 무결성 보장과 예외 처리**의 핵심 도구
-   Service 계층 중심 적용, 전파/격리/롤백 규칙 이해 필수
-   면접에서는 **왜 Service에 적용하는지, 전파와 롤백 규칙**을 꼭 질문