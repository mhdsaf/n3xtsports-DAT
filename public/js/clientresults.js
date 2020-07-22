$(document).ready(function () {
    var count = 311;
    var arrow = false;
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
            localStorage.setItem('Abs', data.results.Business_Strategy);
            localStorage.setItem('Aid', data.results.Internal_Digitalization);
            localStorage.setItem('Adp', data.results.Digital_Products);
            localStorage.setItem('Adm', data.results.Data_Management);
            localStorage.setItem('Acp', data.results.Content_Production);
            localStorage.setItem('ATotal', data.results.Total);
            console.log(localStorage.getItem('Abs'));
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
    fetch('/getCount',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    }).then((response)=>{
        response.json().then((data)=>{
            let numb = data.numb;
            numb = parseInt(numb);
            numb = numb + count;
            let str = `&#9${numb}`;
            console.log(str)
            if(str=='&#9311'){
                $("#numb").html('<span class="border border-dark" style="border-radius: 50%; padding-left: 5px; padding-right: 5px; padding-bottom: 3px">0</span>');
            }
            else{
                $("#numb").html(str);
            }
        });
    });
    $(".col1").click(function (e) { 
        e.preventDefault();
        let name = $(this).attr('name');
        let val = $(`#${name}`).attr('value');
        if(val=='0'){
            $(`#${name}`).html(`<i class="fas fa-caret-down"></i>`);
            $(`#${name}`).attr('value', '1');
        }else{
            $(`#${name}`).html(`<i class="fas fa-caret-right"></i>`);
            $(`#${name}`).attr('value', '0');
        }
    });
});