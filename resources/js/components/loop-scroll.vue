<template>
<div class="flex flex-wrap -m-4" v-if="state">
    <div class="p-3 md:w-1/3" v-for="hit in state.hits" :key="hit.objectID">
        <slot name="item" :item="hit"> </slot>
    </div>
    <div class="sentinel" v-observe-visibility="visibilityChanged"></div>
</div>
</template>

<script>
import {
    createWidgetMixin
} from "vue-instantsearch";
import {
    connectInfiniteHits
} from "instantsearch.js/es/connectors";
export default {
    mixins: [
        createWidgetMixin({
            connector: connectInfiniteHits,
        }),
    ],
    methods: {
        visibilityChanged(isVisible) {
            if (isVisible && !this.state.isLastPage) {
                this.state.showMore();
            }
        },
    },
};
</script>

<style scoped>
.sentinel {
    list-style-type: none;
}
</style>
