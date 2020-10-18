$(document).ready(function(){
    var apiURL = "https://shop.ranchiblog.in/foodshala/";

    if(sessionStorage.getItem('restaurant')){
        var resData = JSON.parse(sessionStorage.getItem('restaurant'));
        $('#restaurantDropdown').html(resData['name']);
    }

    $('#logout').click(function(){
        sessionStorage.clear();
        location.href="login.html";
    });

    //Restaurant Functions - Login/Signup
    $("#restaurantReg").submit(function(event) { 
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
                url:apiURL+'restaurant/signup',
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
    $("#restaurantLogin").submit(function(event) { 
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
                url:apiURL+'restaurant/login',
                type: 'POST',
                data: new FormData(form),
                dataType:'json',
                processData: false,
                contentType: false,
                success:function(as){
                    if(as.status == true){
                        sessionStorage.setItem('restaurant', JSON.stringify(as.data));
                        location.href = "view-all-items.html";
                    }
                    else if(as.status == false){
                        alert(as.message);
                    }
                }
            });
        }
    });

    $("#addItem").submit(function(event) { 
        event.preventDefault();
    }).validate({
        rules: {
            "name":{
                required: true,
            },
            "type":{
                required:true
            },
            "price":{
                required:true
            }
        },
        submitHandler: function(form) {

            let fd = new FormData(form);
            fd.append('restaurant_id', resData['id']);
            $.ajax({
                url:apiURL+'restaurant/additem',
                type: 'POST',
                data: fd,
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
})