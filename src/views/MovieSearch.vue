<template>
  <section>
    <SearchBox v-model="query"></SearchBox>
    <main class="movie-wrapper" :class="{'loading': loadingMovies}">
      <div class="movie" v-for="(movie, key) in movies" :key="key">
        <img :src="posterPath(movie.poster_path)" :alt="movie.title"/>
        <div class="movie-info">
          <h3>{{movie.title}}{{releaseYear(movie.release_date)}}</h3>
          <span :class="{
            'green': movie.vote_average >= 8,
             'orange': movie.vote_average >= 5 && movie.vote_average < 8,
              'red': movie.vote_average < 5}">
          {{movie.vote_average}}
        </span>
        </div>
        <div class="overview">
          <h3>Overview:</h3>
          {{movie.overview}}
        </div>
      </div>
    </main>
  </section>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { apiCall } from "@/services/movies.service"
  import debounce from 'lodash/debounce'
  import SearchBox from "@/components/movies/SearchBox";

  export default {
    name: "MovieSearch",
    components: {SearchBox},
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
      ...mapState ('storeMovies', ['imagePath']),
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
      },
      posterPath (poster) {
        return `${this.imagePath}${poster}`
      },
      releaseYear (date) {
        return `(${date.substring(0, 4)})`
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
  }
  .movie-wrapper.loading {
    min-height: 100vh;
  }

  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .movie {
    cursor: pointer;
    background-color: #376956;
    border-radius: 3px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    margin: 1rem;
    width: 300px;
  }

  .movie img {
    width: 100%;
  }

  .movie-info {
    color: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem 1rem;
    letter-spacing: 0.5px;
  }

  .movie-info h3 {
    margin: 0;
  }

  .movie-info span {
    background-color: #628c5a;
    border-radius: 3px;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
  }
  .movie-info span.green {
    color: rgb(39, 189, 39);
  }

  .movie-info span.orange {
    color: orange;
  }

  .movie-info span.red {
    color: rgb(189, 42, 42);
  }

  .overview {
    background-color: #fff;
    padding: 2rem;
    position: absolute;
    max-height: 100%;
    overflow: auto;
    left: 0;
    bottom: 0;
    right: 0;
    transform: translateY(101%);
    transition: transform 0.3s ease-in;
  }

  .overview h3 {
    margin-top: 0;
  }

  .movie:hover .overview {
    transform: translateY(0);
  }
</style>
