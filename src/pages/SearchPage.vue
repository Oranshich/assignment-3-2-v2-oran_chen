<template>
    <div>
      <div class='is-icon is-searchbox' v-on:click='focus()'></div>
      <input class='is-field is-searchbox' type='text' ref='input' v-model='entry' />
      <input class="is-button is-search-button" type="button" :value='this.text' v-on:click='this.clickOn' />
    </div>
</template>

<script>
    export default {
      name : 'searchbox',

      props:{
        "text":{
          type: String,
          default : "Search"

        }
      },

      methods : {
        clickOn : function() {
          // Execute request
          this.fetch();
        }
      },

    }
</script>

<style scoped>

</style>