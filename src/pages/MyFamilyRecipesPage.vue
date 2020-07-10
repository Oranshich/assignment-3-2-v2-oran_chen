<template>
    <RecipePreviewResults title="My Family Recipes" :recipes="recipes"/>
</template>

<script>
    import RecipePreviewResults from "../components/RecipePreviewResults";

    export default {
        name: "MyFamilyRecipesPage",
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
                        "http://assignment3-oranchen.herokuapp.com/user/getMyFamilyRecipes",
                        {withCredentials:true}
                    );
                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    // console.log(this.recipes);
                    for(let i = 0; i <this.recipes.length; i++){
                        this.recipes[i].watched = "";
                        this.recipes[i].saved = "";
                    }
                } catch (error) {
                    console.log(error);
                }
            }

    };

</script>

<style scoped>

</style>