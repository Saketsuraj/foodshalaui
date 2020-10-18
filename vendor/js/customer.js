$(document).ready(function(){
    var apiURL = "https://shop.ranchiblog.in/foodshala/";

    

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
                        console.log(as);
                        sessionStorage.setItem('user', JSON.stringify(as.data));
                    }
                    else if(as.status == false){
                        alert(as.message);
                    }
                }
            });
        }
    });
})