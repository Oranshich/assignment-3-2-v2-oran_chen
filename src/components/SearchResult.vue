<template>
    <b-container>
        <b-row v-for="{r,index} in recipes" :key="`r.id-${index}`">
            <b-col>
                <div v-if="index < 5">
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
                key: value
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
              type: Number,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>