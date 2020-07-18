<template>
    <div>
        <br>
        <RecipePreviewResults title="My Family Recipes" style="font-weight: bold; alignment: center; font-family: Satisfy" :recipes="recipes"/>
    </div>
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
                    this.$root.store.prefixURL + "/user/getMyFamilyRecipes",
                    {withCredentials: true}
                );
                console.log(response);
                const recipes = response.data;
                this.recipes = [];
                this.recipes.push(...recipes);
                // console.log(this.recipes);
                for (let i = 0; i < this.recipes.length; i++) {
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
    @font-face {
        font-family: Satisfy;
        src: url(../assets/Satisfy-Regular.ttf);
    }
</style>