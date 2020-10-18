$(document).ready(function(){
    if(sessionStorage.getItem('user')){
        let userdata = JSON.parse(sessionStorage.getItem('user'));
        let currLoc = window.location.href;
        currLoc = currLoc.split('/');
        let pageName = currLoc[currLoc.length - 1];
        if(pageName == "login.html"){
            
        }
    }
});