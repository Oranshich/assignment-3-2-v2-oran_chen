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
                        //     "https://test-for-3-2.herokuapp.com/recipes/random"
                         "http://localhost:3000/recipes/getRandomRecipes"
                        // "http://assignment3-oranchen.herokuapp.com/recipes/getRandomRecipes"
                     );

                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };



</script>

<style scoped>

</style>