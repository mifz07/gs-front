
<template>
    <div class="tw-card tw-flex tw-justify-content-center">
        <div 
            class="layout-sidebar tw-text-sm" 
            :class="{ 'layout-sidebar-active': visible }" 
            @mouseover="visible = true"
            @mouseleave="visible = false"
        >
            <div class="sidebar-logo tw-h-auto tw-drop-shadow-md">
                <div class="tw-w-full tw-pb-1">
                    <div class="tw-flex tw-justify-center tw-items-center">
                        <img src="https://thispersondoesnotexist.com/" alt="" class="tw-rounded-full tw-w-[80px]">
                    </div>
                    <div class="tw-text-white tw-text-center tw-font-semibold">
                        Assalamualaikum
                    </div>
                </div>
            </div>
            <div class="">
                <ul role="menu" class="tw-text-white list-none">
                    <li 
                        v-for="menu in list_menu" :key="menu.label" 
                        class="hover:tw-bg-sky-500 tw-cursor-pointer tw-px-4 tw-transition-duration-150 tw-transition-colors p-ripple"
                        :class="{ 'active tw-bg-sky-700' : activeIndex == menu.label || ( activeIndex == '' && menu.label == 'Dashboard' ) || menu.label == pageName}"
                    >
                        <router-link :to="''+menu.link">
                            <a 
                                v-if="!menu.list.child"
                                v-ripple
                                class="tw-w-full tw-transition-duration-150 tw-transition-colors p-ripple"
                                @click="activeIndex = menu.label, childIndex = ''"
                            >
                                
                                <div class="tw-flex tw-justify-between tw-leading-[3.25em]" :class="menu.label" @click="logOut(menu.label)">
                                    <div class="tw-flex-1"><span class="tw-ml-2">{{ menu.label }}</span></div>
                                    <div class="tw-flex-none"><span :class="menu.icon"></span></div>
                                </div>
                            </a>
                        </router-link>

                        <a 
                            v-if="menu.list.child"
                            v-styleclass="{
                                selector: '@next',
                                enterClass: 'hidden',
                                enterActiveClass: 'slidedown',
                                leaveToClass: 'hidden',
                                leaveActiveClass: 'slideup',
                                hideOnOutsideClick: true
                            }"
                            class="tw-w-full tw-transition-duration-250 tw-transition-colors p-ripple"
                        >
                            
                            <div class="tw-flex tw-justify-between tw-leading-[3.25em]">
                                <div class="tw-flex-1"><span class="tw-ml-2">{{ menu.label }}</span></div>
                                <div class="tw-flex-none"><span :class="menu.icon"></span></div>
                            </div>
                        </a>

                        <ul 
                            v-if="menu.list.child"
                            class="tw-list-none tw-pl-3 tw-pr-1 tw-m-0 hidden overflow-y-hidden transition-all transition-duration-400 ease-in-out animation-duration-400 tw-leading-[5px] tw-pb-2"
                            :class="{ 'hidden': !visible }"
                        >
                            <li 
                                v-for="item in menu.list.child" :key="item.label"
                                class="hover:tw-bg-sky-700 hover:tw-shadow-md hover:tw-translate-x-1 hover:tw-rounded-md tw-mb-1 tw-mt-1"
                                :class="{ 'tw-bg-sky-700 tw-translate-x-1 tw-rounded-md' : childIndex == item.id || pageLink == item.link }"
                            >
                                <router-link :to="''+item.link">
                                    <a 
                                        v-ripple 
                                        class="tw-flex tw-align-items-center tw-cursor-pointer tw-p-3 tw-border-round tw-text-700 tw-hover:surface-100 tw-transition-duration-150 tw-transition-colors p-ripple"
                                        @click="activeIndex = menu.label, childIndex = item.id"
                                    >
                                        {{ item.label }}
                                    </a>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>  
            </div>
        </div>
        <!-- <Button icon="pi pi-bars" @click="visible = true" /> -->
    </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
    name: 'SideComponent',
    data() {
        return {
            visible : false,
            activeIndex : '',
            childIndex : '',
            list_menu : ref(this.$store.state.list_menu),
            pageLink : '',
            pageName : '',
        }
    },
    mounted() {
        // this.pageName = this.$route.name,
    },
    watch: {
        $route(curRoute) {
            this.pageName = curRoute.name
            this.pageLink = curRoute.path
            this.activeIndex = curRoute.name
            // console.log(localStorage.getItem('user'))
        },
    },
    methods:{
        logOut(label) {
            if(label == 'Logout'){
                console.log(label);
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            }
        }
    }
}
</script>

<style>
    
</style>
