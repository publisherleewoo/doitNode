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





## 페이지 네이션 메세지 구조
```JSON
{
    "totalItems":100,
    "itemsPerPAge":10,
    "startIndex":20,
    "paging":{
        "prev":"http://mystore.com/items/start=10",
        "next":"http://mystore.com/items/start=30"
    },
    "data":[
        //데이터
    ]

}
```

#영화 목록보기 설계


## 영화 목록 보기 api 설계
+ url : http://api.moviest.com/moives
+ method:get
```JSON
{
    "count":2,
    "data":[
        {"id":0,"title":"아바타"},
        {"id":1,"title":"스타워즈"},
    ]

}
```


## 영화 상세 정보 보기 api 설계
+ url : http://api.moviest.com/moives/0
+ method:get
```JSON
{
    "id":0,
    "title":"아바타",
    "director":"제임스 카메론",
    "year":2009,
    "synopsis":"인류의 마지막 희망, 생성 판도라! 이곳을 정복하기위한 아바타 프로젝트가 시작된다"

}
```

## 영화 정보 추가 api 설계
+ url : http://api.moviest.com/moives
+ method:post
```JSON
//요청 메세지의 예
{
    "title":"스타워즈7",
    "director":"jj에이브럼스",
    "year":2016,
    "synopsis":"깨어난포스"
}
```

<br>

```JSON
//응답 메세지의 예
{
   "message":"성공","id":3}
}
```


## 영화 정보 추가 api 설계
+ url : http://api.moviest.com/moives/0
+ method:delte
```JSON
//요청 메세지의 예
{
    "message":"success",
    "item":{
        "id":0,
        "title":"아바타",
        "director":"제임스 카메론",
        "year":2009,
        "synopsis":"인류의 마지막 희망, 생성 판도라! 이곳을 정복하기위한 아바타 프로젝트가 시작된다"
    }
}
```


## get/post만 사용 가능한 환경
moveiest.com/movies/add
moveiest.com/avata/edit
moveiest.com/?id=starwars&operation=delete
 