<template>
    <div class="d-flex justify-content-center">
        <form id="form" class="form-signin w-50">
            <h3 class="mb-8">會員登入</h3>
            <div class="form-floating mb-7">
                <input v-model="user.username" type="email" class="form-control" id="username"
                    placeholder="name@example.com" required autofocus>
                <label for="username">Email address</label>
            </div>
            <div class="form-floating mb-7">
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password"
                    required>
                <label for="password">Password</label>
            </div>
            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-success" type="button" @click="login">登入</button>
            </div>
        </form>
    </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$http.post(`${VITE_APP_URL}v2/admin/signin`, this.user).then(resp => {
                const { token, expired } = resp.data;
                console.log('token',token, expired)
                // 將回傳的token傳入cookie
                document.cookie = `hexToken = ${token};expires=${new Date(expired)};path=/`;
                // window.location = 'product-back.html'
                this.$router.push('/admin/products')
            }).catch(err => {
                alert(err.response.data.message);
            })
        }
    }
}
</script>