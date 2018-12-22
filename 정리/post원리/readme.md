클라이언트에서 post 메서드로 데이터를 서버로 전달하면 Steam으로 청크단위로 전달한다.
서버측에서는 Buffer를 req.on('data',function(Chunk){})로 Chunk단위로 받으면서 그 청크들을 


```javascript
var buffer ='';
req.on('data',function(Chunk){
	buffer += Chunk
})
```
식으로 합쳐준다.

그다음에,

```javascript
req.on('end',function(){
	console.log(buffer)
})
```
로 확인한다.