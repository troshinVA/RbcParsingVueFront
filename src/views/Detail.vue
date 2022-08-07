<template>
    <div class="detail">
        <div v-if="article.id">
            <b-card
                :title=article.title
                :img-src=article.img
                img-alt="Image"
                class="mb-4"
            >
                <b-card-sub-title>{{ article.category }}, {{ article.time }}</b-card-sub-title>
                <b-card-text>
                    {{ article.body }}
                </b-card-text>
                <b-button variant="outline-info" @click="handleBackButton">
                    Back
                </b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Detail",
    data() {
      return {
          article: Object
      }
    },
    methods: {
        handleBackButton() {
            this.$router.push(`/`);
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => {
                this.article = this.$store.getters.getArticleById(this.$route.params.articleId);
            },
            { immediate: true }
        )
    },
}

</script>
