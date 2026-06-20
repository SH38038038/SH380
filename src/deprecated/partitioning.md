---
title: "파티셔닝(Partitioning) 기법"
date: "2025-03-31"
desc: "파티셔닝기법에 대해 알아보자"
tags: ["#CS"]
thumbnail: "/cs.svg"
---

![csgal-logo](/csgal.png)

# 1\. 이론

-   **정의**  
    파티셔닝은 **큰 테이블이나 인덱스를 물리적으로 분할하여 성능과 관리성을 개선하는 기법**입니다.  
    (논리적으로는 하나의 테이블처럼 보이지만 내부적으로는 여러 조각으로 나눠 저장)
-   **목적**
    -   대용량 데이터 성능 최적화
    -   특정 파티션만 조회 → **쿼리 성능 향상**
    -   데이터 관리 용이 (아카이빙, 삭제 등)
    -   부하 분산 및 I/O 최적화
-   **종류**
    
    | Range Partitioning | 특정 범위 기준으로 분할 | 주문일자별 (2023, 2024 …) |
    | --- | --- | --- |
    | List Partitioning | 명시적 값 집합 기준 분할 | 지역코드(서울, 부산, 대구) |
    | Hash Partitioning | 해시 함수로 균등 분산 | 고객 ID % 4 |
    | Composite Partitioning | 두 가지 이상 혼합 | Range + Hash |
    

  
  

# 2\. 활용

-   **Range Partition**→ 특정 연도만 빠르게 조회 가능
    
    ```SQL
    CREATE TABLE orders (
    order_id INT,
    order_date DATE,
    amount DECIMAL(10,2)
    )
    PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
    );
    ```
    
-   **Hash Partition**→ 고객 ID 기준 균등 분산
    
    ```SQL
    CREATE TABLE customers (
    customer_id INT,
    name VARCHAR(100)
    )
    PARTITION BY HASH(customer_id) PARTITIONS 4;
    ```
    
-   **활용 사례**
    -   로그 데이터 (일 단위 Range Partition)
    -   글로벌 서비스 지역 데이터 (List Partition)
    -   대규모 사용자 데이터 (Hash Partition)

# 3\. 심화

-   **장점**
    -   특정 파티션만 접근 → 쿼리 최적화 (Partition Pruning)
    -   데이터 관리 유연 → 특정 파티션만 삭제/백업 가능
    -   병렬 처리 → 성능 향상
-   **단점**
    -   파티션 키 설계가 잘못되면 오히려 성능 저하
    -   지나치게 많은 파티션은 관리 비용 ↑
    -   일부 DBMS는 파티션 제한 존재 (예: MySQL 8192개)
-   **파티션 vs 샤딩**
    -   파티셔닝: **한 DB 내에서 테이블 분할**
    -   샤딩: **데이터를 여러 DB 서버로 분산**

![partitioning](/partitioning.png)


# 4\. 면접 대비 핵심 포인트

-   파티셔닝 정의 및 목적
-   파티셔닝 기법 (Range / List / Hash / Composite)
-   장점: 성능 최적화, 관리 용이, 병렬 처리
-   단점: 잘못된 설계 시 성능 저하, 관리 비용 증가
-   파티셔닝 vs 샤딩 비교

  
  

# 5\. 면접 연습

Q1. 파티셔닝이란 무엇인가요? 
A: 대용량 테이블/인덱스를 물리적으로 나누어 성능과 관리 효율을 높이는 기법입니다. 

Q2. 파티셔닝 기법에는 어떤 것들이 있나요? 
A: Range, List, Hash, Composite Partitioning이 있습니다. 

Q3. 파티셔닝과 샤딩 차이는? 
A: 파티셔닝은 한 DB 내에서 테이블을 분할하는 것이고, 샤딩은 데이터를 여러 DB 서버에 분산하는 것입니다. 

Q4. 파티셔닝의 장점과 단점은? 
A: 장점은 성능 향상, 관리 용이성, 병렬 처리 가능. 단점은 잘못된 키 설계 시 성능 저하, 관리 복잡성 증가입니다.

  
  

# 6\. 마무리 

-   파티셔닝은 **대용량 데이터 관리·최적화 핵심 기술**
-   Range/List/Hash/Composite 기법 숙지 필수
-   면접에서는 **파티셔닝 정의, 목적, 기법, 샤딩 비교** 질문 자주 출제
-   실무에서는 **로그, 지역, 사용자 데이터 관리**에 자주 활용