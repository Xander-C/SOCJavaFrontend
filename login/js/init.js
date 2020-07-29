axios.get(getUrl(`/login/list`)).then((response) => {
    if (response.status != 200) {
        alert("服务器出错");
        return;
    }
    response.data.forEach(element => {
        console.log(element);
        let option = document.createElement("option");
        option.setAttribute("class", "left circle");
        option.dataset.icon = element.logo;
        let textNode = document.createTextNode(element.name);
        option.appendChild(textNode);
        document.querySelector("#club").insertBefore(option, document.querySelector("#admin-option"));
        console.log("append:", option);
    });
})