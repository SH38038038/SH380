import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-gray-800">
      
      {/* 1. Header Section */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">홍서현</h1>
        <p className="text-xl text-gray-600 mb-8 font-medium">
          Server Engineer | Data Pipeline & Kubernetes Infrastructure
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-600">
          <Link href="mailto:sh38038038@gmail.com" className="hover:text-[#FFACED] transition-colors">
            Email
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="https://github.com/SH38038038" target="_blank" className="hover:text-[#FFACED] transition-colors">
            GitHub
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="https://linkedin.com/in/sh38038038" target="_blank" className="hover:text-[#FFACED] transition-colors">
            LinkedIn
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="https://xyz987164.tistory.com" target="_blank" className="hover:text-[#FFACED] transition-colors">
            Tech Blog
          </Link>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">Introduction</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Python과 Java를 활용하여 대용량 데이터를 안정적으로 처리하는 분산 시스템 설계 및 최적화에 강점이 있는 백엔드 엔지니어입니다.
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
      </section>

      {/* 4. Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">Projects</h2>
        
        {/* Dev-Helper (New from PDF) */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-bold">Dev-Helper</h3>
            <span className="text-gray-500 text-sm">2025.12</span>
          </div>
          <p className="text-gray-600 mb-4">Kubernetes 기반 고가용성(HA) 아키텍처 및 AI 챗봇 인프라 구축 (Team Infra Lead)</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li><strong>Data Pipeline Automation:</strong> Kubernetes CronJob으로 크롤링 작업 스케줄링 및 PVC를 통한 데이터 영속성 보장</li>
            <li><strong>Auto-Scaling (HPA):</strong> CPU 부하에 따라 Pod를 동적으로 확장(Scale-out)하여 트래픽 급증 시 응답 지연 최소화</li>
            <li><strong>Zero-Downtime Deployment:</strong> Rolling Update 전략 채택 및 Readiness/Liveness Probe로 상태 모니터링</li>
            <li><strong>LLM Integration:</strong> OpenAI API 프롬프트 엔지니어링을 백엔드 로직에 통합하여 맞춤형 문서 자동 생성</li>
          </ul>
        </div>

        {/* News-Archive (New from PDF) */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-bold">News-Archive</h3>
            <span className="text-gray-500 text-sm">2025.08 — 2025.09</span>
          </div>
          <p className="text-gray-600 mb-4">MSA 기반 실시간 뉴스 데이터 수집 및 고성능 검색 파이프라인 (Personal Project)</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li><strong>Event-Driven Architecture (EDA):</strong> Kafka를 도입하여 수집(Producer)과 색인(Consumer) 로직 분리 및 내결함성 확보</li>
            <li><strong>Async Non-blocking I/O:</strong> Spring WebFlux와 Elasticsearch Async Client로 동시 요청 처리량 극대화</li>
            <li><strong>Operational Automation:</strong> ILM(Index Lifecycle Management) 정책 적용으로 스토리지 효율성 증대</li>
            <li><strong>IaC:</strong> Docker Compose로 Kafka Cluster, Zookeeper, ELK Stack 등 인프라 코드로 정의</li>
          </ul>
        </div>

        {/* Moyora */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-bold">Moyora</h3>
            <span className="text-gray-500 text-sm">2025.03 — 2025.08</span>
          </div>
          <p className="text-gray-600 mb-4">관심사 기반 로컬 커뮤니티 플랫폼 (PM & Backend 1인 개발)</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li><strong>Authentication:</strong> Spring Security OAuth2 (카카오), JWT, OCR 학생증 인증</li>
            <li><strong>Search & Performance:</strong> Elasticsearch(형태소 분석, N-gram) 검색 엔진 도입, Redis 캐싱으로 조회 성능 최적화</li>
            <li><strong>Features:</strong> Gemini API 태그 추출/추천, SSE 실시간 알림(채팅, 신청), 별점 시스템</li>
            <li><strong>Infra:</strong> Docker & GCP Cloud Run 배포</li>
          </ul>
        </div>

        {/* ICEY */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-bold">ICEY</h3>
            <span className="text-gray-500 text-sm">2025.04 — 2025.07</span>
          </div>
          <p className="text-gray-600 mb-4">인터랙티브 팀 협업 & 아이스브레이킹 플랫폼 (Backend Lead)</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li>카카오/구글 소셜 로그인 및 사용자 관리</li>
            <li>Gemini API 연동: 밸런스 게임 및 스몰톡 질문 자동 생성</li>
            <li>SSE(Server-Sent Events) 기반 실시간 알림 시스템</li>
            <li>GCP CI/CD 파이프라인 구축</li>
          </ul>
        </div>

        {/* Recloset */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
            <h3 className="text-xl font-bold">Recloset</h3>
            <span className="text-gray-500 text-sm">2025.03 — 2025.06</span>
          </div>
          <p className="text-gray-600 mb-4">AI 기반 의류 기부 연결 플랫폼 (Backend Dev & Planning Lead)</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            <li>구글 소셜 로그인 및 RBAC 기반 권한 관리</li>
            <li>Docker & GCP 기반 백엔드 인프라 구축</li>
            <li>기부 활동 연동 리워드 시스템 설계 및 구현</li>
          </ul>
        </div>
      </section>

      {/* 5. Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-gray-100 pb-2 mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">Languages & Frontend</h4>
            <p className="text-gray-700">Java, Python, JavaScript (ES6+), SQL</p>
            <p className="text-gray-600 text-sm mt-1">React, HTML5/CSS3, Styled-Components</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">Backend Frameworks</h4>
            <p className="text-gray-700">Spring Boot, JPA, FastAPI, Node.js</p>
            <p className="text-gray-600 text-sm mt-1">Spring Security (JWT, OAuth2), TDD</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">Data & Infrastructure</h4>
            <p className="text-gray-700">Elasticsearch, Kafka, Redis, MySQL, MongoDB</p>
            <p className="text-gray-600 text-sm mt-1">Kubernetes, Docker, GCP, AWS</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lg text-gray-800">Tools & AI</h4>
            <p className="text-gray-700">Git, Github Actions, Swagger</p>
            <p className="text-gray-600 text-sm mt-1">Prompt Engineering (Gemini API, OpenAI)</p>
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
            <div className="text-sm text-gray-500">숙명여대 IT 동아리 SOLUX • 2025.03 - Present</div>
            <p className="mt-1">프로젝트 &#39;ICEY&#39; (인터랙티브 협업 플랫폼)</p>
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