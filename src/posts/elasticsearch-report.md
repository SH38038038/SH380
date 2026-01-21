---
title: "SQL vs ElasticSearch: 검색 속도 및 정확도 비교"
date: "2025-08-23"
desc: "SQL과 elasticsearch의 검색 속도와 정확도를 비교해보자"
tags: ["#SQL", "#Elasticsearch", "#infra"]
thumbnail: "/thumbnail.svg"
---

![elasticsearch-logo](/elasticsearch.png)

**1. 테스트 환경**
데이터베이스: MySQL 8
검색엔진: Elasticsearch 8
총 게시글 수
MySQL: 1,008건
Elasticsearch: 10,056건
테스트 데이터: 관심사 기반 랜덤 모임 데이터

**2. 데이터 현황 비교**
| 항목 | MySQL | Elasticsearch |
| :--- | :--- | :--- |
| **총 게시글 수** | 1,008 | 10,056 |
| **색인 구조** | 테이블 컬럼 기반 | 인덱스, 도큐먼트 기반 |
| **검색 방식** | SQL LIKE / 조건 검색 | Full-text, n-gram, fuzzy 검색 |
| **속도** | 상대적으로 느림 JOIN/복잡 조건 시 지연 발생 | 초당 수천~만 건 검색 가능 복잡 조건에서도 빠름 |

* 주의: Elasticsearch 문서 수가 DB보다 많음 → 과거 테스트 데이터가 누적되어 있기 때문. 실제 서비스 기준 DB 데이터와 1:1 비교는 아님

1. 검색 성능 테스트

2) 단순 키워드 검색

데이터셋:
ElasticSearch: 약 10,056건 문서 (Board 데이터)
MySQL SQL 검색: 약 1,008건 문서
검색 키워드: "축구"
요청 파라미터: { "title": "축구", "page": 0, "size": 10000 }

```json
ElasticSearch API

/api/boards/search

// request

{
  "title": "축구",
  "page": 0,
  "size": 10000
}

// response
{
  "boards": [
  ...
  ],
  "totalHits": 150,
  "tookMillis": 47
}
```

```json
SQL API

/api/boards/search/sql

// request

{
  "title": "축구",
  "page": 0,
  "size": 10000
}

//response

{
  "boards": [
  ...
  ],
  "totalHits": 150,
  "tookMillis": 815
}
```

| 구분 | ElasticSearch | SQL (MySQL) |
| :--- | :--- | :--- |
| **데이터셋** | 약 10,056건 문서 | 약 1,008건 문서 |
| **검색 키워드** | "축구" | "축구" |
| **요청 파라미터** | `{ "title": "축구", ... "size": 10000 }` | `{ "title": "축구", ... "size": 10000 }` |
| **검색 결과 총 건수** | 150건 | 150건 |
| **검색 소요 시간** | **47 ms** 🚀 | 815 ms |
| **속도 향상** | **약 17배 빠름 (기준)** | 약 17배 느림 |
| **검색 정확도** | 형태소 분석 + ngram + fuzziness 적용 | LIKE 기반 단순 매칭 |
| **확장성** | 대규모 데이터에서도 안정적 | 데이터 증가 시 성능 급격히 저하 |

![er01](/er01.png)
![er02](/er02.png)
![er03](/er03.png)
![er04](/er04.png)
2) 검색 필터링 사용시

데이터셋:
ElasticSearch: 약 10,056건 문서 (Board 데이터)
MySQL SQL 검색: 약 1,008건 문서
검색 키워드: "요가"
검색 필터: ONLINE / 서울
요청 파라미터: { "title": "요가", "meetType": "ONLINE", "meetDetail": "서울", "page": 0, "size": 10000 }
```json
ElasticSearch API

/api/boards/search

// request

{
  "title": "요가",
  "meetType": "ONLINE",
  "meetDetail": "서울",
  "page": 0,
  "size": 10000
}

//response

{
  "boards": [
  ...
  ],
  "totalHits": 79,
  "tookMillis": 29
}
```

```json
SQL API

/api/boards/search/sql

// request

{
  "title": "요가",
  "meetType": "ONLINE",
  "meetDetail": "서울",
  "page": 0,
  "size": 10000
}

//response

{
  "boards": [
  ...
  ],
  "totalHits": 44,
  "tookMillis": 233
}
```
| 구분 | ElasticSearch | SQL (MySQL) |
| :--- | :--- | :--- |
| **데이터셋** | 약 10,056건 문서 | 약 1,008건 문서 |
| **검색 키워드** | "요가" | "요가" |
| **요청 파라미터** | `{ "title": "요가", "meetType": "ONLINE", ... }` | `{ "title": "요가", "meetType": "ONLINE", ... }` |
| **검색 결과 총 건수** | 79건 | 44건 |
| **검색 소요 시간** | **29 ms** 🚀 | 233 ms |
| **속도 향상** | **약 8배 빠름 (기준)** | 약 8배 느림 |
| **검색 정확도** | 형태소 분석 + ngram + fuzziness 적용 | LIKE 기반 단순 매칭 |
| **확장성** | 대규모 데이터에서도 안정적 | 데이터 증가 시 성능 급격히 저하 |


![er05](/er05.png)
![er06](/er06.png)
![er07](/er07.png)
![er08](/er08.png)
3) 긴 키워드 검색 시

데이터셋:
ElasticSearch: 약 10,056건 문서 (Board 데이터)
MySQL SQL 검색: 약 1,008건 문서
검색 키워드: "클래식 음악 감상"
검색 필터: OFFLINE / 서울 강남
요청 파라미터: { "title": "클래식 음악 감상", "meetType": "OFFLINE", "meetDetail": "서울 강남", "page": 0, "size": 10000 }
```json
ElasticSearch API

/api/boards/search

// request

{
  "title": "클래식 음악 감상",
  "meetType": "OFFLINE",
  "meetDetail": "서울 강남",
  "page": 0,
  "size": 10000
}

// response

{
  "boards": [
    {
      "title": "클래식 음악 감상 모임",
      ...
    },
    {
      "title": "영화 감상 모임",
      ...
      ],
      "sub_tags": null,
      "howMany": 2,
      "participation": 0,
      "detailId": 2040,
      "liked": false,
      "confirmed": false
    },
    {
      ...
    },
    {
      "title": "플라워 클래스 모임",
      ...
    },
    {
      "title": "요리 클래스 모임",
      ...
    },
    ...
   ],
  "totalHits": 250,
  "tookMillis": 128
}
```

```json
SQL API

/api/boards/search/sql

//request

{
  "title": "클래식 음악 감상",
  "meetType": "OFFLINE",
  "meetDetail": "서울 강남",
  "page": 0,
  "size": 10000
}

//response

{
  "boards": [],
  "totalHits": 0,
  "tookMillis": 32
}
```

| 구분 | ElasticSearch | SQL (MySQL) |
| :--- | :--- | :--- |
| **데이터셋** | 약 10,056건 문서 | 약 1,008건 문서 |
| **검색 키워드** | "클래식 음악 감상" | "클래식 음악 감상" |
| **요청 파라미터** | `{ "title": "클래식 음악 감상", "meetType": "OFFLINE", ... }` | `{ "title": "클래식 음악 감상", "meetType": "OFFLINE", ... }` |
| **검색 결과 총 건수** | **250건** (유연한 검색) | **0건** (검색 실패) |
| **검색 소요 시간** | 128 ms | 32 ms (결과 없음) |
| **검색 정확도** | 형태소 분석 + ngram + fuzziness 적용 | LIKE 기반 단순 매칭<br>복합 조건 검색 불가 |
| **확장성** | 대규모 데이터에서도 안정적 | 데이터 증가 시 성능 및 정확도 급격히 저하 |

![er09](/er09.png)
![er10](/er10.png)
![er11](/er11.png)
![er12](/er12.png)

4) 오타 검색 시

데이터셋:
ElasticSearch: 약 10,056건 문서 (Board 데이터)
MySQL SQL 검색: 약 1,008건 문서
검색 키워드: "축구ㅜ"
요청 파라미터: { "title": "축구ㅜ", "page": 0, "size": 10000 }

```json
ElasticSearch API

/api/boards/search

//request

{
  "title": "축구ㅜ",
  "page": 0,
  "size": 10000
}

//response

{
  "boards": [
    ...
  ],
  "totalHits": 150,
  "tookMillis": 43
}
```


```json
SQL API

/api/boards/search/sql

// request

{
  "title": "축구ㅜ",
  "page": 0,
  "size": 10000
}

// response

{
  "boards": [],
  "totalHits": 0,
  "tookMillis": 36
}
```
| 구분 | ElasticSearch | SQL (MySQL) |
| :--- | :--- | :--- |
| **데이터셋** | 약 10,056건 문서 | 약 1,008건 문서 |
| **검색 키워드** | "축구ㅜ" (오타 포함) | "축구ㅜ" (오타 포함) |
| **요청 파라미터** | `{ "title": "축구ㅜ", ... }` | `{ "title": "축구ㅜ", ... }` |
| **검색 결과 총 건수** | **150건** (오타 보정 성공) | **0건** (검색 실패) |
| **검색 소요 시간** | 43 ms | 36 ms (결과 없음) |
| **검색 정확도** | **오타 허용(Fuzziness) 적용**<br>유사 단어 검색 가능 | LIKE 기반 단순 매칭<br>오타 검색 불가 |
| **확장성** | 대규모 데이터에서도 안정적 | 데이터 증가 시 성능 및 정확도 급격히 저하 |


![er13](/er13.png)
![er14](/er14.png)
![er15](/er15.png)
![er16](/er16.png)

**4. 정리**
1. 검색 속도
ElasticSearch는 모든 테스트 케이스에서 SQL 대비 월등히 빠른 검색 속도를 보여줌.
단순 키워드 "축구" 검색: 47ms vs 815ms → 약 17배 빠름
조건 포함 검색 "요가", ONLINE, 서울": 29ms vs 233ms → 약 8배 빠름
복합 조건 + 키워드 "클래식 음악 감상", OFFLINE, 서울 강남": 128ms vs 32ms → SQL가 단순 쿼리일 경우 더 빠르지만, 결과가 0건으로 정확도는 매우 낮음
대규모 데이터(약 10,000건)에서도 검색 시간이 안정적으로 유지됨.

2. 검색 정확도
ElasticSearch는 형태소 분석, ngram, fuzziness를 지원하여:
오타 허용 검색 가능 ("축구ㅜ" → 결과 150건)
유사 키워드 및 복합 조건 검색 가능
SQL LIKE 기반 검색은:
오타 허용 불가 ("축구ㅜ" → 결과 0건)
복합 조건 시 데이터 일부만 검색 가능하거나 결과가 없음

3. 확장성
ElasticSearch: 데이터 규모 증가에도 성능 저하가 상대적으로 적고, 분산 환경에서 수평 확장 가능
SQL: 데이터가 증가하면 쿼리 속도가 급격히 저하되고, LIKE 기반 검색 정확도도 낮아짐

4. 실용성 및 유연성
ElasticSearch는 검색 쿼리 작성이 다양하고, 복잡한 조건과 필터링, 정렬, 페이징을 쉽게 지원
SQL은 단순 텍스트 매칭 및 제한적 조건 검색에만 적합하며, 확장성 측면에서 한계

5. 총평
속도와 정확도, 확장성 측면에서 ElasticSearch가 압도적 우위.
SQL 기반 검색은 소규모 데이터에서는 빠를 수 있으나, 조건 복합, 오타 허용, 대용량 데이터 검색에서는 실용성이 낮음.
따라서 대규모, 복합 조건, 오타 허용, 사용자 경험이 중요한 검색 기능에서는 ElasticSearch 도입이 필수적임.