---
title: "Test Data 삽입 시 JPA 컬렉션 초기화 문제"
date: "2025-08-19"
desc: "Test Data 삽입 시 JPA 컬렉션이 초기화 되는 문제가 발생하였다."
tags: ["#Springboot", "JPA", "#server", "#Troubleshooting"]
thumbnail: "/thumbnail.svg"
---

```textplain
Caused by: org.springframework.orm.jpa.JpaSystemException: A collection with cascade="all-delete-orphan" was no longer referenced by the owning entity instance: com.project.moyora.app.domain.Board.applications
```

## 문제 원인

-   검색엔진 성능 비교를 위한 테스트 데이터 1000건 삽입 중 문제 발생
-   Board 객체를 생성할 때 **applications 컬렉션을 초기화하지 않음**
-   **JPA에서 orphanRemoval 설정 때문에 문제**

## 해결 방법

-   Board.builder()에서 applications 필드를 **빈 리스트로 초기화**

```java
// Board 객체 생성 (confirmed=true)
Board board = Board.builder()
        .id(i)
        .writer(writer) // 공통 writer
        .title(title)
        .content(content)
        .meetDetail(meetDetail)
        .tags(List.of(InterestTag.SPORTS)) // 예시는 SPORTS로 고정
        .genderType(GenderType.FEMALE)
        .minAge(18 + random.nextInt(10))
        .maxAge(25 + random.nextInt(10))
        .howMany(2 + random.nextInt(5))
        .participation(0)
        .meetType(randomMeetType())
        .startDate(LocalDate.now())
        .endDate(LocalDate.now().plusDays(random.nextInt(30)))
        .confirmed(true) // 확정 모임
        .createdTime(LocalDateTime.now())
        .applications(List.of()) // <- 빈 리스트로 초기화
        .build();
```

## \*JPA orphanRemoval 주의

### 1\. 의미

-   부모에서 참조 끊긴 자식 엔티티를 **자동 삭제**
-   **JPA에서 cascade="all-delete-orphan" 옵션이 설정된 컬렉션이 더 이상 소유 엔티티에 의해 참조되지 않을 때 :**

```textplain
org.springframework.orm.jpa.JpaSystemException: A collection with cascade="all-delete-orphan" was no longer referenced by the owning entity instance
```

### 2\. 흔한 오류

-   컬렉션을 새로 교체할 때
-   컬렉션 타입이 엔티티와 안 맞을 때 (List vs Set)
-   컬렉션이 null일 때

### 3\. 안전 사용법

-   컬렉션 타입과 초기화 타입 일치 (List → ArrayList, Set → HashSet)
-   컬렉션 교체 대신 내부 요소만 수정

```java
board.getApplications().clear(); 
board.getApplications().add(newApp);
```

-   null 대신 빈 컬렉션으로 초기화

### 핵심

-   컬렉션 참조 유지 + 타입 일치 + null 방지 → JpaSystemException 예방