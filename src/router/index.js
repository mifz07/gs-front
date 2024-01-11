import { createWebHistory, createRouter } from "vue-router";
import NotFound from '../views/NotFound.vue';

import Dashboard from '../views/dashboard/Dashboard.vue'

// MEETING ROOM 
import RoomManagement from '../views/meetingroom/RoomManagement.vue';
// import ListRequest from '../views/meetingroom/ListRequest.vue';

const routes = [
    {
        path: "/:catchAll(.*)",
        component: NotFound,
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

export default router;