---
title: "Springboot 순환참조 문제"
date: "2025-08-19"
desc: "springboot에서 순환 참조 오류가 발생하였다. "
tags: ["#Springboot", "#server", "#Troubleshooting"]
thumbnail: "/thumbnail.svg"
---

![springboot-logo](/springboot.png)

```Textplain
***************************
APPLICATION FAILED TO START
***************************

Description:

The dependencies of some of the beans in the application context form a cycle:

   loginController defined in file [C:\github\Dotree-BE\dotree\build\classes\java\main\com\project\dotree\app\controller\LoginController.class]
┌─────┐
|  securityConfig defined in file [C:\github\Dotree-BE\dotree\build\classes\java\main\com\project\dotree\global\config\SecurityConfig.class]
↑     ↓
|  customOAuth2SuccessHandler defined in file [C:\github\Dotree-BE\dotree\build\classes\java\main\com\project\dotree\app\oauth2\CustomOAuth2SuccessHandler.class]
└─────┘
```
 

프로젝트를 진행하던 중 순환 참조 문제가 발생했다.
순환 참조 문제에 대해서 알아보자.


**문제 원인**
loginController 
&emsp;↓ (PasswordEncoder 사용을 위해 SecurityConfig 주입)
securityConfig 
&emsp;↓ (CustomOAuth2SuccessHandler @Bean 등록)
customOAuth2SuccessHandler 
&emsp;↓ (SecurityConfig 내부에서 @Bean으로 정의됨)
securityConfig (다시 필요함 -> **순환 발생**)

 
**해결 방법**
- 소셜로그인만 사용할 것이기 때문에 loginController에서 PasswordEncoder 주입을 삭제했다.
- SecurityConfig 내부에서 customOAuth2SuccessHandler를 @Bean으로 등록하되, 서로 의존하지 않도록 구조를 변경했다.
- CustomOAuth2SuccessHandler에서는 TokenService, UserRepository, ObjectMapper 등을 직접 주입받아 사용하고, Config 설정 파일 자체에는 의존하지 않도록 수정하여 문제를 해결했다.
 

**Bean (빈)**
- 정의: 스프링이 관리하는 객체.
- 스프링 컨테이너가 생성, 초기화, 소멸까지 관리함.
- Bean으로 등록하면 다른 클래스에서 주입(DI, Dependency Injection) 받아 쓸 수 있음.
- @Component / @Service / @Repository / @Controller: 스프링이 자동으로 Bean으로 등록
 

**정상적인 Bean 생성 & 생성자 주입**
```Textplain
[LoginService]  <-- 생성자 주입
      │
      ▼
[PasswordEncoder Bean]  (스프링이 관리)
```
- PasswordEncoder는 스프링 Bean으로 관리됨
- LoginService 생성 시, 스프링이 자동으로 Bean을 생성자에 넣어줌
 
**순환 참조 발생 예시**
```Textplain
[A Bean]  <-- 생성자 주입
   │
   ▼
[B Bean]  <-- 생성자 주입
   │
   ▼
[A Bean]  (다시 필요)  <-- 무한 루프
``` 

 

A를 만들려면 B가 필요
B를 만들려면 A가 필요
스프링이 어디서부터 만들지 몰라서 에러 발생 → 순환참조 발생 