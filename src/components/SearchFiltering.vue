<template>
  <div>
    <multiselect v-on:close="addSelect('cuisine')" v-model="cuisine" :options="cuisineOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Filter by cuisine" label="name" track-by="name" :preselect-first="false">
      <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.name }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
      <template slot="clear" slot-scope="props">
        <div class="multiselect__clear" v-if="cuisine.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
      </template>
    </multiselect>
    <multiselect v-on:close="addSelect('diet')" v-model="diet" :options="dietOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Filter by diet" label="name" track-by="name" :preselect-first="false">
      <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.name }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
      <template slot="clear" slot-scope="props">
        <div class="multiselect__clear" v-if="diet.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
      </template>
    </multiselect>
    <multiselect v-on:close="addSelect('intolerance')" v-model="intolerance" :options="intoleranceOptions" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Filter by intolerance" label="name" track-by="name" :preselect-first="false">
      <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.name }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
      <template slot="clear" slot-scope="props">
        <div class="multiselect__clear" v-if="intolerance.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
      </template>
    </multiselect>
  </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    export default {

        components:{
            Multiselect
        },
        name: "SearchFiltering",
        data(){
            return{
                cuisine: [],
                cuisineOptions:[{name:'African'},{name:'American'},{name:'British'},{name:'Cajun'},{name:'Caribbean'},{name:'Chinese'},{name:'Eastern European'},{name:'European'},{name:'French'},
                    {name:'German'},{name:'Greek'},{name:'Indian'},{name:'Irish'},{name:'Italian'},{name:'Japanese'},{name:'Jewish'},{name:'Korean'},{name:'Latin American'},{name:'Med'}],
                isLoading: false,
                diet: [],
                dietOptions : [{name:'Gluten Free'},{name:'Ketogenic'},{name:'Vegetarian'},{name:'Lacto-Vegetarian'},{name:'Ovo-Vegetarian'},{name:'Vegan'},{name:'Pescetarian'},{name:'Paleo'},{name:'Primal'},{name:'Whole30'}],
                intolerance: [],
                intoleranceOptions: [{name:'Dairy'},
                    {name:'Egg'},
                    {name:'Gluten'},
                    {name:'Grain'},
                    {name:'Peanut'},
                    {name:'Seafood'},
                    {name:'Sesame'},
                    {name:'Shellfish'},
                    {name:'Soy'},
                    {name:'Sulfite'},
                    {name:'Tree Nut'},
                    {name:'Wheat'}]
            }
        },

        created() {
           this.updateFilters();
        },
        methods:{
            clearAll () {
            },
            addSelect(type){
                if(type === 'cuisine'){
                    this.$emit('childToParent', {name: 'cuisine', value: this.cuisine});
                }
                else if(type === 'diet'){
                    this.$emit('childToParent', {name: 'diet', value: this.diet});
                }
                if(type === 'intolerance'){
                    this.$emit('childToParent', {name: 'intolerance', value: this.intolerance});
                }
            },
            updateFilters(){
                if(this.$session.exists('cuisine')){
                    this.cuisine = this.$session.get('cuisine');
                    this.addSelect('cuisine');
                }
                if(this.$session.exists('diet')){
                    this.diet = this.$session.get('diet');
                    this.addSelect('diet');
                }
                if(this.$session.exists('intolerance')){
                    this.intolerance = this.$session.get('intolerance');
                    this.addSelect('intolerance');
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