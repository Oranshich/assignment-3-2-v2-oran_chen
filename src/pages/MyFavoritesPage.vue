<template>
    <div>
        <br>
        <RecipePreviewResults title="Favorite Recipes" :recipes="recipes"/>
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
                        "http://assignment3-oranchen.herokuapp.com/user/getFavorites",
                        {withCredentials:true}
                    );
                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);

                    if (this.$root.store.username) {
                        //bring watched and saved info
                        let not_saved_s = ""
                        let not_saved_a = {}
                        for (let i = 0; i < this.recipes.length; i++) {
                            if (this.recipes[i].id in this.$root.store.recipes_info) {
                                this.recipes[i].watched = this.$root.store.recipes_info[this.recipes[i].id]["watched"];
                                this.recipes[i].saved = this.$root.store.recipes_info[this.recipes[i].id]["saved"];
                            } else {
                                not_saved_a[i] = this.recipes[i].id;
                                if (not_saved_s.length == 0) {
                                    not_saved_s += this.recipes[i].id;
                                } else {
                                    not_saved_s += "," + this.recipes[i].id;
                                }
                            }
                        }
                        if (not_saved_s.length > 0) {
                            const responseWatchedSaved = await this.axios.get(
                                "http://assignment3-oranchen.herokuapp.com/user/recipeInfo/[" +
                                not_saved_s + "]",
                                {withCredentials: true}
                            );
                            console.log(responseWatchedSaved);
                            for (let r in not_saved_a) {
                                this.recipes[r].watched = responseWatchedSaved.data[not_saved_a[r]]["watched"];
                                this.recipes[r].saved = responseWatchedSaved.data[not_saved_a[r]]["saved"];
                                this.$root.store.recipes_info[not_saved_a[r]] = {
                                    "watched": this.recipes[r].watched,
                                    "saved": this.recipes[r].saved
                                };
                            }
                        }
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