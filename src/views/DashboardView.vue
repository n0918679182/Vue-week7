<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">微風廣場</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/products">產品</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/orders">訂單</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" @click.prevent="logout">登出</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
    <div class="container mt-20">
        <RouterView></RouterView>
    </div>
</template>
<script>
import { RouterView } from 'vue-router';
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
    components: {
        RouterView
    },
    methods: {
        logout() {
            document.cookie = `hexToken =;expires=${new Date()};`;
            this.$router.push('/login')
        },
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            this.$http.defaults.headers.common.Authorization = token;

            this.$http.post(`${VITE_APP_URL}/v2/api/user/check`).then((resp) => {
                if (!resp.data.success) {
                    alert('請先登入')
                    this.$router.push('/login')
                }
            })
                .catch((err) => {
                    alert(err.response.data.message)
                    this.$router.push('/login')
                })
        }
    },
    mounted() {
        this.checkLogin()
    },
}
</script>