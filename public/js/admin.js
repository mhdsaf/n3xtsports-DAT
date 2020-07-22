$(document).ready(function () {
    var club = 0;
    var league = 0;
    var assoc = 0
    var NF = 0
    var IF = 0;
    var EO = 0;
    var NOC = 0;
    var other = 0;
    var leads = 0;
    var contact = 0;
    fetch('/clients',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then((response)=>{
        response.json().then((data)=>{
            console.log(data);
            leads = data.data.length;
            data.data.forEach(element => {
                if(element.Organization=="Club"){
                    club++
                }else if(element.Organization=="League"){
                    league++;
                }else if(element.Organization=="Association"){
                    assoc++;
                }else if(element.Organization=="National Federation"){
                    NF++;
                }else if(element.Organization=="International Federation"){
                    IF++;
                }else if(element.Organization=="Event Organizer"){
                    EO++
                }else if(element.Organization=="National Olympic Committee"){
                    NOC++;
                }else{
                    other++;
                }
                if(element.ContactAgreement==true){
                    contact++
                }
            });
            $("#leads").html(leads);
            $("#contact").html(contact);
            new Chart(document.getElementById("barChart"), {
                type: 'horizontalBar',
                data: {
                  labels: ["Club", "League", "Association", "Nat'l Federation", "Int Federation", "Event Organizer", "Nat'l Olympic Committee", "Other"],
                  datasets: [
                    {
                      label: "Number of Clients",
                      backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "skyblue" , "grey" , "lightgreen"],
                      data: [club,league,assoc,NF,IF, EO, NOC, other]
                    }
                  ]
                },
                options: {
                  legend: { display: false },
                  title: {
                    display: false,
                    text: ''
                  },
                  scales: {
                    xAxes: [{
                      display: true,
                      ticks: {
                        stepSize: 1, // <----- This prop sets the stepSize
                        suggestedMin: 0,
                      }
                    }]
                  }
                }
            });
            console.log(IF);
        })
    });
    fetch('/clients',{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        }).then((response)=>{
        response.json().then((data)=>{
            $("#NbLeads").html(data.data.length);
            
            localStorage.setItem('total',data.data.length);
            var toContact=0;
            data.data.forEach((clients) => {
              if(clients.ContactAgreement==true)
              {
                console.log(clients.name)
                toContact++;
              }
              
            });
            
            $("#toContactbar").html(Math.ceil((toContact/data.data.length)*100)+ "%") ;
            var d = new Date().toISOString().substring(0, 10);
            console.log(d);
    
            var counter=0;
            data.data.forEach((clients) => {
              if (clients.updatedAt.substring(0,10)==d)
              {
                counter++;
              }
            });
            $("#Today").html(counter) ;
            let understand=0;
            let develop=0;
            let scale=0;
            data.data.forEach((clients) => {
              let size=clients.results.length-1;
              let score=clients.results[size].Total;
             
               if(score>=25 && score<=45){
                understand++;
                
               
               }else if(score>=46 && score<=80){
                develop++;
               
               }else{
                scale++
               
               }
          });
          localStorage.setItem('understand',understand);
          localStorage.setItem('develop',develop);
          localStorage.setItem('scale',scale);
        })
    });
     
});