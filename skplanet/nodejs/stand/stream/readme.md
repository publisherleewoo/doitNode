
# 스트림

## 스트림:데이터의 전송 흐름

+ 콘솔 입력/출력
+ 파일 읽기/쓰기
+ 서버/클라이언트 -데이터 전송

## 스트림 모듈
+ 스트림을 다루기 위한 추상 인터페이스
+ 다양한 스트림은 같은 인터페이스로 다룰 수 있다.

## 스트림의 종류
+ 읽기 스트림 Readable Stream
+ 쓰기 스트림 Writeable Stream
+ 읽기/쓰기 Duplex
+ 변환 transform

### Readable Stream
+ 읽기 스트림:Readble
+ 모드:flowing,paused
+ flowing mode
  + 데이터를 자동으로 읽는 모드
  + 전달되는 데이터를 다루지 않으면 데이터 유실
+ paused mode
  + 데이터가 도착하면 대기
  + read()함수로 데이터 읽기
  
+ Readable 메소드
  + 읽기
    + readable.read([size])
    + readble.setEncoding(encoding)
  + 중지/재개
    + readable.pause()
    + readable.resume()
  + 파이프
  + readble.pipe(destination,[options])
  + readble.unpipe([destination])

+ Readable 이벤트
  + readable : 읽기 가능한 상태
  + data : 읽을 수 있는 데이터 도착
  + end : 더 이상 읽을 데이터가 없는 상태
  + close : 스트림이 닫힌 상태
  + error : 에러

+ flowing mode
  + data 이벤트 구현
  + pipe 연결
  + resume()호출

~~~javascript
//stream은 data,end이벤트가 필수다

var is = fs.createReadStream(file); //파일 경로
is.on('readable',function(){
    console.log('==READABLE EVENT')
})

is.on('data',function(chunk){
    console.log('==DATA EVENT')
    console.log(chunk.toString())
})

is.on('end',function(){
    console.log('==END EVENT')
})

~~~

+ paused mode
  ~~~javascript
    var is = fs.create.ReadStream(file)

    //'data' 이벤트가 없으면 paused mode

    is.on('reable',function(){
        console.log('==READBLE EVENT')
    })

    //10바이트씩 읽기
    while(chunk = is.read(10)){
        console.log('chunk : ', chunck.toString())
    }
  ~~~

### Writable Stream
+ Writable Stream : 데이터 출력
+ 예
  + http 클라이언트의 요청
  + http 서버의 응답
  + 파일 쓰기 스트림
  + tcp 소켓

+ 메소드
  + 데이터 쓰기,인코딩
    + writable.setDefaultEncoding(encoding)
    + writable.write(chunk,[encoding],[callback])
  + 스트림 닫기
    + writable.end([chunk],[encoding],[callback])
  + 버퍼
    + writable.cork()
    + writable.uncork()

+ 이벤트
  + drain : 출력 스트림에 남은 데이터를 모두 보낸 이벤트
  + error : 에러
  + finish : 모든 데이터를 다 쓴 이벤트
  + pipe : 읽기 스트림과 연결(pipe)된 이벤트
  + unpipe : 연결(pipe)해제 이벤트

~~~javascript
var os = fs.createWriteStream('output.txt')
os.on('finish',function(){
    console.log('==FINISH EVENT')
})

os.write('1234\n');
os.write('5678\n');

os.end('9\n') //finish event
~~~

 + 표준 입출력 스트림
   + process.stdin : 콘솔 입력
   + process.stdout : 콘솔 출력
  

~~~javascript
var is = process.stadin;
var os = fs.createWriteStream('output.txt')

os.on('pipe',function(src){
    console.log('pipe event')

    // exit 입력이 오면 파이프 연결 해제
    is.on('data',function(data){
        if(data.trim()==="exit"){
            is.unpipe(os)
        }
    })
})
is.pipe(os)
~~~