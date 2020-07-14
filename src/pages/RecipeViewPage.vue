<template>
    <div class="container">
        <div v-if="recipe">
            <div class="recipe-header mt-3 mb-4">
                <div class="text">{{ recipe.title }}</div>
                <img :src="recipe.image" class="center"/>
                <br>
                <RecipePreviewUserInfo v-if="recipe.aggregateLikes" class="RecipePreviewUserInfo" :recipe="recipe" align="center"/>
            </div>
            <div class="recipe-body">
                <div class="upper">
                    <div class="titles_all_containers">
                        <ul class="table_container">
                            <li v-if="recipe.aggregateLikes" class="titleContainer">
                                <div>
                                    <span  class="text_recipe">{{recipe.aggregateLikes}} like this recipe</span>
                                </div>
                            </li>
                            <li class="titleContainer">
                                <div>
                                    <span class="title_recipe">Ready in:</span>
                                    <span class="text_recipe">{{ recipe.readyInMinutes }} minutes</span>
                                </div>
                            </li>
                            <li class="titleContainer">
                                <div>
                                    <span class="title_recipe">Vegetarian:</span>
                                    <span v-if="recipe.vegetarian ==true" class="text_recipe">Yes</span>
                                    <span v-else class="text_recipe">No</span>
                                </div>
                            </li>
                            <li class="titleContainer">
                                <div>
                                    <span class="title_recipe">Vegan:</span>
                                    <span v-if="recipe.vegan ==true" class="text_recipe">Yes</span>
                                    <span v-else class="text_recipe">No</span>
                                </div>
                            </li>
                            <li class="titleContainer">
                                <div>
                                    <span class="title_recipe">Gluten Free:</span>
                                    <span v-if="recipe.glutenFree ==true" class="text_recipe">Yes</span>
                                    <span v-else class="text_recipe">No</span>
                                </div>
                            </li>
                            <li class="titleContainer">
                                <div>
                                    <span class="title_recipe">Servings:</span>
                                    <span class="text_recipe">{{ recipe.servings }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="lower">
                        <div class="wrapped">
                            Ingredients:
                            <ul>
                                <li
                                        v-for="(r, index) in recipe.extendedIngredients"
                                        :key="index + '_' + r.id">
                                    <p v-if="r.original">{{ r.original }}</p>
                                    <p v-else>{{r.name}}, {{ r.amount }} {{r.unit}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="wrapper">
                            Instructions: {{ recipe.instructions }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RecipePreviewUserInfo from "../components/RecipePreviewUserInfo";

    export default {
        name: "RecipeViewPage",
        components:{
            RecipePreviewUserInfo
        },
        data() {
            return {
                recipe: null
            };
        },
        async created() {
            try {
                let response;
                let responseView;
                try {
                    debugger
                    if (this.$route.params.recipeId.toString().length <= 10) {
                        response = await this.axios.get(
                            "http://assignment3-oranchen.herokuapp.com/recipes/recipeInformation",
                            {
                                params: {recipe_id: this.$route.params.recipeId}
                            }
                        );
                        if (this.$root.store.username ) {
                            responseView = await this.axios.post(
                                "http://assignment3-oranchen.herokuapp.com/user/viewRecipe",
                                {
                                    recipe_id: response.data.id
                                },
                                {withCredentials: true}
                            );
                            this.$root.store.recipes_info[response.data.id].watched = true;

                        }
                    } else {
                        response = await this.axios.get(
                            "http://assignment3-oranchen.herokuapp.com/user/getMyFullRecipes/" +
                            this.$route.params.recipeId,
                            {withCredentials: true}
                        );
                    }

                    if (response.status !== 200) this.$router.replace("/NotFound");
                } catch (error) {
                    console.log("error.response.status", error);
                    this.$router.replace("/NotFound");
                    return;
                }
                let {
                    id,
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
                    id,
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
        width: 80%;
        font-size: 18px;
        padding-right: 5%;
    }

    .wrapped {
        padding-right: 2%;
        padding-left: 1%;
        width: 80%;
        height: 50%;
        font-size: 18px;
        font-weight: bold;
    }

    .lower{
        background-color: rgba(243, 240, 237, 0.95);
        background-blend-mode: lighten;
        margin-left: 8%;
        width: 80%;
        height: 50%;
        display: flex;
        alignment: center;
        padding-top: 3%;
        padding-bottom: 3%;

    }

    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 35%;
        height: 25%;
        padding-top: 8%;
    }

    span.title_recipe {
        color: #00aeef;
        display: block;
        font: normal 17px/17px ReformaNarrowMedium;
        font-size: 16px;
        font-weight: bold;
        font-family: "Calibri Light";
    }

    span.text_recipe {
        color: #4c596a;
        font: normal 20px/22px ReformaNarrowRegular;
        font-size: 14px;
        font-weight: bold;
        font-family: "Calibri Light";
    }

    .titles_all_containers {
        display: block;
        margin-left: 2%;
        margin-right: auto;
        alignment: center;
    }

    ul.table_container {
        display: flex;
        margin-left: 0;
        margin-right: 10%;
        alignment: center;
        list-style: none;
        overflow: hidden;
        font-size: 12px;
        font-weight: bold;
        font-family: "Calibri Light";
    }

    li.titleContainer:first-child {
        /*margin-left: 0;*/
        alignment: center;
    }

    li.titleContainer {
        text-align: center;
        margin: 0 auto;
        height: 94px;
        width: 94px;
        line-height: 94px;
        border: 1px dotted #9db5cf;
        border-radius: 47px;
        float: right;
        margin-right: 28px;
        background: white;
        font-size: 12px;
        font-weight: bold;
        font-family: "Calibri Light";

    }

    .titleContainer > div {
        display: inline-block;
        vertical-align: middle;
        line-height: 0;
    }

    .text {
        font-family: "Calibri";
        background-color: white;
        color: black;
        font-size: 32px; /* Responsive font size */
        font-weight: bold;
        margin: 0 auto; /* Center the text container */
        padding: 10px;
        width: 45%;
        text-align: center; /* Center text */
        position: absolute; /* Position text */
        top: 20%; /* Position text in the middle */
        left: 50%; /* Position text in the middle */
        transform: translate(-50%, -50%); /* Position text in the middle */
        mix-blend-mode: screen; /* This makes the cutout text possible */
    }
</style>
