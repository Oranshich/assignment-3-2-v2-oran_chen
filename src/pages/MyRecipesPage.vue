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

            async created() {
                try {
                    const response = await this.axios.get(
                        "http://assignment3-oranchen.herokuapp.com/user/getMyRecipes",
                        {withCredentials:true}
                    );
                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);

                    for(let i = 0; i <this.recipes.length; i++){
                        this.recipes[i].watched = "";
                        this.recipes[i].saved = "";
                    }
                    console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            }
        }


</script>

<style scoped>

</style>