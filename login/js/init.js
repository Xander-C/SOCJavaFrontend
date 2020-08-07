$(document).ready(() => {
    $('.modal').modal();
});
let map = new Map();
axios.get(getUrl(`/login/list`)).then((response) => {
    if (response.status != 200) {
        alert("服务器出错");
        return;
    }
    response.data.forEach(element => {
        console.log(element);
        map.set(element.name, element.id);
        console.log(element);
        let option = document.createElement("option");
        option.setAttribute("class", "left circle");
        option.dataset.icon = element.logo;
        let textNode = document.createTextNode(element.name);
        option.appendChild(textNode);
        document.querySelector("#club").insertBefore(option, document.querySelector("#admin-option"));
        console.log("append:", option);
    });
    console.log(map);
}).catch((error) => {
    $('#confirm-title').html("加载失败");
    $('#confirm-content').html("无法连接后端服务器，请联系管理员。");
    $('#confirm').modal('open');
    console.log(error);
    document.querySelector("#confirm-btn").addEventListener("click", () => {
        location.reload();
    })
});