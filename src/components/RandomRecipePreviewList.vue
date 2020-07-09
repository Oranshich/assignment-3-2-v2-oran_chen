<template>
    <RecipePreviewList title="Random Recipes" :recipes="recipes"/>
</template>

<script>
    import RecipePreviewList from "./RecipePreviewList";

    export default {
        name: "RandomRecipePreviewList",
        components: {
            RecipePreviewList
        },
        // props: {
        //     title: {
        //         type: String,
        //         required: true
        //     }
        // },
        data() {
            return {
                recipes: []
            };
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
                try {
                    const response = await this.axios.get(
                             "https://test-for-3-2.herokuapp.com/recipes/"
                        // "http://localhost:3000/recipes/getRandomRecipes"
                       // "http://assignment3-oranchen.herokuapp.com/recipes/getRandomRecipes"
                    );
                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    //bring watched and saved info
                    const responseWatchedSaved = await this.axios.get(
                        "http://assignment3-oranchen.herokuapp.com/user/recipeInfo/[" +
                        this.recipes[0].id + "," + this.recipes[1].id + "," + this.recipes[2].id +"]",
                        {withCredentials:true}
                    );
                    console.log(responseWatchedSaved);
                    for(let i = 0; i <this.recipes.length; i++){
                        this.recipes[i].watched = responseWatchedSaved.data[this.recipes[i].id].watched;
                        this.recipes[i].saved = responseWatchedSaved.data[this.recipes[i].id].saved;
                    }
                    console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };



</script>

<style scoped>

</style>