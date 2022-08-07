import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from '@/api/index'
import {ARTICLES_LIST, ARTICLE_UPDATE_RATING} from "@/api/routes";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        articles: [],
        latestArticleId: 0,
        newestArticleId: 0,
        isLastPage: false
    },
    mutations: {
        setLatestArticles(state, articles) {
            state.articles.push(...articles);
            state.latestArticleId = state.articles.at(-1).id;
            state.newestArticleId = state.articles[0].id;
        },
        setNewestArticles(state, articles) {
            state.articles.unshift(...articles);
            state.latestArticleId = state.articles.at(-1).id;
            state.newestArticleId = state.articles[0].id;
        },
        deleteArticleById(state, id) {
            const index = state.articles.findIndex(function (el) {
                return el.id == id;
            });

            state.articles.splice(index, 1);
        },
    },
    actions: {
        fetchLaterArticles({state, commit}, {itemsOnPage}) {
            return axiosInstance.post(ARTICLES_LIST(), {
                itemsOnPage: itemsOnPage,
                lastId: state.latestArticleId
            })
                .then(({data}) => {
                    let articles = data.articles;
                    this.state.isLastPage = data.meta.isLastPage;

                    commit('setLatestArticles', articles);
                })
                .catch(err => console.log(err))
        },
        fetchNewArticles({state, commit}) {
            return axiosInstance.post(ARTICLES_LIST(), {
                firstId: state.newestArticleId
            })
                .then(({data}) => {
                    let articles = data.articles;
                    commit('setNewestArticles', articles);
                })
                .catch(err => console.log(err));
        },
        updateArticleRating(context, {id, newRating}) {
            return axiosInstance.patch(ARTICLE_UPDATE_RATING(), {
                id: id,
                rating: newRating
            });
        },
        deleteArticleFromList({commit}, id) {
            commit('deleteArticleById', id);
        },
    },
    getters: {
        getArticles: (state) => {
            return state.articles;
        },
        getArticleById: (state) => (id) => {
            const index = state.articles.findIndex(function (el) {
                return el.id == id;
            });

            return state.articles[index];
        },
        getArticlesOnPage: (state) => (articlesOnPage) => {
            state.articles = state.articles.slice(0, articlesOnPage);
        }
    }
})
