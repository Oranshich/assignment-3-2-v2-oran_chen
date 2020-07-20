<template>
    <div class="container">
        <b-row>
            <b-col>
                <h1 class="title text-center">Register</h1>
            </b-col>
        </b-row>
        <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
            <b-form-group
                    id="input-group-username"
                    label-cols-sm="6"
                    label="Username:"
                    label-for="username">

                <b-form-input
                        id="username"
                        v-model="$v.form.username.$model"
                        type="text"
                        :state="validateState('username')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.username.required">
                    Username is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.username.length">
                    Username length should be between 3-8 characters long
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.username.alpha">
                    Username should contain only letters
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-firstName"
                    label-cols-sm="6"
                    label="First Name:"
                    label-for="firstName">
                <b-form-input
                        id="first name"
                        v-model="$v.form.firstName.$model"
                        type="text"
                        :state="validateState('firstName')"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.firstName.required">
                    First Name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
                    First Name length should be between 3-8 characters long
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
                    First Name should contain only letters
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-lastName"
                    label-cols-sm="6"
                    label="Last Name:"
                    label-for="lastName">
                <b-form-input
                        id="first name"
                        v-model="$v.form.lastName.$model"
                        type="text"
                        :state="validateState('lastName')"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.lastName.required">
                    Last Name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">
                    Last Name should contain only letters
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-country"
                    label-cols-sm="6"
                    label="Country:"
                    label-for="country"
            >
                <b-form-select
                        id="country"
                        v-model="$v.form.country.$model"
                        :options="countries"
                        :state="validateState('country')"
                ></b-form-select>
                <b-form-invalid-feedback>
                    Country is required
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-Password"
                    label-cols-sm="6"
                    label="Password:"
                    label-for="password"
            >
                <b-form-input
                        id="password"
                        type="password"
                        v-model="$v.form.password.$model"
                        :state="validateState('password')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.password.required">
                    Password is required
                </b-form-invalid-feedback>
                <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
                    Your password should be <strong>strong</strong>. <br/>
                    For that, your password should be also:
                </b-form-text>
                <b-form-invalid-feedback
                        v-if="$v.form.password.required && !$v.form.password.length"
                >
                    Have length between 5-10 characters long
                </b-form-invalid-feedback>
                <b-form-invalid-feedback
                    v-if="$v.form.password.required && !$v.form.password.specialCharacter"
                >
                    Have at least one special character
                </b-form-invalid-feedback>
                <b-form-invalid-feedback
                    v-if="$v.form.password.required && !$v.form.password.number"
                >
                    Have at least one number
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-confirmedPassword"
                    label-cols-sm="6"
                    label="Confirm Password:"
                    label-for="confirmedPassword"
            >
                <b-form-input
                        id="confirmedPassword"
                        type="password"
                        v-model="$v.form.confirmedPassword.$model"
                        :state="validateState('confirmedPassword')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
                    Password confirmation is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback
                        v-else-if="!$v.form.confirmedPassword.sameAsPassword"
                >
                    The confirmed password is not equal to the original password
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-email"
                    label-cols-sm="6"
                    label="Email:"
                    label-for="email">
                <b-form-input
                        id="email"
                        type="email"
                        v-model="$v.form.email.$model"
                        :state="validateState('email')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.email.required">
                    Email is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.email.email">
                    Email is required
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
                    id="input-group-profileImage"
                    label-cols-sm="6"
                    label="Profile Image:"
                    label-for="profileImage"
                    aria-placeholder="Profile Image URL">
                <b-form-input
                        id="profileImage"
                        type="url"
                        v-model="$v.form.profileImage.$model"
                        :state="validateState('profileImage')"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.profileImage.required">
                    Profile Image URL is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-else-if="!$v.form.profileImage.url">
                    Profile Image needs to be url
                </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button
                    type="submit"
                    variant="primary"
                    style="width:250px;"
                    class="ml-5 w-75"
            >Register
            </b-button
            >
            <div class="mt-2">
                You have an account already?
                <router-link to="login"> Log in here</router-link>
            </div>
        </b-form>
        <b-alert
                class="mt-2"
                v-if="form.submitError"
                variant="warning"
                dismissible
                show
        >
            Register failed: {{ form.submitError }}
        </b-alert>
    </div>
</template>

<script>
    import countries from "../assets/countries";
    import {
        required,
        minLength,
        maxLength,
        alpha,
        sameAs,
        email,
        url
    } from "vuelidate/lib/validators";

    export default {
        name: "Register",
        data() {
            return {
                form: {
                    username: "",
                    firstName: "",
                    lastName: "",
                    country: null,
                    password: "",
                    confirmedPassword: "",
                    email: "",
                    profileImage: "",
                    submitError: undefined
                },
                countries: [{value: null, text: "", disabled: true}],
                errors: [],
                validated: false
            };
        },
        validations: {
            form: {
                username: {
                    required,
                    length: (u) => minLength(3)(u) && maxLength(8)(u),
                    alpha
                },
                firstName: {
                    required,
                    alpha
                },
                lastName: {
                    required,
                    alpha
                },
                country: {
                    required
                },
                email: {
                    required,
                    email
                },
                profileImage: {
                    required,
                    url,
                },
                password: {
                    required,
                    length: (p) => minLength(5)(p) && maxLength(10)(p),
                    specialCharacter: (p) => /[\W|_]/.test(p),
                    number: (p) => /[0-9]/.test(p),
                    alpha: (p) => /[a-zA-Z]/.test(p)
                },
                confirmedPassword: {
                    required,
                    sameAsPassword: sameAs("password")
                }
            }
        },
        mounted() {
            // console.log("mounted");
            this.countries.push(...countries);
            // console.log($v);
        },
        methods: {
            validateState(param) {
                const {$dirty, $error} = this.$v.form[param];
                return $dirty ? !$error : null;
            },
            async Register() {
                try {
                    debugger
                    const response = await this.axios.post(
                        this.$root.store.prefixURL + "/register",
                        {
                            username: this.form.username,
                            password: this.form.password
                        });
                    this.$router.push("/login");
                    console.log("response message" + response.message);
                } catch (err) {
                    console.log(err.response.data.error.message);
                    this.form.submitError = err.response.data.error.message;
                    this.$root.toast("Register failed", err.response.data.error.message, "warning");
                }
            },
            onRegister() {
                this.form.submitError = undefined;
                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    return;
                }
                this.Register();
            },
            onReset() {
                this.form = {
                    username: "",
                    firstName: "",
                    lastName: "",
                    country: null,
                    password: "",
                    confirmedPassword: "",
                    email: "",
                    profileImage: ""
                };
                this.$nextTick(() => {
                    this.$v.$reset();
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        max-width: 500px;
        background: blanchedalmond;
        opacity: 80%;
        width: 50%;
        alignment: center;
        margin-left: 27%;
        margin-top: 2%;
        padding-top: 1%;
        padding-bottom: 2%;
        font-weight: bold;
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
