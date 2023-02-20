<template>
    <div class="text-end">
        <button class="btn btn-outline-danger" type="button" :disabled="loadingItem === 'deleteAll'"
            @click="deleteAll">清空購物車</button>
    </div>
    <table class="table align-middle">
        <thead>
            <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th class="text-end">單價</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                    <td>
                        <button type="button" class="btn btn-outline-danger btn-sm" style="width: 35px;"
                            :disabled="loadingItem === item.id" @click.prevent="deleteItem(item)">
                            <i v-if="loadingItem === item.id" class="fas fa-spinner fa-pulse"></i>
                            <span v-else>x</span>
                        </button>
                    </td>
                    <td>
                        {{ item.product.title }}
                    </td>
                    <td>
                        <div class="input-group input-group-sm">
                            <select name="" id="" class="form-control" v-model="item.qty"
                                :disabled="loadingItem === item.id" @change="updateCartItem(item)">
                                <!-- 當axios還未完成的時候 會disabled -->
                                <option :value="i" v-for="i in 20" :key="i + '1235'">{{ i }}</option>
                            </select>
                        </div>
                    </td>
                    <td class="text-end">
                        {{ item.total }}
                    </td>
                </tr>
            </template>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ cart.total }}</td>
            </tr>
            <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ cart.final_total }}</td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
    data() {
        return {
            products: [],
            productId: '',
            cart: [],
            loadingItem: '', // 存ID
            data: {
                user: {
                    name: "",
                    email: "",
                    tel: "",
                    address: ""
                },
                message: ""
            },
            loadingItem: false
        }
    },
    methods: {
        getCarts() {
            this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`).then(resp => {
                this.cart = resp.data.data
                console.log(this.cart)
            }).catch(err => alert(err.response.data.message));
        },
        updateCartItem(item) {
            const data = {
                product_id: item.product.id,
                qty: item.qty
            };
            this.loadingItem = item.id; // 當剛觸發時 儲存id
            this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data }).then(resp => {
                this.getCarts();
                this.loadingItem = '';  // 待更新完成之後 清空id 以此做為判斷loading的依據
            }).catch(err => alert(err.response.data.message));
        },
        deleteItem(item) {
            this.loadingItem = item.id;
            this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`).then(resp => {
                this.getCarts();
                this.loadingItem = '';
            }).catch(err => alert(err.response.data.message));
        },
        deleteAll() {
            this.loadingItem = true;
            this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`).then(resp => {
                this.getCarts();
                this.loadingItem = false;
            }).catch(err=>alert(err.response.data.message));
        }
    },
    mounted() {
        this.getCarts();
    },
}
</script>