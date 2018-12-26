app.set('views',[템플릿폴더])
app.set('views engine',[템플릿엔진])

~~~javascript
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
~~~



~~~javascript
//index템플릿 파일을 랜더링한 결과로 응답
res.render('index')

res.render('index',{name:'IU'})

res.render('index',{name:'IU'},function(err,html){

})
~~~



+ 코드실행 : <% %>
+ 결과출력 : <%= %>

+ 값으로 출력
~~~
<div><%= value   %></div>
~~~

+ 태그 내 어튜리뷰트
~~~
<img src="<%= data.image%>">
~~~

+ HTML과 혼합
~~~
<% var tag ='h1' %>
<<% =tag %>>Tag만들기</<% =tag %>>
~~~