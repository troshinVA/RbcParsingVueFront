<template>
    <div class="list-wrapper">
        <h1>Rbc News</h1>
        <span class="list-selector">News on page:
            <select class="form-select" @change="handleSelect($event)">
                <option v-for="n in 10" :key="n" :selected="n === articlesOnPage">{{ n }}</option>
            </select>
        </span>
        <ul v-if="articles.length" class="list-group">
            <article-card v-for="article in articles"
                          :key="article.id"
                          :article="article"></article-card>
        </ul>

        <div v-if="articles.length" v-observe-visibility="handleScrollToBottom">
        </div>
    </div>
</template>

<script>
import ArticleCard from "@/components/ArcticleCard";

export default {
    name: 'List',
    components: {
        ArticleCard,
    },
    data() {
        return {
            articlesOnPage: 5,
            intervalUpdate: 100
        }
    },
    computed: {
        articles() {
            return this.$store.getters.getArticles;
        },
    },
    methods: {
        handleScrollToBottom(isVisible) {
            if (!isVisible) {
                return
            }

            this.currentPage++;
            this.$store.dispatch('fetchLaterArticles', {itemsOnPage: this.articlesOnPage});
        },
        handleSelect(event) {
            this.articlesOnPage = event.target.value;
        },
    },
    created() {
        this.$store.dispatch('fetchLaterArticles', {page: this.currentPage, itemsOnPage: this.articlesOnPage});
    },
    mounted() {
        setInterval(this.$store.dispatch('fetchNewArticles', {
            page: this.currentPage,
            itemsOnPage: this.articlesOnPage
        }), this.intervalUpdate);
    }
}
</script>
