
<template>
    <div class="card flex justify-content-center">
        <div 
            class="layout-sidebar text-sm" 
            :class="{ 'layout-sidebar-active': visible }" 
            @mouseover="visible = true"
            @mouseleave="visible = false"
        >
            <div class="sidebar-logo h-auto drop-shadow-md">
                <div class="w-full pb-1">
                    <div class="flex justify-center items-center">
                        <img src="https://thispersondoesnotexist.com/" alt="" class="rounded-full w-[80px]">
                    </div>
                    <div class="text-white text-center font-semibold">
                        Assalamualaikum
                    </div>
                </div>
            </div>
            <div class="">
                <ul role="menu" class="text-white list-none">
                    <li 
                        v-for="menu in list_menu" :key="menu.label" 
                        class="hover:bg-sky-500 cursor-pointer px-4 transition-duration-150 transition-colors p-ripple"
                        :class="{ 'active bg-sky-700' : activeIndex == menu.label || ( activeIndex == '' && menu.label == 'Dashboard' ) || menu.label == pageName}"
                    >
                        <router-link :to="''+menu.link">
                            <a 
                                v-if="!menu.list.child"
                                v-ripple
                                class="w-full transition-duration-150 transition-colors p-ripple"
                                @click="activeIndex = menu.label, childIndex = ''"
                            >
                                
                                <div class="flex justify-between leading-[3.25em]" :class="menu.label" @click="logOut(menu.label)">
                                    <div class="flex-1"><span class="ml-2">{{ menu.label }}</span></div>
                                    <div class="flex-none"><span :class="menu.icon"></span></div>
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
                            class="w-full transition-duration-250 transition-colors p-ripple"
                        >
                            
                            <div class="flex justify-between leading-[3.25em]">
                                <div class="flex-1"><span class="ml-2">{{ menu.label }}</span></div>
                                <div class="flex-none"><span :class="menu.icon"></span></div>
                            </div>
                        </a>

                        <ul 
                            v-if="menu.list.child"
                            class="list-none pl-3 pr-1 m-0 hidden overflow-y-hidden transition-all transition-duration-400 ease-in-out animation-duration-400 leading-[5px] pb-2"
                            :class="{ 'hidden': !visible }"
                        >
                            <li 
                                v-for="item in menu.list.child" :key="item.label"
                                class="hover:bg-sky-700 hover:shadow-md hover:translate-x-1 hover:rounded-md mb-1 mt-1"
                                :class="{ 'bg-sky-700 translate-x-1 rounded-md' : childIndex == item.id || pageLink == item.link }"
                            >
                                <router-link :to="''+item.link">
                                    <a 
                                        v-ripple 
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
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
