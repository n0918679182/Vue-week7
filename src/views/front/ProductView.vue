<template>
    這是單一產品頁面
    <div class="w-50">
        <h2>{{ product.title }}</h2>
        <img :src="product.imageUrl" class="img-fluid" alt="">
    </div>
</template>

<script>
    const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
    export default {
        data() {
            return {
                product: {}
            }
        },
        methods: {
            getProduct() {
                const {id} = this.$route.params;
                this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`).then(resp=>{
                    console.log(resp.data.product)
                    this.product = resp.data.product
                })
            }
        },
        mounted() {
            this.getProduct();
        },
    }
</script>