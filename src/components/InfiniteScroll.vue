<template>
    <div>
        <ul v-for="item in items" :key="item.id" class="list-group">
            <slot name="item" v-bind:item="item"></slot>
        </ul>

        <div v-if="items.length" v-observe-visibility="handleScrollToBottom">
            <span v-if="$store.state.isLastPage">That's all!</span>
            <span v-else>Loading... </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfiniteScroll",
    props: {
        items: {
            required: true,
            type: Array
        }
    },
    methods: {
        handleScrollToBottom(isVisible) {
            console.log(this.$store.state.isLastPage);
            if (!isVisible) {
                return
            }

            this.$emit('refetch');
        },
    },
}
</script>

<style scoped>

</style>