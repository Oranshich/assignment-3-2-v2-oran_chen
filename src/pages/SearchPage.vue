<template>
    <div class="container">
        <h1> Search Recipes</h1>
        <div class='is-icon is-searchPage' v-on:click='focus()'></div>
        <input class='is-field is-searchPage' type='text' ref='input' v-model='search_text' />
        <input class="is-button is-search-button" type="button" :value='this.text' v-on:click='searchRecipes' />
        <div>
            <b-form-select v-model="num" :options="options" size="sm" class="mt-3" ></b-form-select>
            <input type="checkbox" id="cuisine" v-model="checked">
            <label for="cuisine">cuisine</label>
        </div>
        <search-result :recipes="recipes" :num="num"  class="searchResult"/>
    </div>
</template>

<script>
    import SearchResult from "../components/SearchResult";
    export default {
        name : 'searchPage',
        components: {SearchResult},
        data(){
            return{
                search_text: "",
                recipes:[],
                num: '5',
                options: [
                    { value: '5', text: 'Please select number of recipes' },
                    { value: '5', text: '5' },
                    { value: '10', text: '10' },
                    { value: '15', text: '15' }
                ],
                checked:[]
            }
        },

        props:{
            "text":{
                type: String,
                default : "Search"
            }
        },

        methods : {
            clickOn : function() {
                // Execute request
                this.fetch();
            },

            async searchRecipes() {
                try {
                    const response = await this.axios.get(
                        //"http://assignment3-oranchen.herokuapp.com/search/query/:searchQuery/amount/:num",
                        "http://localhost:3000/search/query/:"
                        {
                            params:{
                                searchQuery: this.search_text,
                                num: this.selected
                            }
                        });

                    console.log(response);
                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
    .container {
        align-items: center;
        max-width: 400px;
    }
</style>