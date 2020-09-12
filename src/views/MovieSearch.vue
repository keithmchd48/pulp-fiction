<template>
  <section>
    <SearchBox v-model="query"></SearchBox>
    <main class="movie-wrapper">
      <MovieCard v-for="(movie, key) in movies" :key="key" :movie="movie"></MovieCard>
    </main>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { apiCall } from "@/services/api.service"
  import debounce from 'lodash/debounce'
  import SearchBox from "@/components/movies/SearchBox";
  import MovieCard from "@/components/movies/MovieCard";

  export default {
    name: "MovieSearch",
    components: {MovieCard, SearchBox},
    data() {
      return {
        movieList: [],
        searchList: [],
        total_pages: 0,
        loadingMovies: false,
        page: 1,
        listElm: '',
        query: '',
        debounceSearch: null
      }
    },
    computed: {
      ...mapGetters('storeMovies', ['getApiUrl']),
      movies () {
        if (this.query) {
          return this.searchList
        }
        return this.movieList
      }
    },
    watch: {
      'query': function () {
        this.debounceSearch()
      }
    },
    created() {
      this.debounceSearch = debounce(this.searchMovies, 1000)
      this.discoverMovies(false)
    },
    mounted () {
      // this.listElm = document.querySelector('body')
      window.addEventListener('scroll', this.scrollListener)
    },
    beforeDestroy () {
      // remove the scroll event listener so that it does not affect any other component
      window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      ...mapActions('storeMovies', ['SET_API_REQUEST_ACTION']),
      scrollListener () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          if (!this.query && !this.loadingMovies && this.total_pages > this.page) {
            this.page++
            this.discoverMovies()
          }
        }
      },
      async discoverMovies (page = true) {
        this.searchList = []
        if (!page) this.page = 1
        this.SET_API_REQUEST_ACTION({
          option1: 'discover/movie?sort_by=popularity.desc',
          option2: `page=${this.page}`
        })
        this.loadingMovies = true
        const data = await apiCall(this.getApiUrl)
        this.total_pages = data.total_pages
        this.loadingMovies = false
        this.movieList = !page ? data.results : [...this.movieList, ...data.results]
      },
      async searchMovies () {
        if (!this.query) return
        this.SET_API_REQUEST_ACTION({
          option1: 'search/movie?',
          option2: `query=${this.query}`
        })
        this.loadingMovies = true
        const data = await apiCall(this.getApiUrl)
        this.loadingMovies = false
        this.searchList = data.results
      }
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap");

  .movie-wrapper {
    background-color: #628c5a;
    font-family: "Poppins", sans-serif;
    margin: 0;
    min-height: 100vh;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
