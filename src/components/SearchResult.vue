<template>
    <RecipePreviewResults title="Search Result" :recipes="recipes"/>
</template>

<script>
    import RecipePreview from "./RecipePreview";
    import RecipePreviewResults from "../components/RecipePreviewResults";
    export default {
        name: "SearchResult",
        data() {
            return {
                myRecipes: Array
            }
        },
        components: {
            RecipePreviewResults
        },
        props: {
            recipes: {
                type: Array,
                required: true
            },
            num:{
                type: String,
                required: true
            }
        },
        // mounted() {
        //     this.updateRecipes();
        // },
        // methods:{
        //     updateRecipes(){
        //         debugger
        //         let i;
        //         for (i = 0; i < this.recipes.length; i++){
        //             if(i < this.num){
        //                 this.myRecipes.push(this.recipes[i]);
        //             }
        //         }
        //     }
        // }
    }
</script>

<style scoped>

</style>