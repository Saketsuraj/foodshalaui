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

    function getItems(){
        let fd = new FormData();
        fd.append('resid', resData['id']);
        $.ajax({
            url:apiURL+'restaurant/getitems',
            type: 'POST',
            data: fd,
            dataType:'json',
            processData: false,
            contentType: false,
            success:function(as){
                if(as.status == true){
                    var data = "";
                    for(var i = 0; i < as.data.length; i++){
                        data += '<div class="col-md-3 item"><div><div><span class="item-name">'+as.data[i].name+'</span></div>';
                        if(as.data[i].type=="non-veg"){
                            data += '<div><span class="item-red">';
                        }
                        else{
                            data += '<div><span class="item-green">';
                        }
                        data += as.data[i].type+'</span> | <span>Rs. '+as.data[i].price+'</span></div>';
                        data += '<div><button class="btn btn-danger">Remove</button></div>';
                        data += '</div></div>';
                    }
                    $('#itemsList').html(data);
                }
                else if(as.status == false){
                    alert(as.message);
                }
            }
        });
    }

    getItems();
})