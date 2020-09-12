<template>
  <header>
    <input
      type="text"
      id="search"
      placeholder="Search"
      class="search"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
  </header>
</template>

<script>
  export default {
    props: ['value'],
    name: "SearchBox",
  }
</script>

<style scoped>
  header {
    background-color: #628c5a;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }

  .search {
    background-color: transparent;
    border: 2px solid #373b69;
    border-radius: 50px;
    color: #fff;
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .search::placeholder {
    color: #373b69;
  }

  .search:focus {
    background-color: #628c5a;
    outline: none;
  }
</style>
