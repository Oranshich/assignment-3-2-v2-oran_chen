<template>
    <div id="app">
        <NavBarComponent></NavBarComponent>
        <router-view/>
    </div>
</template>

<script>
    import NavBarComponent from "./components/NavBarComponent";
    export default {
        name: "App",
        components:{
            NavBarComponent
        }
    };
</script>

<style lang="scss">
    @import "./scss/form-style.scss";

    #app {
        /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 100vh;
        font-family: Calibri;
        font-size: 20px;
        background-image: url("./assets/spices-background-1.jpg");
        background-color: rgba(255,255,255,0.6);
        background-blend-mode: lighten;
    }

</style>
