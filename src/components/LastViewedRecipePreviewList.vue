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
        props: {
            title: {
                type: String,
                required: true
            }
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
                        "http://assignment3-3-2-oranchen.herokuapp.com/user/getLastViewed"
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