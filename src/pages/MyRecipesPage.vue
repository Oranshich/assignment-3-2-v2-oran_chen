<template>
    <RecipePreviewResults title="My Recipes" :recipes="recipes"/>
</template>

<script>
    import RecipePreviewResults from "../components/RecipePreviewResults";

    export default {
        name: "MyRecipesPage",
        components: {
            RecipePreviewResults
        },
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
                        "http://assignment3-oranchen.herokuapp.com/user/getMyRecipes",
                        {withCredentials:true}
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