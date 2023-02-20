<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">購買時間</th>
                <th scope="col">Email</th>
                <th scope="col">購買款項</th>
                <th scope="col">應付金額</th>
                <th scope="col">是否付款</th>
                <th scope="col">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="o in orders" :key="o.id">
                <td>{{ dateFormate(o.create_at) }}</td>
                <td>{{ o.user.email }}</td>
                <td>{{ combineProducts(o.products) }}</td>
                <td>{{ o.total }}</td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            @change="isPaidChange(o)" v-model="o.is_paid">
                        <label class="form-check-label" for="flexSwitchCheckDefault">{{ o.is_paid ? '已付款' : '未付款' }}</label>
                    </div>
                </td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-success btn-sm" @click="openModal('edit', o)">
                            編輯
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', o)">
                            刪除
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="Page navigation example">
        <!-- {{ page }} 所以直接在畫面印出 page 最方便快速-->
        <ul class="pagination">
            <!-- 判斷若無前一頁(後端回傳boolean) 則加上 disabled -->
            <li class="page-item" :class="{ disabled: !pages.has_pre }">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getOrders(pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <!-- 判斷當前頁面是否等於頁號 是的話加上 active -->
            <li class="page-item" :class="{ active: page === pages.current_page }" v-for="page in pages.total_pages"
                :key="page + 'page'">
                <!-- 4. 呼叫 getData 並帶入參數 -->
                <a class="page-link" href="#" @click.prevent="getOrders(page)">{{ page }}</a>
            </li>
            <!-- 判斷若無前一頁(後端回傳boolean) 則加上 disabled -->
            <li class="page-item" :class="{ disabled: !pages.has_next }">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getOrders(pages.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
    <!-- 編輯 Modal -->
    <div id="orderModal" ref="orderModal" class="modal fade" tabindex="-1" aria-labelledby="orderModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <OrderModal :temp-order="tempOrder"></OrderModal>
        </div>
    </div>
    <!-- 刪除 Modal -->
    <div id="delOrderModal" ref="delOrderModal" class="modal fade" tabindex="-1" aria-labelledby="delOrderModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <!-- <deletemodal :temp-product="tempProduct" @del-product="delProduct"></deletemodal> -->
            <DelOrderModal :temp-order="tempOrder" :del-order-modal="delOrderModal"></DelOrderModal>
        </div>
    </div>
</template>

<script>
import OrderModal from '../../components/OrderModal.vue'
import DelOrderModal from '@/components/DelOrderModal.vue'
import backOrdersStore from "../../stores/backOrdersStore";
import { mapState, mapActions } from "pinia";
import { Modal } from 'bootstrap'

export default {
    data() {
        return {
            orderModal: null,
            delOrderModal: null,
            isNew: false,
            tempOrder: {}
        }
    },
    computed: {
        ...mapState(backOrdersStore, ['orders', 'pages'])
    },
    methods: {
        ...mapActions(backOrdersStore, ['getOrders', 'dateFormate', 'combineProducts', 'isPaidChange']),
        openModal(isNew, item) {
            if (isNew === 'edit') {
                this.tempOrder = { ...item };
                this.isNew = false;
                this.orderModal.show();
            } else if (isNew === 'delete') {
                this.tempOrder = { ...item };
                this.delOrderModal.show()
            }
        },
    },
    components: {
        OrderModal,
        DelOrderModal
    },
    mounted() {
        this.getOrders();
        this.orderModal = new Modal('#orderModal');
        this.delOrderModal = new Modal('#delOrderModal');
    },
}
</script>