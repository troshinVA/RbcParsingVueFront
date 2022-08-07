<template>
    <div>
        <b-card
            :title=article.title
            class="mb-2"
            v-bind:class="{ 'rating-up': ratingUp, 'rating-down': ratingDown }"
        >
            <b-card-sub-title>{{ article.category }}, {{ article.time }}</b-card-sub-title>
            <b-card-text>
                {{ article.description }}
            </b-card-text>
            <div class="btn-group-custom">
                <b-button variant="outline-info" @click="handleMoreButton">
                    More
                </b-button>

                <div class="btn-group-vertical">
                    <b-button variant="outline-success" @click="handlePlusButton">+</b-button>
                        <span class="rating">{{ article.rating }}</span>
                    <b-button variant="outline-danger" @click="handleMinusButton">-</b-button>
                </div>

                <b-button variant="outline-danger" @click="handleDeleteButton">Delete</b-button>
            </div>
        </b-card>
    </div>
</template>
<script>
export default {
    name: 'article-card',
    props: {
        article: Object,
    },
    data() {
        return {
            ratingUp: false,
            ratingDown: false
        }
    },
    methods: {
        handleDeleteButton() {
            this.$store.dispatch('deleteArticleFromList', this.article.id);
        },
        handleMoreButton() {
            this.$router.push(`/article/${this.article.id}`);
        },
        handlePlusButton() {
            this.article.rating++;
            this.ratingUp = true;
            this.ratingDown = !this.ratingUp;

            this.$store.dispatch('updateArticleRating', {id: this.article.id, newRating: this.article.rating});
        },
        handleMinusButton() {
            this.article.rating--;
            this.ratingDown = true;
            this.ratingUp = !this.ratingDown;

            this.$store.dispatch('updateArticleRating', {id: this.article.id, newRating: this.article.rating});
        }
    },
};
</script>
