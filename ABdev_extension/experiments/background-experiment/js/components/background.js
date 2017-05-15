var $ = require('jquery');

module.exports = (function() {
    
    var init = function(){
        
        var rand = function(min,max){
            return Math.floor(Math.random()*(max-min+1)+min);
        };
        
        var bgClasses = ['bg-one','bg-two'];
        
        $('body').addClass(bgClasses[rand(0,1)]);

    }
    return {
        init: init
    };

})();
