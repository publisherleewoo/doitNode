
document.querySelector('.signUpBtn').addEventListener('click', function (e) {
    e.preventDefault();
    var email = document.forms[0].email.value;
    var name = document.forms[0].name.value;
    var password = document.forms[0].password.value;
    var data = {
        email: email,
        name: name,
        password: password,
    }
    data = JSON.stringify(data)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var reponseText = JSON.parse(this.responseText)
            document.querySelector(".result").innerHTML = reponseText.msg
        }
    };
    xhttp.open("post", "/signUp/check", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);

})