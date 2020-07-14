$(document).ready(function() {
    $('select').material_select();
});
var passwordDom = document.querySelector("#password");
var passwordLabel = passwordDom.nextElementSibling;
//passwordDom.setAttribute("class", "invalid");
//passwordLabel.dataset.error = "用户不存在";