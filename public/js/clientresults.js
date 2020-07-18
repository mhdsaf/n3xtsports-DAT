$(document).ready(function () {
    console.log("Welcome " + localStorage.getItem('clientEmail'));
    var arr = localStorage.getItem('clientEmail').split(':');
    var email = arr[0];
    var n = arr[1];
    fetch('/adminProfile',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, index: n})
    }).then((response)=>{
        response.json().then((data)=>{
            console.log(data);
            localStorage.setItem('Abs', data.Business_Strategy);
            localStorage.setItem('Aid', data.Internal_Digitalization);
            localStorage.setItem('Adp', data.Digital_Products);
            localStorage.setItem('Adm', data.Data_Management);
            localStorage.setItem('Acp', data.Content_Production);
            localStorage.setItem('ATotal', data.results.Total);
            $("#ClientName").html(data.name);
            $("#ClientCompany").html(data.company);
            $("#ClientTitle").html(data.title);
            $("#ClientDate").html(data.results.SubmittedAt);
            let score = localStorage.getItem('ATotal');
            if(score>=25 && score<=45){
                $("#ClientTotal").html('Understand: ' + score)
            }else if(score>=46 && score<=80){
                $("#ClientTotal").html('Develop: ' + score)
            }else{
                $("#ClientTotal").html('Scale: ' + score)
            }
            data.questions.test.forEach((element, index) => {
                if(element==1){
                    $(`#${index+1}`).html('<br><span class=font-weight-bold>Answer</span>: No <br> <span class=font-weight-bold>Score</span>: 1 point');
                }else if(element==2){
                    $(`#${index+1}`).html('<br><span class=font-weight-bold>Answer</span>: Somewhat in between <br> <span class=font-weight-bold>Score</span>: 2 points');
                }else{
                    $(`#${index+1}`).html('<br><span class=font-weight-bold>Answer</span>: Yes <br> <span class=font-weight-bold>Score</span>: 4 points');
                }
            });
        });
    });

});