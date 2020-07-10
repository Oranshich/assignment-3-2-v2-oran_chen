<template>
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
            <b-col md="3.5" class="image">
                <router-link
                        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
                        class="recipe-preview">
                    <b-card-img :src="recipe.image" alt="Image" class="recipe-image"></b-card-img>
                </router-link>
            </b-col>
            <b-col md="8.5" class="b-card-text">
                <b-card-body :title="recipe.title" class="b-card-text">
                    <b-card-text>
                        <li>{{ recipe.readyInMinutes }} minutes</li>
                        <li v-if="recipe.aggregateLikes">{{ recipe.aggregateLikes }} likes</li>
                        <li>Vegan: {{ recipe.vegan }}</li>
                        <li>Vegetarian: {{ recipe.vegetarian }}</li>
                        <li >Gluten free: {{ recipe.glutenFree }}</li>
                        <li v-if="recipe.watched.length>0" >Recently watched : {{recipe.watched}}</li>
                        <li v-if="recipe.saved.length>0" id="save" @click="addToFavorites">Saved to favorites: {{isFavorite}}
                        </li>
                        <li v-if="recipe.preparedBy">Prepared by: {{recipe.preparedBy}}</li>
                        <li v-if="recipe.preparedAt">Prepared at: {{recipe.preparedAt}}</li>
                    </b-card-text>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    export default {
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                isFavorite: false
            };
        },
      watch:{
            recipe() {
                this.isFavorite = this.recipe.saved;
            }
      },
        methods: {
            addToFavorites(){
              debugger
                if (this.isFavorite === false) {
                    try {
                        let response = this.axios.post(
                            "http://assignment3-oranchen.herokuapp.com/user/addRecipeToFavorites",
                            {
                                recipe_id: this.recipe.id
                            },
                            {withCredentials: true}
                        );
                        console.log("response.status", response.status);
                        this.isFavorite = true;
                        this.$root.store.recipes_info[this.recipe.id] = {
                            "watched": this.recipe.id.watched,
                            "saved": true
                        };
                    } catch (error) {
                        console.log("error.response.status", error.response.status);
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .recipe-preview {
        display: inline-block;
        width: 80%;
        height: 100%;
        position: relative;
        margin: 10px 10px;
        font-family: Calibri;

    }

    .recipe-preview > .recipe-body {
        width: 80%;
        height: 200px;
        position: relative;
        font-family: Calibri;
    }

    .recipe-preview .recipe-body {
        margin: auto;
        display: block;
        width: 80%;
        height: 100%;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        font-family: Calibri;
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
        width: 80px;
        display: table-cell;
        text-align: center;
        font-family: Calibri;
    }

    .b-card-text {
        font-family: Calibri;
        font-size: 10pt;
    }
  #save:hover{
    color:blue;
  }
  .recipe-image, #save{
    cursor: pointer;
  }
    .image{
        margin-top: 5%;
        margin-left: 20%;
        padding: 1% 0 0 0;
        height: 60%;
        width: 60%;
    }

</style>
