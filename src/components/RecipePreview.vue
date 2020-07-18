<template>
    <b-card id="bcard" no-body class="overflow-hidden">
        <b-row>
            <b-col>
                <h2>{{recipe.title}}
                </h2>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col md="1" class="RecipePreviewUserInfo">
                <RecipePreviewUserInfo :recipe="recipe" />
            </b-col>
            <b-col md="8" class="image">
                <router-link
                        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
                        class="recipe-preview" exact >
                    <b-card-img :src="recipe.image" alt="Image" class="recipe-image">
                    </b-card-img>
                </router-link>
            </b-col>
            <b-col md="12" class="b-card-text">
                <b-card-body class="b-card-text">
                    <b-card-text>
                        <b-row>
                            <b-col md="5">
                                <li id="vegan">Vegan: {{ recipe.vegan === true ? "Yes" : "No" }}</li>
                                <li id="vege">Vegetarian: {{ recipe.vegetarian === true ? "Yes" : "No" }}</li>
                                <li id="glu">Gluten free: {{ recipe.glutenFree === true ? "Yes" : "No" }}</li>
                            </b-col>
                            <b-col md="7">
                                <li id="time">
                                    <img src="../assets/clock.png" height="20" width="20">
                                    {{ recipe.readyInMinutes }} minutes</li>
                                <li v-if="recipe.aggregateLikes" id="like">
                                    <img src="../assets/like1.webp" height="25" width="25">
                                    {{ recipe.aggregateLikes }} </li>
                                <li id="prep1" v-if="recipe.preparedBy">By: {{recipe.preparedBy}}</li>
                                <li id="prep2" v-if="recipe.preparedAt">At: {{recipe.preparedAt}}</li>
                            </b-col>
                        </b-row>
                    </b-card-text>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    import RecipePreviewUserInfo from "./RecipePreviewUserInfo";

    export default {
        name: "RecipePreview",
        components:{
            RecipePreviewUserInfo
        },
        props: {
            recipe: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style scoped>
    .recipe-preview {
        display: inline-block;
        width: 80%;
        height: 100%;
        position: relative;
        /*margin: 10px 10px;*/
        font-family: Calibri;

    }
    .recipe-preview > .recipe-body {
        width: 100%;
        height: 200px;
        position: relative;
        font-family: Calibri;
    }

    .recipe-preview .recipe-body {
        margin: auto;
        display: block;
        width: 100%;
        height: 100%;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        font-family: Calibri;
    }
    .recipe-footer .recipe-title {
        padding: 10px 10px;
        width: 100%;
        font-size: 10pt;
        font-family: Calibri;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        font-family: Calibri;
    }

    .recipe-footer ul.recipe-overview {
        padding: 5px 5px;
        width: 100%;
        display: -webkit-box;
        display: -moz-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -o-box-flex: 1;
        box-flex: 1;
        -webkit-flex: 1 auto;
        -ms-flex: 1 auto;
        flex: 1 auto;
        table-layout: fixed;
        margin-bottom: 0px;
        font-family: Calibri;
    }

    .recipe-preview .recipe-footer ul.recipe-overview li {
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -o-box-flex: 1;
        -ms-box-flex: 1;
        box-flex: 1;
        -webkit-flex-grow: 1;
        flex-grow: 1;
        width: 100px;
        display: table-cell;
        text-align: center;
        font-family: Calibri;
    }

    .b-card-text {
        font-family: Calibri;
        font-size: 10pt;
        margin-left: 2%;
        width: 100%;
        position: center;
    }
    .image{
        margin-left: 15%;
        padding: 1% 0 0 0;
        height: 80%;
        width: 80%;
        alignment: center;
    }
    .image:hover{
        cursor: pointer;
    }
    .RecipePreviewUserInfo{
        padding-right: 2%;
        margin-top: 3%;
    }
    #bcard{
        background-image: url("../assets/recipe3.jpg");
        background-color: rgba(255,255,255,0.8);
        background-blend-mode: lighten;
        margin-bottom: 1%;
    }
    @font-face {
        font-family: Satisfy;
        src: url(../assets/Satisfy-Regular.ttf);
    }
    h2{
        font-family: Satisfy;
        font-size: 24px;
        color: black;
        padding-top: 1%;
        margin-left: 3%;
    }
    #like, #vege, #glu, #vegan, #time, #prep1, #prep2{
        font-weight: bold;
    }
    #vege{
        color: green;
    }
    #vegan{
        color: #42b983;
    }
    #glu{
        color: darkgoldenrod;
    }
    #like{
        color: blue;
    }
    #time{
        color: crimson;
    }

</style>
