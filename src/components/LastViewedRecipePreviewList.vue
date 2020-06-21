<template>
    <RecipePreviewList title="Last Viewed Recipes" :recipes="recipes"/>
</template>

<script>
    import RecipePreviewList from "./RecipePreviewList";

    export default {
        name: "LastViewedRecipePreviewList",
        components: {
            RecipePreviewList
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
                        "http://assignment3-oranchen.herokuapp.com/user/getLastViewed",
                        // "http://localhost:3000/user/getLastViewed",
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