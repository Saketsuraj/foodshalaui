$(document).ready(function(){
    var apiURL = "https://shop.ranchiblog.in/foodshala/";
    if(sessionStorage.getItem('user')){
        let userdata = JSON.parse(sessionStorage.getItem('user'));
        let currLoc = window.location.href;
        currLoc = currLoc.split('/');
        let pageName = currLoc[currLoc.length - 1];
        if(pageName == "login.html"){
            
        }
    }

    function getRestaurants(){
        
        $.ajax({
            url:apiURL+'restaurant/all',
            type: 'GET',
            dataType:'json',
            success:function(as){
                if(as.status == true){
                    var data = "";
                    for(var i = 0; i < as.data.length; i++){
                        data += '<div class="card"><div class="card-header" id="heading_'+i+'"><h5 class="mb-0">';
                        data += '<button class="btn btn-link" data-toggle="collapse" data-target="#collapse_'+i+'" aria-expanded="true" aria-controls="collapse_'+i+'">';
                        data += as.data[i].name;
                        data += '</button></h5></div>';

                        data += '<div id="collapse_'+i+'" class="collapse" aria-labelledby="heading_'+i+'" data-parent="#accordion">';
                        data += '<div class="card-body"><button class="btn btn-success btn-order">Order</button><ul>';

                       
                        for(var j = 0 ; j < as.data[i].items.length; j++){
                            data += '<li><span class="item-name">'+as.data[i].items[j].name+'</span> | ';
                            if(as.data[i].items[j].type=="non-veg"){
                                data += '<span class="item-red">Non Veg</span>'
                            }
                            else{
                                data += '<span class="item-green">Veg</span>'
                            }
                            data += '| <span>Rs. '+as.data[i].items[j].price+'</span> <button class="btn btn-primary">Add</button></li>';
                        }
                                
                            

                        data += '</ul> </div></div></div>';
                    }

                    $('#accordion').html(data);
                    
                }
                else if(as.status == false){
                    alert(as.message);
                }
            }
        });
    }

    getRestaurants();
});