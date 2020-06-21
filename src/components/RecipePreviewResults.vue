<template>
    <b-container>
        <h3>
            {{ title }}:
        </h3>
        <b-row>
            <b-col v-for="r in recipes" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r" />
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    import RecipePreview from "./RecipePreview";

    export default {
        name: "RecipePreviewResults",
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
        }
    }
</script>

<style scoped>

</style>