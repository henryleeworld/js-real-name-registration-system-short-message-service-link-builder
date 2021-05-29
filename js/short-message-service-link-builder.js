$(function() {
    $('.needs-validation').on('submit', function(e) {
        e.preventDefault();
        this.checkValidity();
        $(this).addClass('was-validated');
        var code = checkRequired($("#code").val(), '場所代碼');
        var message = checkRequired($("#message").val(), '簡訊內容');
        var accompanyingNumber = checkRequired($("#accompanying_number").val(), '同行人數');
        if (code && message && accompanyingNumber) {
            showLink(generateBody(code, message, accompanyingNumber));
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

const showLink = function(body) {
    var parser = new UAParser();
    $('.card-footer').removeClass('d-none');
    if (parser.getOS().name.toLowerCase() == 'ios') {
        $('a#ios_link').prop('href', 'sms:1922&body=' + body);
        $('a#ios_link').removeClass('d-none');
        $('a#android_link').addClass('d-none');
    } else {
        $('a#android_link').prop('href', 'sms:1922?body=' + body);
        $('a#ios_link').addClass('d-none');
        $('a#android_link').removeClass('d-none');
    }
}