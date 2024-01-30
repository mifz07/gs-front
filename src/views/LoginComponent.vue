<template>
    <div>
        <div class="tw-flex tw-min-h-full tw-flex-col tw-justify-center tw-px-6 tw-py-12 tw-lg:px-8">
            <div class="sm:tw-mx-auto sm:tw-w-full sm:tw-max-w-sm">
                <img class="tw-mx-auto tw-h-10 tw-w-auto" src="../assets/logo.png" alt="Your Company">
                <h2 class="tw-mt-10 tw-text-center tw-text-2xl tw-font-bold tw-leading-9 tw-tracking-tight tw-text-gray-900">General Support Login</h2>
            </div>

            <div class="tw-mt-10 sm:tw-mx-auto sm:tw-w-full sm:tw-max-w-sm tw-rounded-md tw-shadow-md tw-p-3">
                <form class="tw-space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">Email address</label>
                    <div class="tw-mt-2">
                    <input id="email" name="email" type="email" v-model="user.email" autocomplete="email" required class="tw-px-2 tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6">
                    </div>
                </div>

                <div>
                    <div class="tw-flex tw-items-center tw-justify-between">
                    <label for="password" class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">Password</label>
                    <div class="text-sm">
                        <a href="#" class="tw-font-semibold tw-text-indigo-600 hover:tw-text-indigo-500">Forgot password?</a>
                    </div>
                    </div>
                    <div class="mt-2">
                    <input id="password" name="password" type="password" v-model="user.password" autocomplete="current-password" required class="tw-px-2 tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 placeholder:tw-text-gray-400 focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-indigo-600 sm:tw-text-sm sm:tw-leading-6">
                    </div>
                </div>

                <div class="text-center">
                    <button @click="login" type="button" class="tw-text-white tw-bg-gradient-to-r tw-from-purple-500 tw-via-purple-600 tw-to-purple-700 hover:tw-bg-gradient-to-br focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-purple-300 dark:focus:tw-ring-purple-800 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center tw-me-2 tw-mb-2">Sign In</button>
                </div>
                </form>

                <p class="tw-mt-10 tw-text-center tw-text-sm tw-text-gray-500">
                Not have a account yet?
                <a href="#" class="tw-font-semibold tw-leading-6 tw-text-blue-500 hover:tw-text-indigo-500">Sign Up</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import User from '../model/model.js';
    export default{
        name: 'Login',
        data(){
            return {
                user: new User('', ''),
                loading: false,
                message: ''
            }
        },
        created() {
            if (this.loggedIn) {
                this.$router.push('/profile');
            }
        },
        methods:{
            login(){
                console.log(this.user)
                if (this.user.email && this.user.password) {
                    this.$store.dispatch('auth/login', this.user).then(
                        () => {
                            this.$router.push('/');
                        },
                        error => {
                            this.loading = false;
                            this.message =
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                        }
                    );
                }
            }
        }
    }


</script>