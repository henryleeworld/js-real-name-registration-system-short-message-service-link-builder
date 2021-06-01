$(function() {
    $('.needs-validation').on('submit', function(e) {
        e.preventDefault();
        this.checkValidity();
        $(this).addClass('was-validated');
        var code = checkRequired($("#code").val(), '場所代碼');
        var message = checkRequired($("#message").val(), '簡訊內容');
        var accompanyingNumber = checkRequired($("#accompanying_number").val(), '同行人數');
        var generateType = checkRequired($("#generate_type").val(), '產生類型');
        if (code && message && accompanyingNumber && generateType) {
            $('.card-footer').removeClass('d-none');
            var HTMLLink = getHTMLLink(generateBody(code, message, accompanyingNumber));
            (generateType == 'qr_code') ? showQRCode(HTMLLink): showLink(HTMLLink);
            return true;
        }
        $('.card-footer').addClass('d-none');
    });
    $('#code').mask('0000 0000 0000 000');
});

const checkRequired = function(value, text) {
    var value = $.trim(value);
    if (value.length == 0) {
        alert('請填寫' + text + '。');
        return false;
    }
    return value;
}

const generateBody = function(code, message, accompanyingNumber) {
    var branchNumber = $.trim($("#branch_number").val());
    var content = '場所代碼：' + code;
    if (branchNumber.length > 0) {
        content += ' ' + branchNumber;
    }
    if (accompanyingNumber > 1) {
        content += '\n' + '+' + accompanyingNumber;
    }
    content += '\n' + message;
    return encodeURIComponent(content);
}

const getHTMLLink = function(body) {
    var parser = new UAParser();
    var HTMLlink;
    if (parser.getOS().name.toLowerCase() == 'ios') {
        HTMLlink = 'sms:1922&body=' + body;
        $('a#ios_link').removeClass('d-none');
        $('a#android_link').addClass('d-none');
    } else {
        HTMLlink = 'sms:1922?body=' + body;
        $('a#ios_link').addClass('d-none');
        $('a#android_link').removeClass('d-none');
    }
    return HTMLlink;
}

const showLink = function(HTMLLink) {
    $('a#ios_link').prop('href', HTMLLink);
    $('div#qr_code').addClass('d-none');
}

const showQRCode = function(HTMLLink) {
    $("div#qr_code canvas").remove();
    $('div#qr_code').qrcode({
        render: 'canvas',
        image: $("#cdc_icon")[0],
        mode: 4,
        mSize: 0.2,
        mPosX: 0.5,
        mPosY: 0.5,
        text: HTMLLink
    });
    $('div#qr_code').removeClass('d-none');
    $('a#ios_link').addClass('d-none');
    $('a#android_link').addClass('d-none');
}