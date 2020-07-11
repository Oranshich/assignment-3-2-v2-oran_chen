<template>
    <div class="container">
        <img class="fav" v-if="this.isFavorite === false" @click="addToFavorites" src="../assets/add_favorites.png" height="40" width="40">
        <img v-if="this.isFavorite === true" src="../assets/favorites.webp" height="40" width="40">
        <img v-if="this.isWatched === false" src="../assets/add_watch.png" height="40" width="40">
        <img v-if="this.isWatched === true" src="../assets/wtched.png" height="40" width="40">
    </div>
</template>

<script>
    export default {
        name: "RecipePreviewUserInfo",
        props: {
            recipe: Object
        },
        data() {
            return {
                myRecipe: this.recipe,
                isFavorite: false,
                isWatched: false
            }
        },
        async mounted() {
            await this.getUserInformation();
        },
        methods: {
            async getUserInformation() {
                try {
                    if (this.$root.store.username && this.myRecipe.id.toString().length<=6) {
                        //bring watched and saved info
                        if (this.myRecipe.id in this.$root.store.recipes_info) {
                            this.myRecipe.watched = this.$root.store.recipes_info[this.myRecipe.id]["watched"];
                            this.myRecipe.saved = this.$root.store.recipes_info[this.myRecipe.id]["saved"];
                            this.isFavorite = this.myRecipe.saved;
                            this.isWatched = this.myRecipe.watched;
                        } else {
                            const responseWatchedSaved = await this.axios.get(
                                "http://assignment3-oranchen.herokuapp.com/user/recipeInfo/[" +
                                this.myRecipe.id + "]",
                                {withCredentials: true}
                            );
                            console.log(responseWatchedSaved);
                            this.myRecipe.watched = responseWatchedSaved.data[this.myRecipe.id]["watched"];
                            this.myRecipe.saved = responseWatchedSaved.data[this.myRecipe.id]["saved"];
                            this.$root.store.recipes_info[this.myRecipe.id] = {
                                "watched": this.myRecipe.watched,
                                "saved": this.myRecipe.saved
                            };
                            this.isFavorite = this.myRecipe.saved;
                            this.isWatched = this.myRecipe.watched;
                        }
                    }
                    else{
                        this.isFavorite= "";
                        this.isWatched= "";
                    }
                    console.log(this.myRecipe);
                } catch (error) {
                    console.log(error);
                }
            },
            addToFavorites() {
                debugger
                if (this.isFavorite === false) {
                    try {
                        let response = this.axios.post(
                            "http://assignment3-oranchen.herokuapp.com/user/addRecipeToFavorites",
                            {
                                recipe_id: this.recipe.id
                            },
                            {withCredentials: true}
                        );
                        console.log("response.status", response.status);
                        this.isFavorite = true;
                        this.$root.store.recipes_info[this.recipe.id] = {
                            "watched": this.recipe.id.watched,
                            "saved": true
                        };
                    } catch (error) {
                        console.log("error.response.status", error.response.status);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .fav:hover{
        cursor: pointer;
    }
</style>