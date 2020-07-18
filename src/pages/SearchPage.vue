<template>
    <div>
        <div class="container">
            <h1 class="title"> Search Recipes</h1>
            <div class='is-icon is-searchPage' v-on:click='focus()'></div>
            <input class='is-field is-searchPage' type='text' ref='input' v-model='search_text' size="42"/>
            <input class="is-button is-search-button" type="button" :value='this.text' v-on:click='searchRecipes'/>
            <div class="numOptions">
                <b-form-select v-model="num" :options="numOptions" size="md" class="mt-5"></b-form-select>
            </div>
            <SearchFiltering class="SearchFiltering" v-on:childToParent="onFilter"></SearchFiltering>
        </div>
        <br>
        <SearchResult class="SearchResult" title="" style="font-weight: bold; font-family: Satisfy" :recipes="recipes"/>
    </div>

</template>

<script>
    import SearchFiltering from "../components/SearchFiltering";
    import SearchResult from "../components/SearchResult";

    export default {
        name: 'searchPage',
        components: {
            SearchResult,
            SearchFiltering
        },
        data() {
            return {
                search_text: "",
                recipes: [],
                num: '5',
                numOptions: [
                    {value: '5', text: 'Please select number of recipes'},
                    {value: '5', text: '5'},
                    {value: '10', text: '10'},
                    {value: '15', text: '15'}
                ],
                filterCuisine: [],
                filterDiet: [],
                filterIntolerance: [],
            }
        },
        created() {
            //  this.cuisineOptions = this.options;

        },
        mounted() {
            this.updateFields();

        },

        props: {
            "text": {
                type: String,
                default: "Search"
            }
        },


        methods: {
            clickOn: function () {
                // Execute request
                this.fetch();
            },

            async searchRecipes() {

                if (this.$session.exists('sortOption')) {
                    this.$session.remove('sortOption');
                }

                let filerText = this.getFilters();
                this.searchClicked = true;
                try {
                    if(this.search_text.length > 0) {
                        const response = await this.axios.get(
                            //"http://assignment3-oranchen.herokuapp.com/search/query/:searchQuery/amount/:num",
                            this.$root.store.prefixURL + "/recipes/search/query/" + this.search_text + "/amount/" + this.num + "?" + filerText
                            //"http://localhost:3000/recipes/search/query/"+ this.search_text + "/amount/" + this.num + "?" + filerText
                        );

                        const recipes = response.data;
                        if (recipes.length === 0) {
                            this.$root.toast("Search Results", "Didnt find any results for your search", "warning");
                        }
                        this.recipes = [];
                        this.recipes.push(...recipes);

                        if (this.$root.store.username) {
                            this.$session.set('searchResult', recipes);
                            this.$session.set('searchText', this.search_text);
                            this.$session.set('searchNum', this.num);

                            if (this.filterCuisine) {
                                this.$session.set('cuisine', this.filterCuisine);
                            }

                            if (this.filterCuisine) {
                                this.$session.set('intolerance', this.filterIntolerance);

                            }
                            if (this.filterDiet) {
                                this.$session.set('diet', this.filterDiet);

                            }
                        }
                    }else{
                        this.$root.toast("Search Results", "Please enter a text before you search", "danger");
                    }
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            },
            limitText(count) {
                return `and ${count} other countries`
            },
            getFilters() {
                debugger
                let filterText = "";
                if(this.filterCuisine.length > 0){
                    filterText = filterText + "cuisine=";
                }

                for (let i = 0; i < this.filterCuisine.length; i++) {
                    filterText = filterText + this.filterCuisine[i].name + ",";
                }

                if(this.filterCuisine.length > 0){
                    filterText = filterText.substring(0, filterText.length - 1);
                    filterText = filterText + "&";
                }
                if(this.filterDiet.length > 0){
                    filterText = filterText + "diet=";
                }

                for (let i = 0; i < this.filterDiet.length; i++) {
                    filterText = filterText + this.filterDiet[i].name + ",";
                }

                if(this.filterDiet.length > 0){
                    filterText = filterText.substring(0, filterText.length - 1);
                    filterText = filterText + "&";
                }
                if(this.filterIntolerance.length > 0){
                    filterText = filterText + "intolerances=";
                }

                for (let i = 0; i < this.filterIntolerance.length; i++) {
                    filterText = filterText + this.filterIntolerance[i].name + ",";
                }

                // for (let i = 0; i < this.filterCuisine.length; i++) {
                //     filterText = filterText + "cuisine=" + this.filterCuisine[i].name + "&";
                // }
                //
                //
                // for (let i = 0; i < this.filterDiet.length; i++) {
                //     filterText = filterText + "diet=" + this.filterDiet[i].name + "&";
                // }
                //
                // for (let i = 0; i < this.filterIntolerance.length; i++) {
                //     filterText = filterText + "intolerance=" + this.filterIntolerance[i].name + "&";
                // }

                if(filterText.length > 0){
                    return filterText.substring(0, filterText.length - 1);
                }

                return filterText;

            },

            onFilter(value) {
                if (value.name === 'cuisine') {
                    //console.log(value.value[0].name);
                    this.filterCuisine = value.value;
                } else if (value.name === 'diet') {
                    this.filterDiet = value.value;
                } else {
                    this.filterIntolerance = value.value;
                }
            },
            updateFields() {
                if (this.$session.exists('resultFiltered')) {
                    const recipes = this.$session.get('resultFiltered');
                    this.recipes.push(...recipes);
                } else if (this.$session.exists('searchResult')) {
                    const recipes = this.$session.get('searchResult');
                    this.recipes.push(...recipes);
                }

                if (this.$session.exists('searchText')) {
                    this.search_text = this.$session.get('searchText');
                }

                if (this.$session.exists('searchNum')) {
                    this.num = this.$session.get('searchNum');
                }
            }
        },

    }
</script>
<style lang="scss" scoped>
    .container {
        align-items: center;
        background: blanchedalmond;
        opacity: 80%;
        width: 50%;
        alignment: center;
        padding-top: 3%;
        padding-bottom: 2%;
        margin-top: 2%;
    }
    .numOptions, .SearchFiltering {
        align-items: center;
        width: 400px;
    }
    @font-face {
        font-family: Satisfy;
        src: url(../assets/Satisfy-Regular.ttf);
    }
    h1{
        font-family: Satisfy;
        font-size: 40px;
        color: black;
    }

</style>