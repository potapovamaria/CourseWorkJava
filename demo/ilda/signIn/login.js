window.onload = function() {
    document.getElementById("btnSI").onclick = function () {

        let json = JSON.stringify({
            "userName": document.getElementById("userName").value,
            "password": document.getElementById("password").value
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/app/auth/signin', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        var k = 0;
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && (xhr.status === 200)) {
                var data = JSON.parse(xhr.responseText)
                localStorage.setItem('token', data.token)
                localStorage.setItem('role', data.role)
                getXMLHttpRequest()
            } else if (xhr.status === 500 && (k < 1) ) {
                alert("Incorrect password or username")
                k++;
            }
        });
        xhr.send(json);

    };
};

function getXMLHttpRequest() {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/app/works', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            document.location.href = "file:///C:/Users/Mary/IdeaProjects/newProj/demo/ilda/mainPage/mainPage.html";
        }
    });
    xmlHttpRequest.send()
};








