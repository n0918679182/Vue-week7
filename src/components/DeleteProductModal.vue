<template>
    <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct(tempProduct, delProductModal)">
                確認刪除
            </button>
        </div>
    </div>
</template>

<script>
import backProductsStore from "../stores/backProductsStore";
import { mapState, mapActions } from "pinia";
export default {
    props: ['tempProduct', 'isNew', 'delProductModal'],
    methods: {
        ...mapActions(backProductsStore, ['delProduct'])
    },
}
</script>