# socket.io

+ socket.io 서버 생성

~~~javascript
// var server = require('socket.io');
// var io = new Server(httpServer);

//축약형태
var io = require('socket.io')(server);
~~~

+ 연결 이벤트
   + connection


# server
~~~ javascript
var io = require('socket.io')(server);
//클라이언트가 접속하면 connection 이벤트 발생
io.on('connection',function(socket){
    console.log('클라이언트 접속')
})
~~~

# client
~~~ html
<script src="socket.io.js"></script>

<script>
var socket =io();

socket.on('connect',function(){
    console.log('server connect')
})
</script>
~~~

# 데이터 교환

+ 메세지 주고받기 - 이벤트 기반
  + 메시지 이벤트정의
+ 메시지 전송
  + 이벤트발생 : socket.emit()
  + socket.emit('EVENT',data);
+ 메시지 수신
  + 이벤트 리스너 등록:socket.on()
  + socket.on('EVENT',function(data){})


# 보내기/받기
~~~ javascript
socket.emit('hello',{message:'Welcome'})
socket.on('howAreYou',function(data){
    var msg = data['message'];
})
~~~


~~~ javascript
socket.on('hello',function(data){
    var msg = data['message'];
})
socket.emit('howAreYou',{message:'Welcome'})
~~~


# 서버에서의 이벤트 발생
  + 소켓하나에 이벤트발생
  ~~~javascript
    socket.emit('Direct Event',[데이터])
  ~~~
  + 연결된 모든소켓에 이벤트발생
  ~~~javascript
    socket.io.emit('Broadcast Event',[데이터])
  ~~~

# 네임스페이스
## 기본 네임 스페이스로 연결
 + 서버
~~~javascript
    var io = require('socket.io')(server)
~~~
 + 클라이언트
~~~javascript
    var socket = io()
~~~

## 커스텀 네임 스페이스

 + 서버
~~~javascript
    var nsp = io.of('/Custom-Namespace')
~~~
 + 클라이언트
~~~javascript
    var nsp=io('/Custom-Namespace')
~~~

## 네임스페이스를 이용한 커넥션과 통신
서버
~~~javascript
// 기본 네임스페이스
var io = require('socket.io')(server)
...

//네임스페이스
var system = io.of('/system')
system.on('connection',function(socket){
    console.log('System namespace');
});
system.emit('message','Notice!')

~~~

클라이언트
~~~javascript
// 기본 네임스페이스
var socket = io()
...

// 커스텀 네임스페이스를 이용한 연결
var sysNsp = io('http:/myserver.com/system')
sysNsp.on('connection',function(socket){
    console.log('System namespace connect');
});
sysNsp.on('message',function(){
    alert('System message:' + data)
} )

~~~


# 룸
+ 네임스페이스 내 채널
+ 채팅방 룸이라고 보면됨
+ 룸에 입장(join) 여러 룸에 입장 가능
+ 룸에서 떠나기(leave)

+ 서버
~~~javascript
var room;
//채팅방 입장
socket.on('joinRoom',function(data){
    // 기존 방에서 나오기
    socket.leave(room);

    // 새로운 채팅방 입장
    room = data.room;
    socket.join(room)
})
//채팅 메시지 룸으로(to) 전송
socket.on('chatInput',function(data){
    io.to(room).emit('chatMessage',chat)
})
~~~
+ 클라이언트
~~~javascript
socket.emit('joinRoom',{room:room})

//채팅 메시지 수신
socket.on('chatMessage',function(data){
    var msg = data['msg'];
    var nick = data['nick'];
    var str = nick + ' : ' + msg;
    //채팅메세지
    $('#messages').append($('li').text(str))
})
~~~