<template>
  <div class="main_wrapper">
    <input type="text" v-model="searchQuery" @keyup.enter="getUser" placeholder="Search a Github User" />
    <div class="card" v-if="user && user.name">
      <div class="avatar_wrapper">
        <img class="avatar" :src="user.avatar_url" :alt="user.name" />
      </div>
      <div class="user-info">
        <h2>{{user.name}}</h2>
        <p>{{user.bio}}</p>
        <ul class="info">
          <li>{{user.followers}}<strong>Followers</strong></li>
          <li>{{user.following}}<strong>Following</strong></li>
          <li>{{user.public_repos}}<strong>Repos</strong></li>
        </ul>
        <div id="repos">
          <a v-for="(rep, key) in repos" :key="key" class="repo" :href="rep.html_url" target="_blank">
            {{rep.name}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const GITHUB_URL = 'https://api.github.com/users/'
  import { apiCall } from "@/services/api.service"

  export default {
    name: "GithubProfileViewer",
    data () {
      return {
        user: null,
        searchQuery: 'keithmchd48',
        repos: []
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      async getProfile() {
        this.user = await apiCall(GITHUB_URL + this.searchQuery)
        this.searchQuery = ''
      },
      async getRepos() {
        this.repos = await apiCall(GITHUB_URL + this.searchQuery + '/repos')
      },
      getUser () {
        if (!this.searchQuery) return
        this.getProfile()
        this.getRepos()
      }
    }
  }
</script>

<style scoped>
  .main_wrapper {
    background-color: #2a2a72;
    background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  input {
    background-color: #ffffff;
    border-radius: 10px;
    border: none;
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);
    color: #000000;
    font-family: inherit;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  input::placeholder {
    color: #bbb;
  }

  input:focus {
    outline: none;
  }

  .card {
    background-color: #2a2a72;
    background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
    border-radius: 20px;
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    padding: 3rem;
    max-width: 800px;
  }

  .avatar {
    border: 10px solid #247bd4;
    border-radius: 50%;
    height: 150px;
    width: 150px;
  }

  .user-info {
    color: #eee;
    margin-left: 2rem;
  }

  .user-info h2 {
    margin-top: 0;
  }

  .user-info ul {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    padding: 0;
    max-width: 400px;
    flex-wrap: wrap;
  }

  .user-info ul li {
    display: flex;
    align-items: center;
  }

  .user-info ul li strong {
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }

  .repo {
    background-color: #1c57a9;
    border-radius: 5px;
    display: inline-block;
    color: white;
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    text-decoration: none;
  }
  @media only screen and (max-width: 650px) {
    .card {
      flex-wrap: wrap;
    }
  }
  @media only screen and (max-width: 875px) {
    .card {
      margin: 0 40px;
    }
    input {
      margin-top: 20px;
    }
  }
  @media only screen and (max-width: 320px) {
    .card {
      padding: 1rem;
    }
  }
</style>
