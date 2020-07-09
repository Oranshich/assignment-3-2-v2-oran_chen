<template>
    <recipe-preview-results title="My Favorite Recipes" :recipes="recipes"/>
</template>

<script>
    import RecipePreviewResults from "../components/RecipePreviewResults";

    export default {
        name: "MyFavoritesPage",
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
                        "http://assignment3-oranchen.herokuapp.com/user/getFavorites",
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