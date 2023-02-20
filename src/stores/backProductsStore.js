import { defineStore } from "pinia";
import axios from "axios";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore('backProductsStore', {
    state: () => ({
        products: [],
        pages: {},
    }),
    actions: {
        getProducts(page = 1) {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = token;
            axios.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/products?page=${page}`).then(resp => {
                const { products, pagination } = resp.data;
                this.products = products;
                this.pages = pagination;
            })
        },
        updateProduct(isNew, tempProduct, productModal) {
            let url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/product`;
            let http = 'post';

            if (!isNew) {
                url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/product/${tempProduct.id}`;
                http = 'put'
            }

            axios[http](url, { data: tempProduct }).then((response) => {
                alert(response.data.message);
                productModal.hide();
                this.getProducts();
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        delProduct(tempProduct, delProductModal) {
            const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/product/${tempProduct.id}`;

            axios.delete(url).then((response) => {
                alert(response.data.message);
                delProductModal.hide();
                this.getProducts();
            }).catch((err) => {
                alert(err.response.data.message);
            })
        }
    }

})