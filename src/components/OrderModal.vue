<template>
    <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
                <span>詳細資訊</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-4">
                    <h4>用戶資訊</h4>
                    <table class="table">
                        <tbody v-if="tempOrder.user">
                            <tr>
                                <th style="width: 100px">姓名</th>
                                <td>{{ tempOrder.user.name }}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{{ tempOrder.user.email }}</td>
                            </tr>
                            <tr>
                                <th>電話</th>
                                <td>{{ tempOrder.user.tel }}</td>
                            </tr>
                            <tr>
                                <th>地址</th>
                                <td>{{ tempOrder.user.address }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-8">
                    <h4>訂單細節</h4>
                    <table class="table">
                        <tbody>
                            <tr>
                                <th style="width: 100px">訂單編號</th>
                                <td>{{ tempOrder.id }}</td>
                            </tr>
                            <tr>
                                <th>下單時間</th>
                                <td>{{ dateFormate(tempOrder.create_at) }}</td>
                            </tr>
                            <tr>
                                <th>付款時間</th>
                                <td>
                                    <span v-if="tempOrder.paid_date">
                                        {{ dateFormate(tempOrder.paid_date) }}
                                    </span>
                                    <span v-else-if="!tempOrder.paid_date"></span>
                                    <span v-else>時間不正確</span>
                                </td>
                            </tr>
                            <tr>
                                <th>付款狀態</th>
                                <td>
                                    <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                                    <span v-else class="text-muted">尚未付款</span>
                                </td>
                            </tr>
                            <tr>
                                <th>總金額</th>
                                <td>
                                    $NT {{ currency(tempOrder.total) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>選購商品</h3>
                    <table class="table">
                        <thead>
                            <tr></tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tempOrder.products" :key="item.id">
                                <th>
                                    {{ item.product.title }}
                                </th>
                                <td>{{ item.qty }} / {{ item.product.unit }}</td>
                                <td class="text-end">
                                    $NT {{ currency(item.final_total) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                v-model="tempOrder.is_paid" />
                            <label class="form-check-label" for="flexCheckDefault">
                                <span v-if="tempOrder.is_paid">已付款</span>
                                <span v-else>未付款</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-success" @click="isPaidChange(tempOrder)">
                修改付款狀態
            </button>
        </div>
    </div>
</template>

<script>
import backOrdersStore from "../stores/backOrdersStore";
import { mapActions } from "pinia";

export default {
    props: ['tempOrder'],
    methods: {
        ...mapActions(backOrdersStore, ['dateFormate', 'currency', 'isPaidChange'])
    },
}
</script>