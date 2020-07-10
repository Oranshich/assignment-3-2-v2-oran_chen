<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <br>
        <h1 class="title text-center" style="font-size: 50px; font-weight: bold">Oran&Chen's Recipes</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RandomRecipePreviewList title="Explore these recipes" class="RandomRecipes center" />
<!--        <b-button  style="width:80px;display:block;" class="mx-auto w-25" variant="outline-primary">More</b-button>-->
      </b-col>
      <b-col v-if="$root.store.username">
        <LastViewedRecipePreviewList
                title="Last Viewed Recipes"
                :class="{center: true}"></LastViewedRecipePreviewList>
      </b-col>
      <b-col v-else>
        <br>
        <login-page title="login" class="login center" />
      </b-col>
    </b-row>

    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
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
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
