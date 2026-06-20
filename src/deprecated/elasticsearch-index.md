---
title: "검색 성능 개선을 위한 Elasticsearch 인덱스 구조와 쿼리 최적화"
date: "2025-08-30"
desc: "검색 성능 개선을 위한 Elasticsearch 인덱스 구조와 쿼리 최적화하는 방법에 대해 알아보자"
tags: ["#Elasticsearch", "#infra"]
thumbnail: "/thumbnail.svg"
---

![elasticsearch-logo](/elasticsearch.png)

출처 : [https://techblog.woowahan.com/20161/](https://techblog.woowahan.com/20161/)


대형 셀러의 지속적인 추가 → 색인 문서의 양의 약 3배 증가

검색 API에 다양한 필터와 검색어 매칭 필드가 추가

리스팅 API를 새롭게 제공하면서 검색 및 리스팅 API 호출수 약 1.5배 증가

\-> 서버가 처리해야 할 기능과 요청량이 급격히 증가. 성능 개선 필요

**\-> 검색 API의 레이턴시를 감소시키고 ES 인덱스 구조 최적화 및 쿼리 최적화**

### 1\. 현상

-   커머스 검색에서 **특정 카테고리 필터**(categoryId) 적용 시 응답 지연 발생.
-   예시:
    -   필터 없음: **115ms**
    -   필터 있음: **980ms**
-   문제는 쿼리 자체에는 없어 보였지만, **필드 타입과 내부 색인 방식**이 원인임.

### 2\. 문제 원인

-   categoryId를 **integer 타입**으로 색인함.
-   integer 필드는 Lucene 내부에서 **PointValues + KD-Tree** 기반으로 저장.
-   **Term 쿼리**로 특정 값을 검색할 경우에도 \*\*범위 검색 구조(PointRangeQuery)\*\*를 통해 탐색됨 → 오버헤드 발생.
-   즉, 단일 값 검색임에도 불구하고 KD-Tree 기반 탐색이 수행되어 느림.

### 3\. 해결 방법

-   categoryId에 **keyword 서브필드** 추가:

```json
"categoryId": {
  "type": "integer",
  "fields": {
    "keyword": {
      "type": "keyword"
    }
  }
}
```

-   **term 쿼리**에서 categoryId.keyword 사용:

```json
{
  "term": {
    "categoryId.keyword": 1000
  }
}
```

-   keyword 타입은 **역인덱스 기반**으로 단일 값 매칭이 매우 빠름.

### 4\. 개선 결과

구분 개선 전 개선 후

| categoryId 필드 타입 | integer | integer + keyword 서브필드 |
| --- | --- | --- |
| 쿼리 | term on integer | term on keyword |
| API 응답 시간 | 980ms | 104ms |

### 5\. 핵심 포인트

-   **integer 타입**: 범위 검색에 최적화, 단일 값 검색은 비효율적.
-   **keyword 타입**: 정확한 값 검색(term query)에 최적화, 역색인 사용 → 빠름.
-   카테고리처럼 **단일 값 필터링**만 필요한 경우 **keyword로 term 쿼리** 수행이 성능상 유리.

### 1\. 현상

-   대부분의 슬로우 쿼리는 "포켓몬" 키워드 검색에서 발생.
-   기존 카테고리 필터 최적화 이후에도 특정 키워드에서 쿼리 지연이 나타남.

### 2\. 문제 원인

-   **function\_score 쿼리**를 사용하여 특정 카테고리나 조건에 점수 부스팅.
-   기존 쿼리 구조:

```json
"function_score": {
  "query": { "match_all": {} },
  "functions": [ ... ]
}
```

-   문제: "match\_all" 때문에 **모든 문서에 대해 부스팅 함수 실행**.
-   "포켓몬" 키워드는 최상위 카테고리에 속하고 거의 모든 문서에 색인되어 있어, 불필요한 연산 과다 발생 → 레이턴시 증가.

### 3\. 해결 방법

-   function\_score.query 내부에 **기존 필터 조건** 포함:

```json
"function_score": {
  "query": {
    "bool": {
      "filter": [
        상품상태 및 키워드 매칭 조건
      ]
    }
  },
  "functions": [ ... ]
}
```

-   이제 **부스팅 연산은 필터링된 결과에만 적용**.
-   중복된 filter와 불필요한 depth 제거로 쿼리 가독성 개선.

### 4\. 개선 결과

-   "포켓몬" 키워드로 인한 슬로우 쿼리 사라짐.
-   쿼리 구조 명확화 → 유지보수, 분석 효율 증가.

### 5\. 핵심 포인트

-   function\_score에서 **query 필터링 중요**:
    -   match\_all 사용 시 **모든 문서에 부스팅 연산 적용** → 성능 저하.
    -   필터 적용 후 점수 부여 → 불필요 연산 최소화.
-   중복 filter 제거, 쿼리 depth 단순화 → 가독성 및 최적화.

### 1\. 현상

-   대형 셀러 입점으로 상품 수가 1천만 건 → 5천만 건 이상으로 증가.
-   키워드 검색 API 및 상품 리스팅, aggregation API 등 다양한 기능에서 레이턴시 지연 발생.
-   특히 top\_hits aggregation에서 **Painless 스크립트를 이용한 점수 계산** 과정이 성능 병목.

### 2\. 문제 원인

-   Painless 스크립트에서 \_score 역산, keywordMatchingScore, ctrScore, recommendScore 등을 계산.
-   반복문, 스크립트 연산 등으로 인해 **검색/정렬 시 CPU 부하 증가**.
-   aggregation 시 top\_hits 정렬 과정에서 특히 느림.

### 3\. 해결 방법

#### 3-1. Keyword Matching Score

-   기존: \_score 내에서 keywordMatchingScore를 추출 후 역산 및 점수 보정.
-   개선: 각 필드별 점수 계산을 **쿼리 단계에서 분리**.

```json
{
  "bool": {
    "should": [
      { "constant_score": { "filter": { productName 조건 } }, "boost": 10 * 보정연산 },
      { "constant_score": { "filter": { sellerName 조건 } }, "boost": 20 * 보정연산 },
      { "constant_score": { "filter": { shopName 조건 } }, "boost": 30 * 보정연산 }
    ]
  }
}
```

#### 3-2. CTR Score

-   기존: 반복문으로 ctrFeatures와 검색 키워드를 비교 후 점수 계산 → 느림.
-   개선: **Lucene Payload 활용** + 커스텀 쿼리 플러그인.

```json
{
  "woowa_payload_score": {
    "query": { "span_term": { "ctrScore": { "value": "검색키워드" } } },
    "score_mode": "max",
    "decode_type": "float",
    "include_span_score": false}
}
```

#### 3-3. Recommend Score

-   기존: 여러 필드 값 합산 및 수식 적용, 스크립트 연산.
-   개선: **색인 시점에 미리 계산** → 검색 시 field\_value\_factor로 반영.

```json
{
  "function_score": {
    "query": { "term": { "recommendScore.enable": { "value": true } } },
    "functions": [
      { "filter": { "match_all": {} },
        "field_value_factor": { "field": "recommendScore", "factor": 1, "missing": 0 } }
    ],
    "score_mode": "sum",
    "boost_mode": "replace"
  }
}
```

#### 3-4. 최종 구조

-   모든 Painless 스크립트 제거.
-   function\_score 내부에서 필터링 + 점수 연산을 **쿼리 단계에서 처리**.
-   aggregation 및 정렬 연산 최적화.

### 4\. 개선 결과

-   aggregation 수행 속도 2배 이상 향상.
-   p99.9, p99.99 응답 속도 20% 개선.
-   API 응답 0.7초 이상인 슬로우 쿼리 횟수 절반 감소.

### 5\. 핵심 포인트

-   Painless 스크립트는 실시간 연산 → 대량 데이터에서는 **성능 병목**.
-   점수 계산을 **사전 처리 / 쿼리 단계 분리 / Payload 활용**으로 이전 → 성능 대폭 향상.
-   function\_score 쿼리에도 필터 적용 필수 → match\_all로 인한 불필요 연산 방지.

### 1\. 현상

-   Painless 정렬 스크립트 제거 후 레이턴시 크게 개선됨.
-   데이터 노드 스펙을 절반 수준으로 낮추자 피크 시간대 CPU 사용률 85% → 안정성 문제.
-   일부 키워드 검색 시 슬로우 쿼리 존재 (예: 피자치즈).
-   검색 API, admin, batch에서 ES analyze API 호출 → 네트워크 비용 및 ES 부하 발생.
-   Segment merge 시 analyze 요청 reject 및 timeout 문제 발생.

### 2\. 문제 원인

-   **track\_scores: true**
    -   기존 Painless 스크립트에서 \_score 역산 시 필요.
    -   모든 문서 점수 계산 → CPU 부하 증가.
-   **term 기반 쿼리**
    -   match\_phrase 쿼리를 모든 검색어에 적용 → 단일 term도 불필요한 연산 발생.
-   **analyze API 의존**
    -   형태소 분석을 ES analyze API로 수행 → 다량 요청 시 reject/timeout 발생.

### 3\. 해결 방법

### **1\. track\_scores 옵션 변경**

```json
"track_scores": false

```

-   Painless 스크립트 제거 후 불필요한 점수 계산 제거.

**2\. 분석되는 term 개수에 따른 쿼리 분기**

```json
if (tokens.size() == 1) {
  return QueryBuilders.matchQuery(fieldName, keyword);
} else {
  return QueryBuilders.matchPhraseQuery(fieldName, keyword).slop(0);
}

```

-   단일 term → match 쿼리
-   다중 term → match\_phrase 쿼리, slop=0 유지

**3\. analyzer 라이브러리화**

-   ES plugin 형태의 형태소 분석기를 라이브러리화 후 Nexus 업로드.
-   검색 API, admin, batch에서 내부 라이브러리로 analyze 수행.
-   ES 분석기 설정과 동일하게 구현하여 \_analyzer API와 동작 일치.

### 4\. 개선 결과

구분 개선 전 개선 후

| track\_scores | true | false |
| --- | --- | --- |
| 검색 쿼리 | 모든 term → match\_phrase | term 개수 분기 적용 (match / match\_phrase) |
| analyze API | 외부 호출 | 내부 라이브러리 호출 |
| 레이턴시 | p99.9/p99.99 높음 | 2배 개선 |
| 슬로우 쿼리 | 존재 | 0.7초 이상 모두 제거 |
| ES 데이터노드 CPU | 피크 기준 20%~85% | 10~13% 감소 |
| analyze rejected/timeout | 발생 | 제거 |

### 5\. 핵심 포인트

-   **track\_scores: false** → 불필요한 \_score 계산 제거, CPU 효율 향상.
-   **term 기반 쿼리 분기** → 단일 term 불필요 연산 제거, 레이턴시 개선.
-   **analyzer 라이브러리화** → ES 부하/네트워크 호출 제거, 안정성 확보.
-   p99.9/p99.99 레이턴시 지표 개선, 슬로우 쿼리 제거, 데이터노드 안정성 확보.

| 1\. 카테고리 필터 | categoryId로 필터 시 레이턴시 지연 | integer 타입, term 쿼리 사용 | keyword 타입, categoryId.keyword로 term 쿼리 | API 응답 980ms → 104ms, 슬로우 쿼리 제거 |
| --- | --- | --- | --- | --- |
| 2\. 포켓몬 키워드 | 특정 키워드(function\_score) 부스팅 시 전체 문서 연산 | match\_all + function\_score | function\_score query filter에 기존 filter 포함 | 슬로우 쿼리 사라짐, 쿼리 가독성 향상 |
| 3\. Painless 스크립트 | aggregation top\_hits 정렬 시 스크립트 부하 | \_score 기반 Painless 스크립트 사용 | keywordMatchingScore, ctrScore, recommendScore를 쿼리 단계에서 미리 계산/반영 | aggregation 속도 2배 향상, p99.9/p99.99 응답 20% 개선 |
| 4\. track\_scores & term 최적화 | 스코어 계산, 일부 키워드에서 슬로우 쿼리 | track\_scores: true, match\_phrase 무조건 적용 | track\_scores: false, 단일 term → match, 다중 term → match\_phrase | API 레이턴시 2배 개선, 0.7초 이상 슬로우 쿼리 제거, CPU 10% 감소 |
| 5\. analyzer 라이브러리화 | analyze API 호출 → 네트워크 비용/ES 부하/timeout | ES analyze API 사용 | 분석기 라이브러리화, 내부 호출 | ES CPU 20% → 13%, analyze rejected/timeout 문제 제거 |