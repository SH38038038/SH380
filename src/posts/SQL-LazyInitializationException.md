---
title: "SQL 기반 검색에서 LazyInitializationException 발생 문제"
date: "2025-08-19"
desc: "SQL 기반 검색에서 LazyInitializationException 발생 문제가 발생하였다. "
tags: ["#SQL", "#Troubleshooting"]
thumbnail: "/ts.svg"
---

## 문제 원인
​
-   Board 엔티티가 subTags와 같은 **컬렉션을 Lazy 로딩**으로 가지고 있음.
-   컨트롤러에서 DTO로 변환 시, 트랜잭션 범위를 벗어난 상태에서 board.getSubTags()를 접근하면 아래 오류 발생:
​
```textplain
failed to lazily initialize a collection of role: com.project.moyora.app.domain.Board.subTags: could not initialize proxy - no Session
```
​
## 해결 방법
​
1.  **@Transactional 사용**
    -   Service 레이어에서 트랜잭션을 열어 컬렉션 접근 시 Lazy 로딩 가능.
2.  **JPQL Fetch Join**
    -   Repository 쿼리에서 LEFT JOIN FETCH b.subTags를 사용해 미리 데이터 로딩.
3.  **DTO Projection**
    -   엔티티를 직접 반환하지 않고 필요한 컬렉션까지 포함한 DTO를 Repository에서 바로 조회.
4.  **Hibernate.initialize()**
    -   강제로 컬렉션 초기화.
5.  **EAGER Fetch**
    -   엔티티 매핑 시 @OneToMany(fetch = FetchType.EAGER) 사용.
​
## \---> Repository에서 Fetch Join + Service에서 DTO 변환
​
```java
@Query("""
    SELECT DISTINCT b FROM Board b
    LEFT JOIN FETCH b.subTags st
    WHERE (:keyword IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')))
    AND (:interestTags IS NULL OR st IN :interestTags)
    AND (:meetType IS NULL OR b.meetType = :meetType)
    AND (:meetDetail IS NULL OR b.meetDetail = :meetDetail)
""")
List<Board> searchBoardsWithUserTags(...);
```
​
-   Service 레이어에서 Page로 변환 후 DTO로 안전하게 매핑.
​
## 이유
​
-   DTO 변환 시 컬렉션이 이미 초기화되어 있어서 LazyInitializationException 발생하지 않음.
-   트랜잭션 범위를 최소화하면서 필요한 데이터만 로딩 가능.
-   다른 방법(EAGER, Hibernate.initialize())은 성능 문제나 코드 유지보수 복잡도를 초래할 수 있음.
​
LazyInitializationException 는
​
-   REST API에서 엔티티를 바로 반환할 때
-   Controller에서 트랜잭션 범위 밖에서 컬렉션에 접근할 때
-   Batch 조회 또는 페이징 처리 후 Lazy 컬렉션을 DTO로 변환할 때
​
빈번하게 발생 가능하니 주의하자.