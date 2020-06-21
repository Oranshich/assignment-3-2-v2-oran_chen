<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand>
                <router-link
                        tag="a"
                        active-class="active"
                        :to="{ name: 'main' }"
                        exact>Home
                </router-link>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link
                                tag="a"
                                active-class="active"
                                :to="{ name: 'search' }"
                                exact> Search
                        </router-link>
                    </b-nav-item>
                    <b-nav-item-dropdown v-if="$root.store.username" text="Personal Area" right>
                        <b-dropdown-item>
                            <router-link
                                    tag="a"
                                    active-class="active"
                                    :to="{ name: 'myFavorites' }"
                                    exact>Favorite Recipes
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link
                                    tag="a"
                                    active-class="active"
                                    :to="{ name: 'myRecipes' }"
                                    exact>Personal Recipes
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link
                                    tag="a"
                                    active-class="active"
                                    :to="{ name: 'myFamilyRecipes' }"
                                    exact>Family Recipes
                            </router-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-dropdown v-if="!$root.store.username" id="dropdown-right" right text="Guest">
                        <b-dropdown-item>
                            <router-link
                                    tag="a"
                                    active-class="active"
                                    :to="{ name: 'login' }"
                                    exact>Login
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <router-link
                                    tag="a"
                                    active-class="active"
                                    :to="{ name: 'register' }"
                                    exact>Register
                            </router-link>
                        </b-dropdown-item>
                    </b-dropdown>
                    <b-dropdown v-if="$root.store.username" id="dropdown-right" :text=$root.store.username right>
                        <b-dropdown-item @click="Logout" href="#">Logout</b-dropdown-item>
                    </b-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "App",
        methods: {
            Logout() {
                this.$root.store.logout();
                this.$root.toast("Logout", "User logged out successfully", "success");

                this.$router.push("/").catch(() => {
                    this.$forceUpdate();
                });
            }
        }
    };
</script>

<style lang="scss">
    @import "./scss/form-style.scss";

    #app {
        /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-height: 100vh;
        font-family: Calibri;
    }

    #b-navbar {
        padding: 30px;
        margin-bottom: 30px;
        margin-top: 30px;
        padding: 30px;
        font-family: Calibri;

    }

    #b-navbar a {
        font-weight: bold;
        color: #2c3e50;
        font-family: Calibri;

    }

    #b-navbar a.router-link-exact-active {
        color: #42b983;
        font-family: Calibri;

    }
</style>
