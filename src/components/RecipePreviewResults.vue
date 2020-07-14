<template>
   <div class="container" style="min-width: 800px;">
        <h3>
            {{ title }}
        </h3>
        <b-row cols-md="12" v-for="group in splitRecipes()" :key="group.index">
            <b-col md="4" v-for="r in group" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r" />
            </b-col>
        </b-row>
   </div>
</template>
<script>
    import RecipePreview from "./RecipePreview";

    export default {
        name: "RecipePreviewResults",
        data(){
            return{
                threeRecipes: []
            }
        },
        components: {
            RecipePreview
        },
        props: {
            title: {
                type: String,
                required: true
            },
            recipes: {
                type: Array,
                required: true
            }
        },
        // beforeUpdate() {
        //     this.splitRecipes();
        // },
        methods:{
            splitRecipes(){
                //console.log("recipes: " + this.recipes);
                let threeRecipes = [];
                let i;
                let temp = [];
                for (i=0; i < this.recipes.length; i++){

                    if (i % 3 === 0 && i > 0){
                        threeRecipes.push(temp);
                       // console.log("temp: " + temp);
                        temp = [];
                    }
                    temp.push(this.recipes[i]);
                }
                threeRecipes.push(temp);
                //console.log("three recipes: " + threeRecipes);

                return threeRecipes
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        min-height: 300px;
        width:100%
    }

</style>