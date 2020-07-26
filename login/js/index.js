$(document).ready(function() {
    $('select').material_select();
});
const passwordDom = document.querySelector("#password");
const passwordLabel = passwordDom.nextElementSibling;
//passwordDom.setAttribute("class", "invalid");
//passwordLabel.dataset.error = "用户不存在";
const userNameDom = document.querySelector("#userName");
const userNameLabel = userNameDom.nextElementSibling;
const clubDom = $("#club option:selected");
const submit = () => {
    
    axios.post(getUrl(`/login/check`), {
        club: clubDom.text(),
        name: userNameDom.value,
        password: passwordDom.value
      })
        .then(function (response) {
            if (response.status != 200) {
                alert("服务器出错");
                return;
            }
            const data = response.json();
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
            } else {
                switch (data.errorMessage) {
                    case 0:
                        passwordDom.classList.remove("invalid");
                        userNameDom.setAttribute("class", "invalid");
                        userNameLabel.dataset.error = "用户不存在";
                        break;
                    case 1:
                        userNameDom.classList.remove("invalid");
                        passwordDom.setAttribute("class", "invalid");
                        passwordLabel.dataset.error = "密码错误";
                    default:
                        alert("后端返回数据出错");
                        break;
                }
            }
      })
        .catch(function (error) {
            alert("服务器连接失败！");
        console.log(error);
      });
}

document.querySelector("#submit-btn").addEventListener("click", submit);


