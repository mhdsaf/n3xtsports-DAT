$(document).ready(function () {
    localStorage.setItem('foo', 'Wya_%WfAy9(z$usN');
    $('#login').click(function (e) {
        e.preventDefault();
        if($('#username').val()!='' && $('#password').val()!=''){
            let obj = {
                email: $('#username').val(),
                pass: $('#password').val()
            }
            fetch('/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((response)=>{
                response.json().then((data)=>{
                    if(data.response=='Success'){
                        $('#form').submit();
                    }else{
                        alert('Access denied');
                    }
                });
            });
        }else{
            alert("empty input")
        }
    });
    
});