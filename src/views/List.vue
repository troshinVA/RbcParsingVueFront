<template>
    <div class="list-wrapper">
        <div class="header">
            <h1>Rbc News</h1>
            <span class="list-selector">News on page:
                <select class="form-select" @change="handleSelect($event)">
                    <option v-for="n in 10" :key="n" :selected="n === articlesOnPage">{{ n }}</option>
                </select>
            </span>
            <span class="list-selector">Interval update in seconds:
                <b-input class="form-input" @focusout="updateInterval($event)" :value=intervalUpdate />
            </span>
        </div>

        <InfiniteScroll :items="articles" @refetch="fetchLatest">
            <template v-slot:item="{ item }" >
                <article-card :article="item"></article-card>
            </template>
        </InfiniteScroll>
    </div>
</template>

<script>
import ArticleCard from "@/components/ArcticleCard";
import InfiniteScroll from "@/components/InfiniteScroll";

export default {
    name: 'List',
    components: {
        InfiniteScroll,
        ArticleCard,
    },
    data() {
        return {
            articlesOnPage: 5,
            intervalUpdate: 30,
            setInterval: null
        }
    },
    computed: {
        articles() {
            return this.$store.getters.getArticles;
        },
    },
    methods: {
        fetchLatest() {
            if (this.$store.state.isLastPage) {
                return;
            }

            this.$store.dispatch('fetchLaterArticles', {itemsOnPage: this.articlesOnPage});
        },
        handleSelect(event) {
            this.articlesOnPage = event.target.value;
            if (this.articlesOnPage <= this.articles.length) {
                this.$store.getters.getArticlesOnPage(this.articlesOnPage);
            } else {
                this.$store.dispatch('fetchLaterArticles', {itemsOnPage: this.articlesOnPage - this.articles.length});
            }
        },
        updateInterval(event) {
            this.intervalUpdate = event.target.value;
            this.updateByInterval();
        },
        updateByInterval() {
            clearInterval(this.setInterval)
            this.setInterval = setInterval(() => {
                this.$store.dispatch('fetchNewArticles')
            }, this.intervalUpdate * 1000)
        },
    },
    created() {
        this.fetchLatest();
        this.updateByInterval();
    },
    beforeDestroy () {
        clearInterval(this.setInterval)
    },
}
</script>
