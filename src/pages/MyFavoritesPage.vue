<template>
    <div>
        <br>
        <RecipePreviewResults title="Favorite Recipes" style="font-weight: bold; font-family: Satisfy" :recipes="recipes"/>
    </div>
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
                        this.$root.store.prefixURL + "/user/getFavorites",
                        {withCredentials:true}
                    );
                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    for (let i = 0; i < this.recipes.length; i++) {
                        this.recipes[i].watched = "";
                        this.recipes[i].saved = "";
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
    @font-face {
        font-family: Satisfy;
        src: url(../assets/Satisfy-Regular.ttf);
    }
</style>