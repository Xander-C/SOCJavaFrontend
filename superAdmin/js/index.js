Vue.component('club-item', {
    props: ['name', 'logo', 'intro'],
    template: '<tr class="row"><td class="col l2">{{ name }}</td><td class="col l1"><img :src=logo style="height: 18px;"></td><td class="col l7">{{ intro }}</td><td class="col l2"><a>重置密码</a></td></tr>'
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
            el: '#m-excel',
            data: {
                clubs: data
            }
        });
    })
    .catch((error) => {
        console.log(error);
    })