<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div class="columns">
      <div class="column is-one-fifth">
        <div>
          <refinement-list-filter :field="'state'"></refinement-list-filter>
          <refinement-list-filter :field="'gender'"></refinement-list-filter>
        </div>
      </div>
      <div class="column">
        <div>
          <searchbox :field="'firstname'"></searchbox>
          <div style="margin: 20px auto;width: 90%">
            <search-button></search-button>
            <reset-button></reset-button>
          </div>
          <hits></hits>

          <paginate :previousText="'Previous page'" :nextText="'Next page'" :size="10"></paginate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    components: {
      'refinement-list-filter': refinement-list-filter,
      'search-button': search-button,
    },
  }
</script>
