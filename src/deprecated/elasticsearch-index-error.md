---
title: "Elasticsearch 재설치 후 데이터 색인 실패 문제"
date: "2025-08-30"
desc: "Elasticsearch 재설치 후 데이터 색인 실패 문제가 발생하였다."
tags: ["#Elasticsearch", "#infra", "#Docker", "#Troubleshooting"]
thumbnail: "/ts.svg"
---

![elasticsearch-logo](/elasticsearch.png)


## 문제 원인

-   Docker를 삭제 후 D드라이브로 재설치 하였음.
-   따라서 기존 Elasticsearch, Kibana 컨테이너 삭제 후 재생성.
-   검색 결과가 안뜨는 문제 발생

```json
GET /boards/_search
{
  "query": {
    "match": {
      "title": "배드민턴"
    }
  }
}

// 결과
{
  "took": 3,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 6,
      "relation": "eq"
    },
    "max_score": 1.5323509,
    "hits": [
      {
        "_index": "boards",
        "_id": "1",
        "_score": 1.5323509,
        "_source": {
        	...
```

-   kibana에서 직접 쿼리를 실행했을 때 문서가 정상적으로 검색되고 있음. ---> Springboot 설정 문제 ?

-   원인 후보:
    1.  title, content, meetDetail 필드의 **Analyzer 설정과 검색 쿼리 mismatch**
    2.  **DTO 변환 과정에서 null 값 처리** 혹은 Lazy 로딩 문제
    3.  BoardDocument 매핑 필드 이름과 실제 Elasticsearch 인덱스 필드 이름 불일치
    4.  Elasticsearch 클라이언트 버전과 Spring Data Elasticsearch 버전 간 호환 문제

\---> 기존 인덱스와 문서를 삭제하고 새로 매핑/세팅을 적용해서 재색인

-   **매핑/Analyzer 초기화**: 기존 잘못된 analyzer나 필드 타입 문제를 한 번에 해결
-   **검색 쿼리 일치 보장**: DTO 필드와 Elasticsearch 필드 매칭 문제 최소화
-   **불필요한 데이터 제거**: 테스트용/잘못 색인된 데이터 제거
-   **테스트 용이**: Kibana와 Spring Boot에서 동일 쿼리로 테스트 가능

```json
1. DELETE /boards
2. PUT /boards
	{
  		"settings": {
    	"analysis": {
      	"filter": {
        	"edge_ngram_filter": {
          	"type": "edge_ngram",
          	"min_gram": 2,
          	"max_gram": 20
        	}
      	},
      	"analyzer": {
        "korean_edge_ngram_analyzer": {
        ....
```

```json
{
  "error": {
    "root_cause": [
      {
        "type": "illegal_argument_exception",
        "reason": "Custom Analyzer [korean_edge_ngram_analyzer] failed to find tokenizer under name [nori_tokenizer]"
      }
    ],
    "type": "illegal_argument_exception",
    "reason": "Custom Analyzer [korean_edge_ngram_analyzer] failed to find tokenizer under name [nori_tokenizer]"
  },
  "status": 400
}
```

**\---> nori\_tokenizer를 찾을 수 없어서 analyzer를 만들 수 없다**

-   기본 Elasticsearch에는 nori\_tokenizer가 없음
-   nori는 **Korean 분석기 플러그인**이 설치되어 있어야 사용 가능 (analysis-nori 플러그인).
-   Elasticsearch 재설치 했는데 분석기는 설치를 안함

## 해결 방법

```bash
docker exec -it es01 bin/elasticsearch-plugin install analysis-nori
docker restart es01
```

elastic search 컨테이너 중지 -> nori\_tokenizer 설치 -> elastic search 컨테이너 재시작

단, 이 방식은 컨테이너 재생성 시 유지되지 않는다.