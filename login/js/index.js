$(document).ready(function() {
    $('select').material_select();
    $('.modal').modal({
        dismissible: false,
        starting_top: '50%',
    });
});
const passwordDom = document.querySelector("#password");
const passwordLabel = passwordDom.nextElementSibling;
const userNameDom = document.querySelector("#userName");
const userNameLabel = userNameDom.nextElementSibling;
const clubDom = $("#club option:selected");
const check = () => {
    passwordDom.classList.remove("invalid");
    userNameDom.classList.remove("invalid");
    let temp = true;
    if (userNameDom.value == 0) {
        userNameLabel.dataset.error = "用户名不能为空";
        userNameDom.classList.add("invalid");
        userNameLabel.classList.add("active");
        temp = false;
    }
    if (passwordDom.value == 0) {
        passwordLabel.dataset.error = "密码不能为空";
        passwordDom.classList.add("invalid");
        passwordLabel.classList.add("active");
        temp = false;
    }
    return temp;
}
const submit = () => {
    if (!check()) {
        setTimeout(() => { $('#modal1').modal('close'); }, 500);
        return;
    }
    let club;
    try {
        club = document.querySelector(".select-dropdown li.selected span").innerHTML;
    } catch (e) {
        club = "超级管理员";
    }
    console.log(map.get(club) || 1, userNameDom.value, passwordDom.value);
    axios.post(getUrl(`/login/check`), {
        club: map.get(club) || 1 ,
        name: userNameDom.value,
        password: passwordDom.value
      })
        .then((response)=> {
            if (response.status != 200) {
                alert("服务器出错");
                return;
            }
            const data = response.data;
            if (data.result == 0) {
                switch (data.sucMessage) {
                    case 1:
                        window.location = '/member.html';
                        break;
                    case 2:
                        window.location = '/department.html';
                        break;
                    case 3:
                        window.location = '/club.html';
                        break;
                    case 4:
                        window.location = '/superAdmin.html';
                        break;
                    default:
                        alert("后端返回数据出错");
                        break;
                }
                $('#modal1').modal('close');
            } else {
                switch (data.errorMessage) {
                    case 0:
                        userNameDom.setAttribute("class", "invalid");
                        userNameLabel.dataset.error = "用户不存在";
                        break;
                    case 1:
                        passwordDom.setAttribute("class", "invalid");
                        passwordLabel.dataset.error = "密码错误";
                        break;
                    default:
                        alert("后端返回数据出错");
                        break;
                }
                $('#modal1').modal('close');
            }
      })
        .catch((error) => {
            alert("服务器连接失败！");
        console.log(error);
        $('#modal1').modal('close');
        });
}
document.querySelector("#submit-btn").addEventListener("click", submit);

passwordDom.addEventListener("click", () => {
    passwordDom.classList.remove("invalid");
});
userNameDom.addEventListener("click", () => {
    userNameDom.classList.remove("invalid");
})



