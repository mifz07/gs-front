<template>
    <!-- This is an example component -->
    <div class="tw-bg-gray-500 tw-text-white tw-min-h-screen tw-flex tw-items-center">
        <div class="tw-container tw-mx-auto tw-p-4 tw-flex tw-flex-wrap tw-items-center">
            <div class="tw-w-full md:tw-w-5/12 tw-text-center tw-p-4">
                <img src="../assets/notfound.png" alt="Not Found" />
            </div>
            <div class="tw-w-full md:tw-w-7/12 tw-text-center md:tw-text-left tw-p-4">
                <div class="tw-text-xl md:tw-text-3xl tw-font-medium tw-mb-4">
                    Oops. This page has gone missing.
                </div>
                <div class="tw-text-lg tw-mb-8">
                    You may have mistyped the address or the page may have moved.
                </div>
                <router-link to="/">
                    <a href="#" class="tw-border tw-border-white tw-rounded tw-p-4 hover:tw-text-sky-500 hover:tw-shadow-sm hover:tw-border-sky-300 hover:tw-bg-gray-100">Go Home</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name : 'NotFound'
}
</script>