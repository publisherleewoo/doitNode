# HTTP 통신
+ 요청(request)
+ 응답(response)

## 요청과 응답 과정
+ 웹브라우저 -> 주소입력 -> 요청 -> 웹서버 -> 응답 -> 웹브라우저

## http 메세지 구조
+ 요청메세지
  + 요청 라인
    + HTTP 버전 (GET /HTTP/1.1)
    + 요청 URL
    + 요청 메소드 (GET,POST,PUT,DELETE...)
  + 요청 헤더 (키,값방식)
    + Accept:클라이언트가 받을 수 있는 컨텐츠
    + Cokkie:쿠키
    + Content-Type:메세지 바디(엔티티)의 종류
    + Content-Length:메시지 바디의 길이
    + IF_Modified-Since:특정 날짜 이후에 변경되었을 때만
  + 요청 바디(엔티티)


## http 요청 정보 전달

+ URL을 이용한 요청 정보 전달 (GET메소드)
+ 경로와 쿼리스트링 사용 
  + http://idols.com/snsd/teayon.png
  + http://idols.com/g?group=snsd&name=jessica
+ 메시지 바디를 사용하지 않는다.

+ URLEncoded방식
+ 메세지 헤더(컨텐츠 타입)
  + application/x-www-form-urlencoded (서버에서 헤더의 이것을 보고, body 방식을 분석한다)
+ 메시지 바디:쿼리 문자열
+ 메시지 예
  + ContentType: application/x-www-form-urlencoded
  + title=Madmax&Director=Gerge+Miller


추가적으로 application/json 방식으로 헤더를 전달하고 
바디에 {test:'hi'} 제이슨형식으로 전달 할수 있다.

+ 멀티 파트를 이용한 요청 정보 전달
  + 바이너리 파일을 올리는 경우에 주로 사용
  + 하나의 메세지 바디에 파트를 나눠서 작성
+ 메세지 헤더
  + 컨텐츠타입:파트구분자(boundary)
  + multipart/form-data;boundary=frontier

```
--frontier
Content-Type:text/plain

this is the body of the message
--frontier
Content-Type:application/octet-stream
Content-Transfer-Encoding:base64

EPWKFK#@P$I)#@EWKKREWOR(@#RWMEREWMRL)DJQWODJ+VjdERWofdsjoQW=
--frontier
```

+ 메시지 바디를 사용 여부
+ 바디의 인코딩 방식
+ url롤 요청 정보 전달:바디 분석 불필요



## http 응답 메시지 구조
+ 응답 메시지
  + 응답 라인
  + 응답 헤더
  + 응답 바디

```
//상태라인
HTTP/1.1 200 OK  


//헤더필드
DAte:Mon, 23 May 2005 22:38:34 GMT
SERVER:~~~
Last-Modiried:~~~
ETag:~~~~
Content-Type:~~~
Content-Length:~~~~


//메시지 바디
<html>
<head>
<title>title</title>
</head>
<body>
Hello world~~~~~
```
+ 응답라인
  + 버전
  + 상태코드
  + 상태 메시지-> HTTP/1.1 200 OK

+ 응답 메세지 헤더
  + Content-Type : 바디 데이터 타입
  + Content-Length : 바디 데이터 크기
  + Set-Cookie : 쿠키 설정
  + ETag : 엔티티 태그

+ 바디 데이터
  + HTML
  + XML/JSON
  + Octet Stream 등
  
+ 바디 기록방식 : Content-Type 헤더필드


+ 컨텐츠 타입
  + 메시지 헤더에 기록
  + 필드 이름 content-type
  + 대분류/소분류

+ 주요 컨텐츠 타입
  + text/plain,text/html
  + application/xml,application/json
  + image/png , image/jpg
  + audio/mp3,video/mp4

+ HTML 응답 메시지 헤더
  + content-type:text/html
 ~~~html
<html>
<body>
<h1>Hello</h1>
</body>
</html>
 ~~~ 