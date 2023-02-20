<template>
    <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除訂單</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            是否刪除訂單？ (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-danger" @click="delOrder(tempOrder, delOrderModal)">
                確認刪除
            </button>
        </div>
    </div>
</template>

<script>
import backOrdersStore from "../stores/backOrdersStore";
import { mapActions } from "pinia";

export default {
    props:['tempOrder','delOrderModal'],
    methods: {
        ...mapActions(backOrdersStore, ['delOrder'])
    },
}
</script>