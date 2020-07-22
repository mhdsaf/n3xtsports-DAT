$(document).ready(function () {
    // Set new default font family and font color to mimic Bootstrap's default styling
    setTimeout(() => {
        Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart1");
let x = localStorage.getItem('understand');
let y = localStorage.getItem('develop');
let z = localStorage.getItem('scale');
let w = localStorage.getItem('total');
console.log("**********")
          console.log(x);
          console.log(y);
          console.log(z);

let understand=Math.ceil((x/w)*100);
let develop=Math.ceil((y/w)*100);
let scale=Math.ceil((z/w)*100);

var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Understand (%)", "Develop (%)", "Scale (%)"],
    datasets: [{
      data: [understand,develop,scale],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    title: {
      display: true,
      text: 'Percentage of clients in all 3 phases'
    },
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
    }, 1000);
});