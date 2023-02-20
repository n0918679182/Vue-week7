<template>
    <div class="container">
        <div class="text-end mt-4">
            <button class="btn btn-primary" @click="openModal('new')">
                建立新的產品
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">
                        分類
                    </th>
                    <th>產品名稱</th>
                    <th width="120">
                        原價
                    </th>
                    <th width="120">
                        售價
                    </th>
                    <th width="100">
                        是否啟用
                    </th>
                    <th width="120">
                        編輯
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td class="text-end">
                        {{ item.origin_price }}
                    </td>
                    <td class="text-end">
                        {{ item.price }}
                    </td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                                編輯
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <PaginationBtn></PaginationBtn>
    </div>
    <!-- 新增&編輯 Modal -->
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <ProductModal :temp-product="tempProduct" :is-new="isNew" :product-modal="productModal"
                @create-images="createImages"></ProductModal>
        </div>
    </div>
    <!-- 刪除 Modal -->
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <DeleteProductModal :temp-product="tempProduct" :del-product-modal="delProductModal"></DeleteProductModal>
        </div>
    </div>
</template>

<script>
import PaginationBtn from '../../components/PaginationBtn.vue';
import ProductModal from '../../components/ProductModal.vue';
import DeleteProductModal from '../../components/DeleteProductModal.vue';
import backProductsStore from '../../stores/backProductsStore';
import { mapState, mapActions } from "pinia";
import { Modal } from 'bootstrap'

export default {
    data() {
        return {
            productModal: null,
            delProductModal: null,
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            }
        }
    },
    computed: {
        ...mapState(backProductsStore, ['products', 'pages'])
    },
    methods: {
        ...mapActions(backProductsStore, ['getProducts', 'delProduct']),
        openModal(isNew, item) {
            if (isNew === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                this.productModal.show();
            } else if (isNew === 'edit') {
                this.tempProduct = { ...item };
                this.isNew = false;
                this.productModal.show();
            } else if (isNew === 'delete') {
                this.tempProduct = { ...item };
                this.delProductModal.show()
            }
        },
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
    },
    mounted() {
        this.getProducts();
        this.productModal = new Modal('#productModal');
        this.delProductModal = new Modal('#delProductModal');
    },
    components: {
        PaginationBtn,
        ProductModal,
        DeleteProductModal
    }
}
</script>