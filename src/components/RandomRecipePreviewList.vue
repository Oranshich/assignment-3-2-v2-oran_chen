<template>
    <div>
        <RecipePreviewList title="Random Recipes" :recipes="recipes"/>
        <b-button  style="width:80px;display:block;" class="mx-auto w-25" variant="outline-primary" @click="updateRecipes">More</b-button>
    </div>
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
                        // "http://localhost:3000/recipes/getRandomRecipes"
                        "http://assignment3-oranchen.herokuapp.com/recipes/getRandomRecipes"
                    );
                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    //bring watched and saved info
                    let not_saved_s = ""
                    let not_saved_a = {}
                    for (let i = 0; i < this.recipes.length; i++){
                        if (this.recipes[i].id in this.$root.store.recipes_info){
                            this.recipes[i].watched = this.$root.store.recipes_info[this.recipes[i].id]["watched"];
                            this.recipes[i].saved = this.$root.store.recipes_info[this.recipes[i].id]["saved"];
                        }
                        else{
                            not_saved_a[i] = this.recipes[i].id;
                            if (not_saved_s.length == 0){
                                not_saved_s += this.recipes[i].id;
                            }
                            else{
                                not_saved_s += "," + this.recipes[i].id;
                            }
                        }
                    }
                    if (not_saved_s.length>0) {
                        const responseWatchedSaved = await this.axios.get(
                            "http://assignment3-oranchen.herokuapp.com/user/recipeInfo/[" +
                            not_saved_s + "]",
                            {withCredentials: true}
                        );
                        console.log(responseWatchedSaved);
                        for (let r in not_saved_a) {
                            this.recipes[r].watched = responseWatchedSaved.data[not_saved_a[r]]["watched"];
                            this.recipes[r].saved = responseWatchedSaved.data[not_saved_a[r]]["saved"];
                            this.$root.store.recipes_info[not_saved_a[r]] = {"watched":  this.recipes[r].watched,
                                "saved": this.recipes[r].saved};
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