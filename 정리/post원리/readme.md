Ŭ���̾�Ʈ���� post �޼���� �����͸� ������ �����ϸ� Steam���� ûũ������ �����Ѵ�.
������������ Buffer�� req.on('data',function(Chunk){})�� Chunk������ �����鼭 �� ûũ���� 


```javascript
var buffer ='';
req.on('data',function(Chunk){
	buffer += Chunk
})
```
������ �����ش�.

�״�����,

```javascript
req.on('end',function(){
	console.log(buffer)
})
```
�� Ȯ���Ѵ�.