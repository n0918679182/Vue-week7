<template>
    <div>
        <nav aria-label="Page navigation example">
            <!-- {{ page }} 所以直接在畫面印出 page 最方便快速-->
            <ul class="pagination">
                <!-- 判斷若無前一頁(後端回傳boolean) 則加上 disabled -->
                <li class="page-item" :class="{ disabled: !pages.has_pre }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pages.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <!-- 判斷當前頁面是否等於頁號 是的話加上 active -->
                <li class="page-item" :class="{ active: page === pages.current_page }" v-for="page in pages.total_pages"
                    :key="page + 'page'">
                    <!-- 4. 呼叫 getData 並帶入參數 -->
                    <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
                </li>
                <!-- 判斷若無前一頁(後端回傳boolean) 則加上 disabled -->
                <li class="page-item" :class="{ disabled: !pages.has_next }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pages.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import backProductsStore from "../stores/backProductsStore";
import { mapState, mapActions } from "pinia";

export default {
    computed: {
        ...mapState(backProductsStore, ['products', 'pages'])
    },
    methods: {
        ...mapActions(backProductsStore, ['getProducts'])
    },
}
</script>