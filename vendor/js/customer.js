$(document).ready(function(){
    var apiURL = "https://shop.ranchiblog.in/foodshala/";

    if(sessionStorage.getItem('user')){
        var resData = JSON.parse(sessionStorage.getItem('user'));
        $('#customerDropdown').html(resData['name']);
        let currLoc = window.location.href;
        currLoc = currLoc.split('/');
        let pageName = currLoc[currLoc.length - 1];
        if(pageName == "index.html"){
           $('.opt-header').remove();
           $('#customerDpdwn').show();
        }
        else if(pageName == "login.html" || pageName == "registration.html"){
            $('.opt-header').remove();
            $('#customerDpdwn').show();
            location.href="../../index.html";
        }
    }
    else{
        let currLoc = window.location.href;
        currLoc = currLoc.split('/');
        let pageName = currLoc[currLoc.length - 1];
        if(pageName !== "login.html" && pageName !== "registration.html"){
            location.href="login.html";
        }
    }

    $('#logout').click(function(){
        sessionStorage.clear();
        location.href="login.html";
    });
    
    //Customer Functions - Login/Signup
    $("#customerReg").submit(function(event) { 
        event.preventDefault();
    }).validate({
        rules: {
            "name":{
                required: true,
            },
            "password":{
                required:true
            },
            "phone":{
                required:true
            }
        },
        submitHandler: function(form) {
            $.ajax({
                url:apiURL+'customer/signup',
                type: 'POST',
                data: new FormData(form),
                dataType:'json',
                processData: false,
                contentType: false,
                success:function(as){
                    if(as.status == true){
                        alert(as.message);
                        location.reload();
                    }
                    else if(as.status == false){
                        alert(as.message);
                    }
                }
            });
        }
    });

    //Login
    $("#customerLogin").submit(function(event) { 
        event.preventDefault();
    }).validate({
        rules: {
            "phone":{
                required:true
            },
            "password":{
                required:true
            }
        },
        submitHandler: function(form) {
            $.ajax({
                url:apiURL+'customer/login',
                type: 'POST',
                data: new FormData(form),
                dataType:'json',
                processData: false,
                contentType: false,
                success:function(as){
                    if(as.status == true){
                        sessionStorage.setItem('user', JSON.stringify(as.data));
                        location.reload();
                    }
                    else if(as.status == false){
                        alert(as.message);
                    }
                }
            });
        }
    });
})