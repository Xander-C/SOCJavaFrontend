Vue.component('club-item', {
    props: ['name', 'logo', 'intro', 'username'],
    template: '<tr class="row"><td class="col l2 m2">{{ name }}</td><td class="col l2 m2">{{ username }}</td><td class="col l1 m1"><img :src=logo style="height: 18px;"></td><td class="col l5 m4">{{ intro }}</td><td class="col l2 m3"><a class="reset-pwd">重置密码</a><a>删除社团</a></td></tr>'
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
const usernameDom = document.querySelector("#add-input");
const usernameLabel = usernameDom.nextElementSibling;
const clubIdDom = document.querySelector("#undo-input");
const clubIdLabel = clubIdDom.nextElementSibling;
const check = (dom) => {
    let label = dom.nextElementSibling;
    dom.classList.remove("invalid");
    if (dom.value == 0) {
        label.dataset.error = `${label.innerHTML}不能为空`;
        dom.classList.add("invalid");
        label.classList.add("active");
        return false;
    }
    return true;
}
document.querySelectorAll("input").forEach(element => {
    element.addEventListener("click", () => {
        element.classList.remove("invalid");
    })
});
const unknowError = () => {
    $('#confirm-title').html("未知错误");
    $('#confirm-content').html(`请联系管理员`);
    $('#confirm').modal('open');
}

const addClub = () => {
    let dom = document.querySelector("#add-input");
    if (!check(dom)) return;
    $('#loading').modal('open');
    axios.post(getUrl(`/community/add`), {
            username: dom.value,
            password: "12345678"
        })
        .then((response) => {
            $('#loading').modal('close');
            console.log(response);
            if (response.status != 200) {
                window.location = "/login.html";
                return;
            }
            if (response.data) {
                $('#confirm-title').html("添加成功");
                $('#confirm-content').html(`已添加用户${dom.value}，默认登录密码为：12345678`);
                $('#confirm').modal('open');
                dom.value = null;
                dom.nextElementSibling.classList.remove("active");
            } else {
                console.log(response);
                unknowError();
            }
        })
        .catch((error) => {
            $('#loading').modal('close');
            console.log(error);
            unknowError();
        })
}

const undoClub = () => {
    let dom = document.querySelector("#undo-input");
    if (!check(dom)) return;
    $('#loading').modal('open');
    axios.post(getUrl(`/community/undo`), {
            id: dom.value
        })
        .then((response) => {
            $('#loading').modal('close');
            console.log(response);
            if (response.status != 200) {
                window.location = "/login.html";
                return;
            }
            if (response.data) {
                $('#confirm-title').html("找回成功");
                $('#confirm-content').html(`已找回社团${dom.value}`);
                $('#confirm').modal('open');
                dom.value = null;
                dom.nextElementSibling.classList.remove("active");
            } else {
                console.log(response);
                unknowError();
            }
        })
        .catch((error) => {
            $('#loading').modal('close');
            console.log(error);
            unknowError();
        })
}
document.querySelector("#add-btn").addEventListener("click", () => {
    addClub();
});
document.querySelector("#undo-btn").addEventListener("click", () => {
    undoClub();
});