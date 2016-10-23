var $ = window.jQuery;

var getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
};

var explink = chrome.extension.getURL("app/dist/experiment.mixed.min.js");

if (getCookie('abdev_experiment') == 'on') {
    $(document).ready(function () {
        $('body').append('<script type="text/javascript" id="abdev">' +
            '(function() {' +
            'var abdev = document.createElement(\'SCRIPT\');' +
            'abdev.type = \'text/javascript\';' +
            'abdev.src = "' + explink + '";' +
            'document.getElementsByTagName(\'head\')[0].appendChild(abdev);' +
            '})();</script>');
    });
}