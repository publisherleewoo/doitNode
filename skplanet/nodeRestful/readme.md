# curl

+ 터미널로 접속
curl localhost:3000 


+ 헤더정보 출력
curl localhost:3000 -v


# Restful api
 ## http 요청
+ 모든 자원은 명사로 식별
+ http 경로로 자원을 요청
+ 예
    + GET /users
    + get /users/{id}

/users처럼 명사만넣으면 구분짓기 힘들기때문에

+ /create_users
+ /delete_users

로 해야하나 

+ get(read)
+ post(add)
+ put(update)
+ delete(delete)로 대체한다.
  
이는 익스프레스 어플리케이션 메소드로 구현되어있다.

# 단위테스트
단위테스트로는 mocha, should가 있다

api 테스트로는 SuperTest가 있다.
익스프레스 서버를 구동시켜 실제 요청을 보낸뒤 검증한다.

mocha (-단위테스트)
should(-벨리데이터)
SuperTest (-api단위테스트)