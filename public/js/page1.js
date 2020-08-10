$(document).ready(function () {
    $('#sec1').show();
    $('#sec2').hide();
    $('#sec3').hide();
    $('#sec4').hide();
    $('#btn1').click(function (e) { 
        e.preventDefault();
        $('#sec1').hide();
        $('#sec2').show();
        $('#sec3').hide();
        $('#sec4').hide();
    });
    $('#btn2').click(function (e) { 
        e.preventDefault();
        $('#sec1').hide();
        $('#sec2').hide();
        $('#sec3').show();
        $('#sec4').hide();
    });
    $('#btn3').click(function (e) { 
        e.preventDefault();
        $('#sec1').hide();
        $('#sec2').hide();
        $('#sec3').hide();
        $('#sec4').show();
    });
    $('#btn4').click(function (e) { 
        e.preventDefault();
        location.href = 'questionnaire'
    });
});