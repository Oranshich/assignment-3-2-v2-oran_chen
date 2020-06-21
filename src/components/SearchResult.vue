<template>

    <b-container  class="searchResult">
        <b-row v-for="{r,index} in recipes" :key="`r.id-${index}`">
            <b-col>
                <div v-if="index < num">
                    <RecipePreview class="recipePreview" :recipe="r" />
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import RecipePreview from "./RecipePreview";
    export default {
        name: "SearchResult",
        data() {
            return {

            }
        },
        components: {
            RecipePreview
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
        }
    }
</script>

<style scoped>

</style>