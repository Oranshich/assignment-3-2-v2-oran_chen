<template>
    <div>
        <multiselect v-show="recipes.length > 0" v-on:close="selectedSort" v-model="filters" :options="filterOptions" :multiple="false" :close-on-select="true" :searchable="false" :clear-on-select="false" :preserve-search="true" placeholder="Sort by:" label="name" track-by="name" >
        </multiselect>
        <RecipePreviewResults title="Search Result" :recipes="results"/>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import RecipePreviewResults from "./RecipePreviewResults";
    export default {
        data(){
            return{
                filterOptions:[{ name:'Preparation Time'},{ name:'Popularity'}],
                filters:  [],
                sortByPop:[],
                sortByPrep: [],
                unsorted: [],
                results: []
            }
        },
        mounted() {
            this.updateSort();
            this.filters = [];
        },
        watch: {
            recipes(){
                this.results = [];
                this.results.push(...this.recipes);
                this.unsorted = [];
                this.unsorted.push(...this.recipes);
                if(this.$session.exists('sortOption')){
                    this.filters = this.$session.get('sortOption');
                }
                else{
                    this.filters = [];
                }
            },
        },
        components:{
            Multiselect,
            RecipePreviewResults
        },
        name: "SearchResult",
        props:{
            title: {
                type: String,
                required: true
            },
            recipes: {
                type: Array,
                required: true
            },
        },
        methods:{
            selectedSort(){
                //this.sortBy();
                if (this.filters) {
                    if (this.filters.name === 'Popularity') {
                        this.results.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
                    } else if (this.filters.name === 'Preparation Time') {
                        this.results.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
                    }
                    this.$session.set('resultFiltered', this.results);
                    this.$session.set('sortOption', this.filters);
                }
                else{
                    this.results = [];
                    this.results.push(...this.unsorted);
                }
            },

            updateSort(){
                if(this.$session.exists('resultFiltered')){
                    console.log("resultFiltered")
                    const recipes = this.$session.get('resultFiltered');
                    this.results.push(...recipes);
                }

                if(this.$session.exists('sortOption')){
                    console.log("sortOption")
                    this.filters = this.$session.get('sortOption');

                }
            }
        }

    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
    .multiselect{
        align-items: center;
        width: 400px;
    }
</style>