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
                isWatched: false,
            }
        },
        async created(){
            await this.getUserInformation();
        },
        // async mounted() {
        //     await this.getUserInformation();
        // },
        computed: {
           username: function(){
                return this.$root.store.username
            }
        },
        methods: {
            async getUserInformation() {
                try {
                    console.log("My recipe: " + this.myRecipe);
                    debugger
                    if (this.$root.store.username && this.myRecipe.id.toString().length<=10) {
                        //bring watched and saved info
                        console.log("this.$root.store.recipes_info" + this.$root.store.recipes_info);
                        console.log("this.myRecipe.id" + this.myRecipe.id);
                        if (this.myRecipe.id in this.$root.store.recipes_info) {

                            this.myRecipe.watched = this.$root.store.recipes_info[this.myRecipe.id]["watched"];
                            this.myRecipe.saved = this.$root.store.recipes_info[this.myRecipe.id]["saved"];
                            console.log("this.myRecipe.watched: " +this.myRecipe.watched);
                            this.isFavorite = this.myRecipe.saved;
                            this.isWatched = this.myRecipe.watched;
                        } else {
                            const responseWatchedSaved = await this.axios.get(
                                this.$root.store.prefixURL + "/user/recipeInfo/[" +
                                this.myRecipe.id + "]",
                                {withCredentials: true}
                            );
                            console.log("responseWatchedSaved: "+responseWatchedSaved);
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
                            this.$root.store.prefixURL + "/user/addRecipeToFavorites",
                            {
                                recipe_id: this.recipe.id
                            },
                            {withCredentials: true}
                        );
                        console.log("response.status", response.status);
                        this.isFavorite = true;
                        this.$root.store.recipes_info[this.recipe.id].saved = true;
                        this.saved = true;
                    } catch (error) {
                        console.log("error.response.status", error.response.data.error.status);
                    }
                }
            }
        },
        watch:{
            username: async function(){
                await this.getUserInformation();
            },
            myRecipe: async function(){
                console.log("recipe changed!!!");
                await this.getUserInformation();
            },
        }
    }
</script>

<style scoped>
    .fav:hover{
        cursor: pointer;
    }
</style>