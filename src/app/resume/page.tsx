import Link from "next/link";
import ZoomableImage from "../../components/ZoomableImage";

export default function ResumePage() {
  return (
    // ✨ 변경점: break-keep 추가 (한글 단어 단위 줄바꿈 보장)
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-gray-800 break-keep">
      
      {/* 1. Header Section */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">홍서현</h1>
        <p className="text-xl text-gray-600 mb-8 font-medium">
          Server Engineer | Data Pipeline & Kubernetes Infrastructure
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-600">
          <Link href="https://github.com/SH38038038" target="_blank" className="hover:text-[#FFACED] transition-colors">
            GitHub
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="https://linkedin.com/in/sh38038038" target="_blank" className="hover:text-[#FFACED] transition-colors">
            LinkedIn
          </Link>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">Introduction</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Java와 Python을 활용하여 대용량 데이터를 안정적으로 처리하는 분산 시스템 설계 및 최적화에 강점이 있는 백엔드 엔지니어입니다.
            확장 가능한 아키텍처와 시스템 최적화에 몰입하며, 끊임없는 학습을 통해 서비스의 안정성을 높이는 것을 목표로 합니다.
          </p>
          <ul className="list-disc list-inside ml-2 space-y-1 text-gray-600">
            <li><strong>Data Engineering:</strong> Kafka와 Elasticsearch 기반의 Event-Driven Architecture 및 비동기 데이터 처리 파이프라인 구축</li>
            <li><strong>Cloud Infrastructure:</strong> Kubernetes (HPA, CronJob) 및 Docker 환경에서의 고가용성(HA) MSA 운영 및 리소스 최적화</li>
            <li><strong>Intelligent Backend:</strong> Spring Boot 기반의 견고한 RESTful API 설계 및 LLM(OpenAI, Gemini) 모델 서비스 통합</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            숙명여자대학교 컴퓨터과학전공 졸업 예정 (2026.08) | GPA: 3.86/4.5
          </p>
        </div>
      </section>

      {/* 3. Experience */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">Experience</h2>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-bold">GDGoC Sookmyung (SMWU Google Developer Groups)</h3>
            <span className="text-gray-500 text-sm">2024.09 — 2025.06</span>
          </div>
          <p className="text-gray-600 mb-4">5기 멤버 / 백엔드 개발</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><span className="font-semibold">채식탁(Chaesiktak):</span> Spring Security, JWT, 외부 AI(LLM) 연동 서버 개발</li>
            <li><span className="font-semibold">ReCloset:</span> 지속 가능한 의류 기부 플랫폼 백엔드 개발 (GDG Solution Challenge 2025)</li>
            <li><span className="font-semibold">Study & Seminar:</span> Flutter 크로스 플랫폼 스터디, &#34;Spring Boot 구글 소셜 로그인 구현&#34; 기술 세미나 발표</li>
          </ul>
        </div>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-bold">SOLUX (Sookmyung Programming Club)</h3>
            <span className="text-gray-500 text-sm">2025.03 — 2026.02</span>
          </div>
          <p className="text-gray-600 mb-4">30기 멤버 / 백엔드 개발</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><span className="font-semibold">ICEY:</span> SSE 실시간 알림, gemini api 이용한 컨텐츠 생성, GCP, springboot</li>
            <li><span className="font-semibold">연등, 연대의 등불 :</span> ELK 기반 검색엔진, redis cache, docker-compose, EC2, nodejs</li>
          </ul>
        </div>
      </section>
      
      {/* 4. Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">Projects</h2>

        {/* Dev-Helper */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-2">Dev-Helper (Kubernetes 기반 HA 인프라)</h3>
          <p className="text-gray-600 mb-3">개발자 맞춤형 AI 도우미 서비스 (Backend Lead)</p>
           {/* 아키텍처 다이어그램 */}
            <div className="mb-6 flex justify-center">
              <ZoomableImage
                src="/dev-helper-archi.png"
                alt="Dev-Helper Kubernetes Architecture"
                className="rounded-lg shadow-md border border-gray-200 max-w-full"
              />
            </div>
          {/* 설계 요약 */}
            <p className="text-sm text-gray-600 text-center mb-2">
              Kubernetes 기반 확장형 아키텍처로 API 오토스케일링, 자동 복구, 캐싱 전략을 통해
              안정성과 성능을 개선했습니다.
            </p>

            {/* 성능/성과 요약 */}
            <p className="text-sm text-gray-600 text-center mb-6">
              k6 부하 테스트 기준 RPS 200 → 500 구간에서도 안정 처리하며 p95 latency를
              1.8s → 600ms로 개선했습니다.
            </p>

            {/* 핵심 기여도 */}
            <div className="mb-4 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                인프라 설계 주도
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                Kubernetes 배포 전략
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                캐싱 구조 도입
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200">
                성능 테스트 및 튜닝
              </span>
            </div>
            {/* 운영/인프라 증빙 스크린샷 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[{
                  src: "/dev-helper-archi2.png",
                  title: "Dev-Helper Architecture Diagram",
                  desc: "더 자세한 아키텍처 구성도",
                },
                {
                  src: "/dev-helper-main.png",
                  title: "Dev-Helper Main UI",
                  desc: "서비스 동작 화면 (사용자 관점)",
                },
                {
                  src: "/dev-helper-back.png",
                  title: "Cluster Resources",
                  desc: "전체 리소스 상태 (pods / svc / deploy / hpa / cronjob)",
                },
                {
                  src: "/dev-helper-hpa.png",
                  title: "HPA Auto-Scaling",
                  desc: "부하 증가 시 replicas 자동 확장 동작",
                },
                {
                  src: "/dev-helper-cronjob.png",
                  title: "CronJob Automation",
                  desc: "주기 실행 및 Job Completed 흐름 확인",
                },
                {
                  src: "/dev-helper-nodeport.png",
                  title: "NodePort Routing",
                  desc: "외부 노출(front/api)과 내부망(db) 분리",
                },
                {
                  src: "/dev-helper-db.png",
                  title: "DB / Cache Isolation",
                  desc: "news-db 네임스페이스 내부 격리 (ClusterIP)",
                },
                {
                  src: "/dev-helper-env1.png",
                  title: "ConfigMap / Env (1)",
                  desc: "MYSQL/REDIS 등 환경 설정 분리",
                },
                {
                  src: "/dev-helper-env2.png",
                  title: "Secret / Env (2)",
                  desc: "DB password / API key 등 민감정보 보호",
                },
              ].map((item) => (
  <div
    key={item.src} // 또는 item.title
    className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
  >

  <div className="px-4 py-3 border-b border-gray-100">
    <p className="font-semibold text-gray-900">{item.title}</p>
    <p className="text-sm text-gray-600">{item.desc}</p>
  </div>

  {/* ✅ padding은 유지하되, 이미지가 자연 높이로 */}
  <div className="p-4">
    <ZoomableImage
      src={item.src}
      alt={item.title}
      className="block w-full h-auto rounded-xl border border-gray-100 shadow-sm"
    />
  </div>
</div>

              ))}
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
              <li>
                <strong>Data Pipeline Automation:</strong> Kubernetes CronJob 기반 크롤링 스케줄링과
                PVC 영속성 구성으로 작업 실패 시 수동 재실행 없이 자동 복구 가능하도록 개선
              </li>
              <li>
                <strong>Auto-Scaling (HPA):</strong> k6 부하 테스트 환경에서 RPS 200 → 500 구간에서도
                안정 처리, p95 latency 약 1.8s → 600ms 수준으로 개선
              </li>
              <li>
                <strong>Zero-Downtime Deployment:</strong> Rolling Update + Readiness/Liveness Probe
                적용으로 배포 중 요청 실패 없이 무중단 배포 환경 구성
              </li>
              <li>
                <strong>Resource Optimization:</strong> Pod 요청/제한값 조정으로 메모리 사용량 약 30%
                절감 및 불필요한 리소스 낭비 최소화
              </li>
              <li>
                <strong>LLM Integration:</strong> OpenAI API 응답 캐싱 적용으로 반복 요청 시 응답 속도 약
                30~40% 개선
              </li>
            </ul>

            {/* Tech Stack */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-800 mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Kubernetes",
                  "Docker",
                  "Redis",
                  "MySQL",
                  "OpenAI API",
                  "k6",
                  "CI/CD",
                  "python",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs bg-white text-gray-700 border border-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>



        {/* 연등 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-2">
            연등 : 연대의 등불 (검색 엔진 구축 · 캐싱 최적화 · HTTPS 배포)
          </h3>

          <p className="text-gray-600 mb-4">
            흩어진 연대 활동을 한 곳에 모은 플랫폼 (Backend Lead · Search Owner)
          </p>
          <div className="mt-2 mb-4">
          <Link href="https://yeondeung-b449c.web.app/" target="_blank" className="hover:text-[#FFACED] transition-colors">
            프로젝트 바로가기: 흩어진 연대를 잇다, 연등
          </Link>
        </div>


          {/* 아키텍처 다이어그램 */}
          <div className="mb-3 flex justify-center">
            <ZoomableImage
              src="/yeondeung-archi.png"
              alt="Yeondeung Search Architecture"
              className="rounded-xl shadow-md border border-gray-200 max-w-full"
            />
          </div>

          {/* 한 줄 요약 */}
          <p className="text-sm text-gray-600 text-center mb-2">
            Elasticsearch 기반 검색/자동완성/정렬 시스템을 설계하고,
            Redis 캐싱과 Docker Compose 기반 배포, HTTPS 보안 구성까지
            전체 검색 인프라를 담당했습니다.
          </p>

          {/* 핵심 역할 태그 */}
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {[
              "검색 인덱스 설계",
              "쿼리/정렬 로직 구현",
              "KST 시간대 보정",
              "MySQL 데이터 보강",
              "자동완성 설계",
              "Redis 캐싱",
              "Docker Compose 배포",
              "HTTPS 보안 구성",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* 증빙 스크린샷 그리드 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-6">
    {[
      {
        src: "/yeondeung-archi2.png",
        title: "Yeondeung Architecture Diagram",
        desc: "Elasticsearch 기반 검색/정렬 + Redis 캐싱 + Docker Compose 배포 + HTTPS(Reverse Proxy)",
      },{
        src: "/yeondeung-query.png",
        title: "Query Optimization",
        desc: "필터/검색 조건에서도 안정적인 성능을 위한 쿼리 최적화",
      },
      {
        src: "/yeondeung-sort.png",
        title: "Stable Sorting (KST/UTC)",
        desc: "D-day & 임박 노출 정렬 오류를 KST 보정으로 안정화",
      },
      {
        src: "/yeondeung-redis.png",
        title: "Redis Caching",
        desc: "반복 요청 캐싱으로 ES/DB 부하 감소 및 응답 속도 개선",
      },
      {
        src: "/yeondeung-es.png",
        title: "Elasticsearch Search",
        desc: "가중치 검색(multi_match) + 필터 조합 검색 구조",
      },
      {
        src: "/yeondeung-es1.png",
        title: "Elasticsearch Details",
        desc: "분석기/매핑/서제스터 등 검색 품질 개선 구성",
      },
      {
        src: "/yeondeung-ai.png",
        title: "AI Verification",
        desc: "게시글 링크/내용 기반 자동 검증(도메인 검증 포함)",
      },
      {
        src: "/yeondeung-docker.png",
        title: "Docker Compose Ops Proof",
        desc: "컨테이너 구성(App/Redis/MySQL/Elasticsearch) + 네트워크 격리",
      },
    ].map((item) => (
      <div
        key={item.src}
        className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="font-semibold text-gray-900">{item.title}</p>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
        <div className="p-4">
          <ZoomableImage src={item.src} alt={item.title} />
        </div>
      </div>
    ))}
  </div>


          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li>
              <strong>Search Engine Design:</strong> <code>multi_match</code> 기반 가중치 검색과
              다중 필터링을 적용해 의제/지역/참여유형 조건에서도 정확한 결과 제공
            </li>

            <li>
              <strong>Stable Sorting (KST):</strong> ES(UTC) ↔ 서비스(KST) 시간 차이로 발생하던
              D-Day 및 정렬 오류를 Epoch Shifting 방식으로 보정해
              마감 임박 게시글 우선 노출 구조 안정화
            </li>

            <li>
              <strong>MySQL Enrichment:</strong> 검색 결과를 기준으로 응원 수, 의제, 이미지,
              작성자 유형을 MySQL에서 보강해 Join 비용 없이 UI 카드 데이터 구성
            </li>

            <li>
              <strong>Auto-complete:</strong> Completion Suggester + Fuzzy 검색으로
              추천 검색어 정확도 및 입력 UX 개선
            </li>

            <li>
              <strong>Caching Strategy:</strong> Redis 캐싱 도입으로 반복 요청 시
              ES/DB 접근 빈도 감소 및 응답 속도 개선
            </li>

            <li>
              <strong>Deployment Automation:</strong> Docker Compose 기반 배포 환경 구성으로
              서비스, DB, Redis, Elasticsearch를 일관된 환경에서 운영 (AWS EC2)
            </li>

            <li>
              <strong>HTTPS Security:</strong> Nginx Reverse Proxy + Certbot 적용으로
              SSL 인증서 자동 갱신 및 HTTPS 통신 환경 구축
            </li>
            <li>
              <strong>etc:</strong> 프론트엔드 배포 백업, 쿼리 최적화를 통한 부하 대응, 백엔드 팀원 온보딩
            </li>
          </ul>

          {/* Tech Stack */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-800 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Node.js",
                "Elasticsearch",
                "MySQL",
                "Redis",
                "Docker Compose",
                "Nginx",
                "Certbot",
                "Nori Analyzer",
              ].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs bg-white text-gray-700 border border-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* News-Archive */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-2">
              News-Archive (Kafka 기반 실시간 뉴스 데이터 파이프라인)
            </h3>

            <p className="text-gray-600 mb-4">
              대용량 뉴스 아카이브 검색 서비스 (Solo Project · Data Pipeline & Search Owner)
            </p>

            {/* (선택) 아키텍처 다이어그램 이미지 */}
            <div className="mb-3 flex justify-center">
              <ZoomableImage
                src="/news-archive-archi.png"
                alt="News-Archive Architecture"
                className="rounded-xl shadow-md border border-gray-200 max-w-full"
              />
            </div>

            {/* 한 줄 요약 */}
            <p className="text-sm text-gray-600 text-center mb-2">
              RSS 수집부터 Kafka 기반 파이프라인, Logstash 가공/인덱싱, WebFlux 비동기 검색 API까지
              End-to-End로 설계·구현했습니다.
            </p>

            {/* 핵심 역할 태그 */}
            <div className="mb-4 flex flex-wrap gap-2 justify-center">
              {[
                "Kafka 기반 EDA 설계",
                "Logstash 인덱싱 파이프라인",
                "WebFlux 비동기 검색 API",
                "ES 한국어 검색 품질 개선",
                "Index Template 운영",
                "ILM 기반 인덱스 관리",
                "Docker Compose IaC",
              ].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
              <li>
                <strong>Event-Driven Pipeline:</strong> RSS 크롤러(Producer)와 인덱서(Consumer)를 Kafka로
                분리해 데이터 유실 없이 복구 가능한 파이프라인을 구축
              </li>
              <li>
                <strong>Search API (Async):</strong> Spring WebFlux + Elasticsearch Async Client로
                논블로킹 I/O 검색 API를 구현해 동시 요청 환경에서 처리 효율을 개선
              </li>
              <li>
                <strong>Indexing Automation:</strong> Logstash가 Kafka 토픽을 구독해 데이터 정규화/가공 후
                Elasticsearch에 자동 인덱싱되도록 구성
              </li>
              <li>
                <strong>Korean Search Quality:</strong> Index Template로 nori 분석기 자동 적용,
                ngram 부분일치 + fuzziness 오타 보정으로 검색 UX 개선
              </li>
              <li>
                <strong>Operational Automation:</strong> ILM 정책으로 오래된 인덱스를 자동 정리해
                스토리지 운영 부담을 줄이고 장기 운영 가능 구조 확보
              </li>
              <li>
                <strong>IaC (Local Ops):</strong> docker-compose.yml 하나로 Kafka/ZooKeeper/ES/Kibana/Logstash/Crawler/API
                전체 스택을 재현 가능하게 구성
              </li>
            </ul>

            {/* Tech Stack */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-800 mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Java 17",
                  "Spring Boot 3",
                  "Spring WebFlux",
                  "Python 3",
                  "Kafka",
                  "Logstash",
                  "Elasticsearch",
                  "Kibana",
                  "Docker Compose",
                  "MongoDB(선택)",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs bg-white text-gray-700 border border-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>


        {/* Moyora */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-2">
            Moyora (지역 기반 소모임 플랫폼 · 검색/실시간 시스템 개선)
          </h3>

          <p className="text-gray-600 mb-4">
            거주 지역 기반 소모임 찾기 서비스 (Solo Backend Developer)
          </p>

          {/* (선택) 아키텍처 이미지 */}
          <div className="mb-3 flex justify-center">
            <ZoomableImage
              src="/moyora-archi.png"
              alt="Moyora Backend Architecture"
              className="rounded-xl shadow-md border border-gray-200 max-w-full"
            />
          </div>

          {/* 한 줄 요약 */}
          <p className="text-sm text-gray-600 text-center mb-2">
            Spring Boot 기반 REST API 설계부터 인증/검색/실시간 알림/SSE 구조,
            Elasticsearch 검색 고도화까지 백엔드 전반을 담당했습니다.
          </p>

          {/* 핵심 역할 태그 */}
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {[
              "Spring Boot REST 설계",
              "OAuth2 + JWT 인증",
              "Elasticsearch 검색 개선",
              "Redis 캐싱",
              "SSE 실시간 알림",
              "Gemini AI 태그 추출",
              "Docker + Cloud Run 배포",
              "CI/CD 자동화",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200"
              >
                {t}
              </span>
            ))}
          </div>

          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li>
              <strong>Backend Architecture:</strong> Spring Boot 기반 RESTful API 설계 및
              게시판/모임/공지/댓글/채팅 기능 전반 구현
            </li>

            <li>
              <strong>Authentication:</strong> 카카오 OAuth2 로그인 + JWT 기반 인증/인가 구조를
              설계하여 세션 의존성을 제거하고 확장 가능한 인증 구조 구현
            </li>

            <li>
              <strong>Search Engine Upgrade:</strong> 기존 SQL 검색을 Elasticsearch로 전환하고
              형태소 분석, ngram, fuzziness 적용으로 검색 정확도 및 응답 속도 개선
            </li>

            <li>
              <strong>Realtime Notification:</strong> SSE 기반 실시간 알림 구조를 설계해
              모임 신청/승인/댓글/채팅 이벤트를 즉시 전달
            </li>

            <li>
              <strong>Caching Strategy:</strong> Redis 캐싱을 적용해 인기 태그 조회 및 반복 요청 시
              DB 부하 감소
            </li>

            <li>
              <strong>AI Integration:</strong> Gemini API를 활용해 게시글 자동 태그 추출 기능을 구현하여
              추천 및 검색 품질 향상
            </li>

            <li>
              <strong>Deployment:</strong> Docker 기반 환경 구성 후 GCP Cloud Run 배포 및
              CI/CD 자동화로 배포 안정성 확보
            </li>
          </ul>

          {/* Tech Stack */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-800 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Java 21",
                "Spring Boot 3",
                "Spring Security",
                "JPA",
                "MySQL",
                "Redis",
                "Elasticsearch",
                "Docker",
                "GCP",
                "OAuth2",
                "JWT",
                "Gemini API",
                "SSE",
              ].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs bg-white text-gray-700 border border-gray-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>


        {/* ICEY */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-2">ICEY</h3>
          <p className="text-gray-600 mb-3">인터랙티브 팀 협업 & 아이스브레이킹 플랫폼 (Backend Lead)</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li>카카오/구글 소셜 로그인 및 사용자 관리 기능 구현</li>
            <li>Gemini API 연동으로 밸런스 게임 및 질문 자동 생성 기능 개발</li>
            <li>SSE(Server-Sent Events) 기반 실시간 알림 시스템 설계</li>
            <li>GCP 기반 CI/CD 파이프라인 구성</li>
          </ul>
        </div>

        {/* Recloset */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-2">Recloset</h3>
          <p className="text-gray-600 mb-3">지속 가능한 의류 기부 플랫폼 (Solo Backend Developer)</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li>
              Spring Boot 기반 RESTful API 설계 및 사용자/관리자 권한 구조 구현
            </li>
            <li>
              RBAC 기반 권한 관리 적용으로 관리자 기능과 일반 사용자 기능 분리
            </li>
          </ul>
        </div>
      </section>


      {/* 5. Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Languages */}
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">
              Languages
            </h4>
            <p className="text-gray-700">
              Java, Python, JavaScript (ES6+), SQL
            </p>
          </div>

          {/* Backend */}
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">
              Backend Development
            </h4>
            <p className="text-gray-700">
              Spring Boot, Spring WebFlux, JPA, Node.js, FastAPI
            </p>
            <p className="text-gray-600 text-sm mt-1">
              REST API 설계, 비동기 처리, SSE, 인증/인가 구조 설계
            </p>
          </div>

          {/* Search & Data */}
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">
              Search & Data Engineering
            </h4>
            <p className="text-gray-700">
              Elasticsearch, Kafka, Logstash, Redis, MySQL
            </p>
            <p className="text-gray-600 text-sm mt-1">
              검색 인덱스 설계, nori 분석기, 자동완성, 캐싱 전략
            </p>
          </div>

          {/* Infrastructure */}
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">
              Infrastructure & DevOps
            </h4>
            <p className="text-gray-700">
              Docker, Docker Compose, Kubernetes, GCP, AWS
            </p>
            <p className="text-gray-600 text-sm mt-1">
              CI/CD, HTTPS 구성, Reverse Proxy, 오토스케일링
            </p>
          </div>

          {/* Security */}
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">
              Security & Authentication
            </h4>
            <p className="text-gray-700">
              Spring Security, OAuth2, JWT, HTTPS, Certbot
            </p>
          </div>

          {/* AI & Automation */}
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">
              AI & Automation
            </h4>
            <p className="text-gray-700">
              OpenAI API, Gemini API, Prompt Engineering
            </p>
            <p className="text-gray-600 text-sm mt-1">
              응답 캐싱, 태그 추출 자동화
            </p>
          </div>

        </div>
      </section>


      {/* 6. Recognition */}
      <section>
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">Recognition</h2>
        <ul className="space-y-4 text-gray-700">
          <li>
            <div className="font-bold">APAC Solution Challenge 2025</div>
            <div className="text-sm text-gray-500">Google Developer Groups (GDG) • 2025.02</div>
            <p className="mt-1">AI를 활용한 사회 문제 해결 프로젝트(Recloset)로 참가</p>
          </li>
          <li>
            <div className="font-bold">SOLUX 제30회 1학기 프로젝트 대상 (Grand Prize)</div>
            <div className="text-sm text-gray-500">숙명여대 IT 동아리 SOLUX • 2025.03 - 2026.01</div>
            <p className="mt-1">프로젝트 &#39;ICEY&#39; (인터랙티브 협업 플랫폼)</p>
          </li>
          <li>
            <div className="font-bold">SOLUX 제30회 2학기 프로젝트 최우수상 (Runner-up)</div>
            <div className="text-sm text-gray-500">숙명여대 IT 동아리 SOLUX • 2025.09 - 2026.01</div>
            <p className="mt-1">프로젝트 &#39;연등 : 연대의 등불&#39; (흩어진 연대 활동을 한 곳에 모은 플랫폼)</p>
          </li>
          <li>
            <div className="font-bold">SQL 개발자 (SQLD)</div>
            <div className="text-sm text-gray-500">한국데이터산업진흥원 (K-DATA) • 2023.10</div>
          </li>
        </ul>
      </section>

    </main>
  );
}