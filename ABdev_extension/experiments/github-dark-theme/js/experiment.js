var $ = require('jquery');

// Show experiment only on this page:
// https://github.com/vilcuRob/ABdev

var showDarkTheme = function(){
    var url = window.location.href;
    var lastPart = url.substr(url.lastIndexOf('/') + 1);
    if (lastPart === "ABdev") {
       $('body').addClass('dark-blue-theme');
    }else{
       $('body').removeClass('dark-blue-theme'); 
    }
};

$(document).ready(function(){
    showDarkTheme();
}).on('click',function(){
    showDarkTheme();
});

