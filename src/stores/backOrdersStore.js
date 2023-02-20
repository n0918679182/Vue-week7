import { defineStore } from "pinia";
import axios from "axios";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore('backOrdersStore', {
    state: () => ({
        orders: [],
        pages: {},
        tempOrder: {}
    }),
    actions: {
        async getOrders(page = 1) {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = token;
            await axios.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/orders?page=${page}`).then(resp => {
                const { orders, pagination } = resp.data;
                this.orders = orders;
                this.pages = pagination;
            }).catch(err => alert(err.response.data.message));
        },
        dateFormate(d) {
            const dTime = new Date(d);
            return `${dTime.getFullYear()}/${dTime.getMonth() + 1}/${dTime.getDate()}`
        },
        combineProducts(products) {
            let temp = '';
            const pKeys = Object.keys(products)
            let product;
            if (pKeys.length > 1) {
                pKeys.forEach(k => {
                    product = products[k].product;
                    temp += ` ${product.title} 數量 ${product.num} 個 /`
                })
            } else {
                pKeys.forEach(k => {
                    product = products[k].product;
                    temp += `${product.title} 數量 ${product.num} 個`
                })
            }
            if (temp.length > 20) {
                return temp.substring(0, 20) + '...'
            } else {
                return temp
            }
        },
        isPaidChange(order) {
            let data = order;
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = token;
            if(data.is_paid){
                data.paid_date = new Date().getTime();
            } else if (!data.is_paid) {
                data.paid_date = '';
            }
            axios.put(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/order/${order.id}`, { data }).then(()=>{
                this.getOrders();
                alert('修改成功!')
            }).catch(err => alert(err.response.data.message));
        },
        currency(num) {
            const n = parseInt(num, 10);
            return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
        },
        delOrder(o, delOrderModal) {
            axios.delete(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/order/${o.id}`).then(()=>{
                this.getOrders();
                alert('訂單已刪除!')
                delOrderModal.hide();
            }).catch(err => alert(err.response.data.message));
        }
    }
})