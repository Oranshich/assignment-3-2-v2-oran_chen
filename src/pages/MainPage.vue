<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <br>
        <h1 class="title text-center">Oran&Chen's Recipes</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RandomRecipePreviewList title="" class="RandomRecipes center" />
      </b-col>
      <b-col v-if="$root.store.username">
        <LastViewedRecipePreviewList
                title="Last Viewed Recipes"
                :class="{center: true}"></LastViewedRecipePreviewList>
      </b-col>
      <b-col v-else>
        <login-page title="login" class="login center" />
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import RandomRecipePreviewList from "../components/RandomRecipePreviewList";
import LastViewedRecipePreviewList from "../components/LastViewedRecipePreviewList";

import LoginPage from "../pages/LoginPage";
export default {
  components: {
    RandomRecipePreviewList,
    LoginPage,
    LastViewedRecipePreviewList
  }
};
</script>

<style lang="scss" scoped>
  .h1{
    padding: 5%;
    margin: 5%;
    font-weight: bold;
    font-family: Calibri;
    font-size: 34px;
  }
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
  @font-face {
    font-family: Galada;
    src: url(../assets/Galada-Regular.ttf);
  }
  h1{
    font-family: Galada;
    font-size: 50px;
    color: blue;
    font-weight: bold;
    text-emphasis-color: #000;
  }
  .login-page{
    padding-top: 2%;
  }

</style>
