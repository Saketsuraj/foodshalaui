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
                        data += '<div class="card-body"><button type="button" id="order_'+as.data[i].id+'" class="btn btn-success btn-order">Order</button><ul>';

                       
                        for(var j = 0 ; j < as.data[i].items.length; j++){
                            data += '<li><span class="item-name">'+as.data[i].items[j].name+'</span> | ';
                            if(as.data[i].items[j].type=="non-veg"){
                                data += '<span class="item-red">Non Veg</span>'
                            }
                            else{
                                data += '<span class="item-green">Veg</span>'
                            }
                            data += '| <span>Rs. '+as.data[i].items[j].price+'</span> <button type="button" id="btn_'+as.data[i].items[j].id+'_'+as.data[i].id+'" class="btn btn-primary item-btn">Add</button></li>';
                        }
                                
                        data += '</ul> </div></div></div>';
                    }

                    $('#accordion').html(data);

                    var cart = [];
                    $('.item-btn').click(function(){
                        let itemdata = $(this).attr('id');
                        let btnid = itemdata;
                        itemdata = itemdata.split('_');
                        let idx = _.findIndex(cart, {"item_id":itemdata[1], "res_id":itemdata[2]});
                        let flag = false;
                        if(idx === -1){
                            if(cart.length){
                                _.each(cart, (v,i)=>{
                                    if(v.res_id !== itemdata[2]){
                                        alert("Items from one restaurant can be ordered at a time");
                                        flag = true;
                                        return cart;
                                    }
                                });
                            }
                            if(!flag){
                                cart.push({
                                    "item_id":itemdata[1],
                                    "res_id": itemdata[2]
                                });
                                $('#'+btnid).html("Added");
                                $('#'+btnid).removeClass('btn-primary');
                                $('#'+btnid).addClass('btn-success');
                            }
                        }
                        else{
                            cart.splice(idx, 1);
                            $('#'+btnid).html("Add");
                            $('#'+btnid).addClass('btn-primary');
                            $('#'+btnid).removeClass('btn-success');
                        }
                    });
                    
                    //Place order
                    $('.btn-order').click(function(e){
                        e.preventDefault();
                        if(!sessionStorage.getItem('user')){
                            location.href = "pages/customer/login.html";
                        }
                        else{
                            if(cart.length < 1){
                                alert("Please select atleast one item");
                            }
                            else{
                                let items = "", res_id = "", customer_id = "";
                                _.each(cart, (v, i)=>{
                                    items += v.item_id+",";
                                    res_id = v.res_id
                                });
                                items = items.replace(/,\s*$/, "");

                                customer_id = resData['id'];
                                let fd = new FormData();
                                fd.append("customer_id", customer_id);
                                fd.append("items", items);
                                fd.append("res_id", res_id);

                                $.ajax({
                                    url:apiURL+'customer/order',
                                    type: 'POST',
                                    data: fd,
                                    dataType:'json',
                                    processData: false,
                                    contentType: false,
                                    success:function(as){
                                        if(as.status){
                                            alert(as.message);
                                            location.reload();
                                        }
                                        else{
                                            alert(as.message);
                                        }
                                    }
                                });
                            }
                        }
                    });
                    
                }
                else if(as.status == false){
                    alert(as.message);
                }
            }
        });
    }

    $('#logout').click(function(){
        sessionStorage.clear();
        location.reload();
    });

    getRestaurants();
});