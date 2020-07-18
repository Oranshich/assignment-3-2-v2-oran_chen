<template>
    <div>
        <RecipePreviewList class="RecipePreviewList" title="Check out these recipes" :recipes="recipes"/>
        <b-button  style="width:60px;display: block;" class="mx-auto w-25" variant="primary" @click="getRandomRecipes">More</b-button>
    </div>
</template>

<script>
    import RecipePreviewList from "./RecipePreviewList";

    export default {
        name: "RandomRecipePreviewList",
        components: {
            RecipePreviewList
        },
        data() {
            return {
                recipes: []
            };
        },
        async created() {
            await this.getRandomRecipes();
        },
        methods:{
            async getRandomRecipes(){
                try {
                    const response = await this.axios.get(
                        "http://assignment3-oranchen.herokuapp.com/recipes/getRandomRecipes"
                    );
                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    for (let i = 0; i < this.recipes.length; i++) {
                        this.recipes[i].watched = "";
                        this.recipes[i].saved = "";
                    }
                    // await this.getUserInformation();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }


</script>

<style scoped>

</style>