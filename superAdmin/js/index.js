Vue.component('club-item', {
    props: ['name', 'logo', 'intro', 'username'],
    template: '<tr class="row"><td class="col l2">{{ name }}</td><td class="col l2">{{ username }}</td><td class="col l1"><img :src=logo style="height: 18px;"></td><td class="col l5">{{ intro }}</td><td class="col l2"><a>重置密码</a></td></tr>'
});
let data;
axios.get(getUrl(`/community/list`))
    .then((response) => {
        console.log(response);
        if (response.status != 200) {
            window.location = "/login.html";
            return;
        }
        data = response.data;
        new Vue({
            el: '#display',
            data: {
                clubs: data
            }
        });
    })
    .catch((error) => {
        console.log(error);
    })

    
$(document).ready(() => {
    $('.modal').modal();
});
const usernameDom = document.querySelector("#username");
const usernameLabel = usernameDom.nextElementSibling;
const clubIdDom = document.querySelector("#club-id");
const clubIdLabel = clubIdDom.nextElementSibling;
const checkUsername = () => {
    usernameDom.classList.remove("invalid");
    if (usernameDom.value == 0) {
        usernameLabel.dataset.error = "用户名不能为空";
        usernameDom.classList.add("invalid");
        usernameLabel.classList.add("active");
        return false;
    }
    return true;
}
const checkClubId = () => {
    clubIdDom.classList.remove("invalid");
    if (clubIdDom.value == 0) {
        clubIdLabel.dataset.error = "社团id不能为空";
        clubIdDom.classList.add("invalid");
        clubIdLabel.classList.add("active");
        return false;
    }
    return true;
}
clubIdDom.addEventListener("click", () => {
    clubIdDom.classList.remove("invalid");
});
usernameDom.addEventListener("click", () => {
    usernameDom.classList.remove("invalid");
})

const addClub = () => {
    if (!checkUsername()) return;
    $('#loading').modal('open');
    axios.post(getUrl(`/community/add`), {
            username: usernameDom.value,
            password: "12345678"
        })
        .then((response) => {
            console.log(response);
            if (response.status != 200) {
                window.location = "/login.html";
                return;
            }
            if (response.data) {
                $('#loading').modal('close');
                $('#confirm-title').html("添加成功");
                $('#confirm-content').html(`已添加用户${usernameDom.value}，默认登录密码为：12345678`);
                $('#confirm').modal('open');
                usernameDom.value = null;
                usernameLabel.classList.remove("active");
            } else {
                $('#loading').modal('close');
                $('#confirm-title').html("未知错误");
                $('#confirm-content').html(`请联系管理员`);
                $('#confirm').modal('open');
            }
        })
        .catch((error) => {
            console.log(error);
            $('#loading').modal('close');
            $('#confirm-title').html("未知错误");
            $('#confirm-content').html(`请联系管理员`);
            $('#confirm').modal('open');
        })
}

const undoClub = () => {
    if (!checkClubId()) return;
    $('#loading').modal('open');
    axios.post(getUrl(`/community/undo`), {
            id: clubIdDom.value
        })
        .then((response) => {
            console.log(response);
            if (response.status != 200) {
                window.location = "/login.html";
                return;
            }
            if (response.data) {
                $('#loading').modal('close');
                $('#confirm-title').html("找回成功");
                $('#confirm-content').html(`已找回社团${clubIdDom.value}`);
                $('#confirm').modal('open');
                clubIdDom.value = null;
                clubIdLabel.classList.remove("active");
            } else {
                $('#loading').modal('close');
                $('#confirm-title').html("未知错误");
                $('#confirm-content').html(`请联系管理员`);
                $('#confirm').modal('open');
            }
        })
        .catch((error) => {
            console.log(error);
            $('#loading').modal('close');
            $('#confirm-title').html("未知错误");
            $('#confirm-content').html(`请联系管理员`);
            $('#confirm').modal('open');
        })
}
document.querySelector("#add-club-btn").addEventListener("click", () => {
    addClub();
});
document.querySelector("#undo-club-btn").addEventListener("click", () => {
    undoClub();
});