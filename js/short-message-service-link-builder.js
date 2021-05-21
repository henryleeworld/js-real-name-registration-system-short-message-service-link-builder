$(function() {
    $('#generate_btn').click(function() {
        var code = checkCode($("#code").val());
        if (code) {
            showLink(code);
        }
    });
});

const checkCode = function(code) {
    var code = $.trim(code);
    if (code.length == 0) {
        alert('請填寫場所代碼。');
        $('.card-footer').addClass('d-none');
        return false;
    }
    return code;
}
const showLink = function(code) {
    var message = encodeURIComponent('場所代碼：' + code + '\n' + '本次簡訊實聯限防疫目的使用。');
    var parser = new UAParser();
    $('.card-footer').removeClass('d-none');
    if (parser.getOS().name.toLowerCase() == 'ios') {
        $('a#ios_link').prop('href', 'sms:1922&body=' + message);
        $('a#ios_link').removeClass('d-none');
        $('a#android_link').addClass('d-none');
    } else {
        $('a#android_link').prop('href', 'sms:1922?body=' + message);
        $('a#ios_link').addClass('d-none');
        $('a#android_link').removeClass('d-none');
    }
}