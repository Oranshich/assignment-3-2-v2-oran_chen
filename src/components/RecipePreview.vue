<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview">
<!--    <div class="recipe-body">-->
<!--      <img v-if="image_load" :src="recipe.image" class="recipe-image"/>-->
<!--    </div>-->
<!--    <div class="recipe-footer">-->
<!--      <div :title="recipe.title" class="recipe-title text-center">-->
<!--        {{ recipe.title }}-->
<!--      </div>-->
<!--      <ul class="recipe-overview">-->
<!--        <li>{{ recipe.readyInMinutes }} minutes</li>-->
<!--        <li>{{ recipe.aggregateLikes }} likes</li>-->
<!--        <li>Vegan: {{ recipe.vegan }}</li>-->
<!--        <li>Vegetarian: {{ recipe.vegetarian }}</li>-->
<!--        <li>Gluten free: {{ recipe.glutenFree }}</li>-->
<!--      </ul>-->
<!--    </div>-->
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="recipe.image" alt="Image" class="recipe-image"></b-card-img>
        </b-col>
        <b-col md="6" class="b-card-text">
          <b-card-body :title="recipe.title" class="b-card-text">
            <b-card-text>
              <li>{{ recipe.readyInMinutes }} minutes</li>
              <li v-if="recipe.aggregateLikes">{{ recipe.aggregateLikes }} likes</li>
              <li>Vegan: {{ recipe.vegan }}</li>
              <li>Vegetarian: {{ recipe.vegetarian }}</li>
              <li>Gluten free: {{ recipe.glutenFree }}</li>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </router-link>
</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  // data() {
  //   return {
  //     // image_load: false
  //   };
  // },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  font-family: Calibri;

}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
  font-family: Calibri;
}

.recipe-preview .recipe-body .recipe-image {
  margin: auto;
  display: block;
  width: 90%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  font-family: Calibri;

}

.recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 10pt;
  font-family: Calibri;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-family: Calibri;
}

.recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
  font-family: Calibri;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  font-family: Calibri;
}
.b-card-text{
  font-family: Calibri;
  font-size: 10pt;

}
</style>
