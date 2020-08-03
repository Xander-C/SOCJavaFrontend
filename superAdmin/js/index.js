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
const postData = (dom, url, data, confirmTitle, confirmContent) => {
    if (!check(dom)) return;
    $('#loading').modal('open');
    axios.post(getUrl(url), data)
        .then((response) => {
            $('#loading').modal('close');
            console.log(response);
            if (response.status != 200) {
                window.location = "/login.html";
                return;
            }
            if (response.data) {
                $('#confirm-title').html(confirmTitle);
                $('#confirm-content').html(confirmContent);
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
    let dom = document.querySelector("#add-input");
    postData(dom, "/community/add", {
        username: dom.value,
        password: "12345678"
    }, "添加成功", `已添加用户${dom.value}，默认登录密码为：12345678。`);
});
document.querySelector("#undo-btn").addEventListener("click", () => {
    let dom = document.querySelector("#undo-input");
    postData(dom, "/community/undo", {
        id: dom.value
    }, "找回成功", `已找回社团:${dom.value}(id)。`);
});
document.querySelector("#reset-btn").addEventListener("click", () => {
    let dom = document.querySelector("#reset-input");
    postData(dom, "/resetPwd", {
        id: dom.value,
        newPwd: 12345678,
        type: 0
    }, "重置成功", `已将社团:${dom.value}(id)密码重置为12345678。`);
});
document.querySelector("#delete-btn").addEventListener("click", () => {
    let dom = document.querySelector("#delete-input");
    postData(dom, "/community/delete", {
        id: dom.value
    }, "删除成功", `已删除社团:${dom.value}(id)。`);
});
document.querySelector("#delete-confirm-btn").addEventListener("click", () => {
    let dom = document.querySelector("#delete-input");
    if (!check(dom)) return;
    document.querySelector("#delete-confirm-content").innerHTML = `确认删除id为${dom.value}的社团？`;
    $("#delete-confirm").modal("open");
})