<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>Vegetarian: {{ recipe.vegetarian }} </div>
              <div>Vegan: {{ recipe.vegan }} </div>
              <div>Gluten Free: {{ recipe.glutenFree }} </div>
              <div>Servings: {{ recipe.servings }} </div>

            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions: {{ recipe.instructions }}
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      let response2;
      // response = this.$route.params.response;

      try {
        response = await this.axios.get(
          "http://assignment3-oranchen.herokuapp.com/recipes/recipeInformation",
          {
            params: { recipe_id: this.$route.params.recipeId }
          }
        );
        console.log("response.status", response.status);
        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
        else if (this.$root.store.username){
            response2 = this.axios.post(
                    "http://assignment3-oranchen.herokuapp.com/user/viewRecipe",
                    {
                          recipe_id: response.data.id
                    },
                    {withCredentials:true}
            );
          console.log("response.status", response2.status);
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image
      } = response.data;

      let _recipe = {
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
