import { createWebHistory, createRouter } from "vue-router";
import NotFound from '../views/NotFound.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import LoginPage from '../views/LoginComponent.vue';

// MEETING ROOM 
import RoomManagement from '../views/meetingroom/RoomManagement.vue';
// import ListRequest from '../views/meetingroom/ListRequest.vue';

const routes = [
    {
        path: "/login",
        component: LoginPage,
        name: 'login'
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
        name: 'NotFound'
    },
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/room/management",
        name: "Meeting Room",
        component: RoomManagement,
    },
    // {
    //     path: "/room/list_request",
    //     name: "ListRequest",
    //     component: ListRequest,
    // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//handle unauthorized user
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
});

export default router;