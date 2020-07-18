$(document).ready(function () {
    var clientData = "";
    var table = $('#dataTable').DataTable();
        fetch('/clients',{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response)=>{
                response.json().then((data)=>{
                    clientData = data.data;
                    console.log(data);
                    let i = 0;
                    let n = data.data.length;
                    let temp = '';
                    while(i<n){
                        if (data.data[i].ContactAgreement==true) {
                            temp = 'Yes'
                        } else {
                            temp = 'No'
                        }
                        let name = data.data[i].email + ":" + data.data[i].results.length;
                        let text = '<button data-toggle="modal" data-target="#myModal" class="' + 'btn btn-outline-primary"' + ' id="detail"' + " name=" +  name + " style=" + '"display:block;margin: auto;"' + " >Results</button>";
                        table.row.add([`${data.data[i].name}`,`${data.data[i].email}`,`${data.data[i].title}`, `${data.data[i].company}` ,`${data.data[i].Organization}`, `${temp}`, `${data.data[i].results.length}`, text]).draw();
                        i++;
                    }
            });
        });
        $("#dataTable").on('click','#detail',function(){
            $("#mbody").html("");
            let name = $(this).attr('name');
            let arr = name.split(':');
            let email = arr[0];
            let n = arr[1];
            let tempo = 0;
            if(n==1){
                $(this).removeAttr('data-toggle');
                document.getElementById('results').click();
                localStorage.setItem('clientEmail', email + ':' + tempo);
            }else{
                clientData.forEach(element => {
                    if(element.email==email){
                        tempo = element.results;
                        return false;
                    }
                });
                for (let index = 0; index < tempo.length; index++) {
                    $("#mbody").append('<p><a href="#" id="sub"' + ' name="' + email + ':' + index + '">Submission ' + `${index+1}` + '</a>' + '<span class="float-right">' + tempo[index].SubmittedAt + '</span>')
                }
            }
        });
        $("#myModal").on('click','#sub',function(){
            localStorage.setItem('clientEmail', $(this).attr('name'));
            let arr = $(this).attr('name').split(':');
            document.getElementById('results').click();
        });
});