<template>
    <div id="back">
       <h1 align="center">About us</h1>

        <div class="text-center">
            <p>Welcome to our recipes website!</p>
            <p>This website was created by Chen Galed and Oran Shichman, 3rd year students in BGU ISE department.</p>
            <br>
            <p>Check out our previous works: </p>
            <a href="https://sise-web-development-environments.github.io/assignment2-oran-chen/">Pacman online game</a>
            <br>
            <a href="https://sise-web-development-environments.github.io/203388426/">Oran's personal website</a>
            <br>
            <a href="https://sise-web-development-environments.github.io/311123541/">Chen's personal website</a>
            <br>
            <br>
            <p>Hope you would enjoy our website &#128540; </p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AboutPage"
    }
</script>

<style scoped>
    #back{
        background: blanchedalmond;
        opacity: 70%;
        width: 50%;
        alignment: center;
        margin-left: 27%;
        margin-top: 2%;
    }
    .text-center{
        font-family: "Berlin Sans FB";
        font-size: 20px;

    }
    @font-face {
        font-family: Satisfy;
        src: url(../assets/Satisfy-Regular.ttf);
    }
    h1{
        padding-top: 1%;
        font-family: Satisfy;
        font-weight: bold;
        font-size: 46px;
        color: blue;
        display: flex;
        margin-left: 38%;
    }
</style>