var cookieName = 'abdev_experiment';

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function (tabs) {

    var curTabUrl = tabs[0].url;
    if (curTabUrl == '' || curTabUrl.indexOf('chrome://') > -1 || curTabUrl.indexOf('file://') > -1) {

        $('#myonoffswitch').remove();

    } else {

        chrome.cookies.get({
            url: curTabUrl,
            name: cookieName
        }, function (cookie) {
            if (cookie) {
                if (cookie.value == 'on') {
                    $('#myonoffswitch').attr('checked', true);
                } else {
                    $('#myonoffswitch').attr('checked', false);
                }
            }
        });

        $(document).on('click', '.onoffswitch', function () {

            if ($('#myonoffswitch').prop('checked') === false) {
                chrome.cookies.remove({
                    url: curTabUrl,
                    name: cookieName
                });
            } else {
                chrome.cookies.set({
                    url: curTabUrl,
                    name: cookieName,
                    value: 'on',
                    path: "/"
                });
            }
            chrome.tabs.reload();
        });

    }
});