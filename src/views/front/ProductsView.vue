<template>
    這是產品列表頁面
    <table class="table">
        <tbody>
            <tr v-for="p in products" :key="p.id">
                <td>{{  p.title }}</td>
                <td><img :src="p.imageUrl" style="width: 200px;" /></td>
                <td>
                    <RouterLink :to="`/product/${p.id}`" class="btn btn-outline-secondary me-3">產品細節</RouterLink>
                    <div class="btn btn-outline-success" @click="addToCart(p.id)">加入購物車</div>
                </td>

            </tr>
        </tbody>
    </table>
</template>
<!-- 01:18:00 -->
<script>
import { RouterLink } from 'vue-router';
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
    data() {
        return {
            products: []
        }
    },
    components: {
        RouterLink
    },
    methods: {
        getProducts() {
            this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`).then(resp=>{
                this.products = resp.data.products
            })
        },
        addToCart(product_id) {
            const data = {
                product_id,
                qty: 1
            }
            this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, {data}).then(()=>{
                alert('成功加入購物車!')
            })
        }
    },
    mounted() {
        this.getProducts()
    },
}
</script>