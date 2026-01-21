---
title: "Spring Boot로 실시간 채팅 구현하기 (WebSocket + STOMP)"
date: "2025-09-01"
desc: "springboot환경에서 WebSocket을 이용한 실시간 채팅방을 만들어보자"
tags: ["#Springboot", "#server", "#WebSocket", "STOMP"]
thumbnail: "/thumbnail.svg"
---


단체 채팅 기능을 구현하기 위해 WebSocket과 STOMP 프로토콜을 기반으로 실시간 채팅 시스템을 구축했습니다.

Spring Boot를 기반으로 사용자 인증(JWT), 채팅방 참여자 검증, 메시지 저장 및 전송 기능을 통합한 구조입니다.

# WebSocket & STOMP 

단체 채팅 기능은 단순한 HTTP 요청/응답 구조로는 구현이 어렵다. 채팅은 "양방향 실시간 통신"이 필요하기 때문이다. 이 문제를 해결하기 위해 사용한 기술이 **WebSocket + STOMP**이다.

## WebSocket이란?

WebSocket은 HTTP와 달리 연결을 끊지 않고 지속적으로 데이터를 주고받을 수 있는 양방향 통신 프로토콜이다.

-   클라이언트가 WebSocket 서버에 연결을 맺으면, 양쪽 모두 자유롭게 메시지를 주고받을 수 있다.
-   HTTP보다 오버헤드가 적고, 실시간 데이터 처리에 적합하다.
-   기본적으로 ws:// 또는 wss:// 프로토콜을 사용한다.

**기본 흐름**

```textplain
1. 클라이언트 → 서버: WebSocket 연결 요청
2. 서버 → 클라이언트: 연결 수락 (Handshake)
3. 이후 실시간으로 메시지 송수신

```

## STOMP란?

STOMP는 WebSocket 위에서 동작하는 메시징 프로토콜로, 메시지의 목적지(주소)를 명확히 정의해주는 역할을 한다.

WebSocket이 TCP 소켓이라면, STOMP는 그 위에서 동작하는 HTTP 같은 역할이다.

**STOMP의 주요 개념**

-   **SEND**: 서버에 메시지를 보낼 때 사용 (@MessageMapping)
-   **SUBSCRIBE**: 서버의 특정 주제(topic)를 구독하여 메시지 수신
-   **MESSAGE**: 구독 중인 클라이언트에게 전달되는 메시지
-   **CONNECT / DISCONNECT**: 연결 및 종료

## 실시간 채팅의 동작 원리

1.  클라이언트는 /ws-chat 엔드포인트를 통해 WebSocket 연결을 맺는다.
2.  연결 시 JWT를 헤더에 담아 사용자 인증을 수행한다.
3.  연결된 사용자는 특정 채팅방(roomId)을 구독한다. → /topic/chatroom/{id}
4.  채팅 입력 시 메시지를 /app/chat.send 경로로 전송한다.
5.  서버는 메시지를 DB에 저장 후, 구독 중인 사용자에게 실시간으로 메시지를 전송한다.

## 채팅 요청/응답 형식

**클라이언트 → 서버 (SEND)**

-   발행 주소: /app/chat.send

```json
{
  "roomId": 1,
  "content": "안녕하세요!"
}

```

**서버 → 클라이언트 (SUBSCRIBE)**

-   구독 주소: /topic/chatroom/1

```json
{
  "roomId": 1,
  "sender": "홍길동",
  "content": "안녕하세요!"
}

```

## SockJS란?

SockJS는 WebSocket을 지원하지 않는 브라우저에서도 동작하도록 도와주는 호환성 레이어이다.

-   WebSocket > XHR > Long Polling 순으로 자동 대체된다.
-   Spring에서는 .withSockJS() 설정만으로 적용 가능하다.

## 전체 구조

### 사용 기술

-   WebSocket + STOMP (Spring WebSocket)
-   JWT 인증 기반 사용자 연결
-   채팅방 권한 검증
-   DB에 메시지 저장 (JPA)
-   채팅방-사용자 관계 관리

## WebSocket 기본 설정

```java
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebSocketInterceptor webSocketInterceptor;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");  
        registry.setApplicationDestinationPrefixes("/app"); 
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chat")
                .setAllowedOriginPatterns("*")
                .withSockJS(); 
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(webSocketInterceptor);
    }
}
```

-   클라이언트는 /app/chat.send로 메시지를 전송한다.
-   서버는 /topic/chatroom/{roomId}로 메시지를 전달한다.

## WebSocket 연결 시 사용자 인증 (JWT)

WebSocket은 기본적으로 HTTP처럼 필터 체인을 타지 않기 때문에, 직접 Interceptor에서 인증 정보를 파싱하고 Principal에 주입해야 한다.

```java
@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketInterceptor implements ChannelInterceptor {

    private final TokenService tokenService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String token = accessor.getFirstNativeHeader("Authorization");

            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
                User user = tokenService.getUserFromToken(token);
                log.info("✅ WebSocket 연결 요청: {}", user.getEmail());

                accessor.setUser(new StompPrincipal(user.getEmail())); 
            }
        }
        return message;
    }
}
```

## 채팅 메세지 처리 흐름

```java
@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final ChatParticipantRepository chatParticipantRepository;

    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessageDto messageDto, Principal principal) {
        if (principal == null) {
            throw new CustomException(ErrorCode.UNAUTHORIZED_EXCEPTION, "인증되지 않은 사용자이다.");
        }

        String email = principal.getName();
        User sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER_EXCEPTION, "유저를 찾을 수 없다."));

        ChatRoom room = chatRoomRepository.findById(messageDto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않는다."));

        boolean isParticipant = chatParticipantRepository.existsByChatRoomIdAndUserId(room.getId(), sender.getId());
        if (!isParticipant) {
            throw new CustomException(ErrorCode.ACCESS_DENIED_EXCEPTION, "채팅방 참여자가 아니다.");
        }

        ChatMessage msg = new ChatMessage();
        msg.setChatRoom(room);
        msg.setContent(messageDto.getContent());
        msg.setSender(sender.getName());
        msg.setSentAt(LocalDateTime.now());
        chatMessageRepository.save(msg);

        log.info("🔥 메시지 수신됨: roomId={}, sender={}, content={}", room.getId(), sender.getName(), messageDto.getContent());

        ChatMessageDto sendDto = new ChatMessageDto();
        sendDto.setRoomId(room.getId());
        sendDto.setSender(sender.getName());
        sendDto.setContent(messageDto.getContent());

        messagingTemplate.convertAndSend("/topic/chatroom/" + room.getId(), sendDto);
    }
}
```

## Entity 설계

**ChatRoom**

```java
@Entity
@Getter
@Setter
public class ChatRoom {
    @Id @GeneratedValue
    private Long id;

    private String name;

    @OneToOne
    private Board board;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<ChatParticipant> participants = new ArrayList<>();
}
```

**ChatParticipant**

```java
@Entity
@Getter
@Setter
public class ChatParticipant {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private ChatRoom chatRoom;

    @ManyToOne
    private User user;
}
```

**ChatMessage**

```java
@Entity
@Getter
@Setter
public class ChatMessage {
    @Id @GeneratedValue
    private Long id;

    private String sender;
    private String content;
    private LocalDateTime sentAt;

    @ManyToOne
    private ChatRoom chatRoom;
}
```

**Repository 계층**

```java
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatRoomIdOrderBySentAtAsc(Long chatRoomId);
}

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {
    boolean existsByChatRoomIdAndUserId(Long chatRoomId, Long userId);
}

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    boolean existsByBoard(Board board);
    Optional<ChatRoom> findByBoard(Board board);
}
```

**WebSocket 채팅 테스트 클라이언트 (HTML + JS)**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <title>채팅 대시보드</title>
</head>
<body>
<h2>채팅 대시보드</h2>

<textarea id="chatLog" cols="60" rows="15" readonly></textarea><br />
<input type="text" id="messageInput" placeholder="메시지를 입력하세요" size="50" />
<button onclick="sendMessage()">전송</button>

<script src="https://cdn.jsdelivr.net/npm/sockjs-client/dist/sockjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/stompjs/lib/stomp.min.js"></script>

<script>
    const token = localStorage.getItem("accessToken");
    if (!token) {
        const redirectPath = encodeURIComponent(window.location.pathname);
        window.location.href = `/admin-login.html?redirect=${redirectPath}`;
    }

    const socket = new SockJS("http://localhost:8080/ws-chat");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
        { Authorization: "Bearer " + token },
        function (frame) {
            console.log("Connected: " + frame);
            appendLog("서버에 연결되었다.");

            stompClient.subscribe("/topic/chatroom/1", function (message) {
                const msg = JSON.parse(message.body);
                appendLog(msg.sender + ": " + msg.content);
            });
        },
        function (error) {
            console.error("WebSocket 연결 오류:", error);
            alert("WebSocket 연결에 실패하였다.");
        }
    );

    function sendMessage() {
        const input = document.getElementById("messageInput");
        const content = input.value.trim();
        if (!content) return;

        stompClient.send(
            "/app/chat.send",
            {},
            JSON.stringify({
                roomId: 1,
                content: content,
            })
        );

        input.value = "";
    }

    function appendLog(text) {
        const chatLog = document.getElementById("chatLog");
        chatLog.value += text + "\n";
        chatLog.scrollTop = chatLog.scrollHeight;
    }
</script>
</body>
</html>
```

## 동작 설명

-   **토큰 체크**: localStorage에 저장된 JWT 토큰을 Authorization 헤더에 포함한다.
-   **SockJS 사용**: /ws-chat로 연결되며, 서버는 WebSocketConfig에서 등록된다.
-   **구독 주소**: /topic/chatroom/{roomId}를 구독하여 실시간 메시지를 수신한다.
-   **발행 주소**: /app/chat.send로 메시지를 전송한다.
-   **메시지 저장**: 서버에서는 ChatMessageRepository.save()를 통해 DB에 저장한다.

## 주의사항

-   roomId는 테스트를 위해 고정값 1을 사용하였다. 동적으로 처리하려면 URL 파라미터 또는 Query String을 활용해야 한다.
-   localhost:8080은 서버 도메인에 맞게 수정해야 한다.
-   브라우저 콘솔에서 CORS 또는 인증 관련 오류가 발생할 수 있다. 이 경우 서버측 CORS 설정을 확인해야 한다.