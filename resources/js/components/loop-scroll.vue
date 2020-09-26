<template>
<div class="row" v-if="state">
    <div class="col-xs-12 col-md-4 col-lg-4" v-for="hit in state.hits" :key="hit.objectID">
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
    mixins: [createWidgetMixin({
        connector: connectInfiniteHits
    })],
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
