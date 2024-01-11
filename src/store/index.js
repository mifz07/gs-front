import { createStore } from 'vuex'

const store = createStore({
    state: {
        list_menu : [            
            {
                label : "Dashboard",
                icon : "pi pi-chart-line",
                link : '/', 
                list : {}
            },
            {
                label : "Meeting Room",
                icon : "pi pi-book",
                list : {
                    child : [
                        { 
                            label : "Room Management",
                            id : 'room_management',
                            link : '/room/management', 
                            parent : 'Meeting Room' 
                        },
                        { 
                            label : "Schedule",
                            id : 'schedule' 
                        },
                        { 
                            label : "List Of Request",
                            id : 'list_request_room'
                        },
                        { 
                            label : "Create Request",
                            id : "create_request_room"
                        }
                    ],
                }
            },
            {
                label : "Fleet",
                icon : "pi pi-car",
                list : {
                    child : [
                        { 
                            label : "Fleet Management",
                            id : 'fleet_management'
                        },
                        { 
                            label : "List Of Request", 
                            id : 'list_requet_fleet'
                        },
                        { 
                            label :  "Create Request",
                            id : 'create_request_fleet'
                        }
                    ]
                }          
            },
            {
                label : "Office Stationery",
                icon : "pi pi-pencil",
                list : {
                    child : [
                        { 
                            label : "Management", 
                            id : 'stationery_management'
                        },
                        { 
                            label : "List Of Request",
                            id : 'list_request_stationery' 
                        },
                        { 
                            label : "Log",
                            id : 'log_request_stationery' 
                        },
                        { 
                            label :  "Create Request",
                            id : 'creat_request_stationery'
                        }
                    ]
                }          
            },
            {
                label : "GS Service",
                icon : "pi pi-comment",
                list : {
                    child : [
                        { 
                            label : "GS Service Request", 
                            id : 'gs_service_request'
                        },
                        { 
                            label : "List Of Request",
                            id : 'list_request_gs' 
                        }
                    ]
                }          
            },
            {
                label : "Card Request",
                icon : "pi pi-id-card",
                list : {
                    child : [
                        { 
                            label : "ID Card Request", 
                            id : 'id_card_request'
                        },
                        { 
                            label : "List Of Request",
                            id : 'list_request_card' 
                        },
                        {
                            label : "Access Location",
                            id : "access_location"
                        }
                    ]
                }          
            },
            {
                label : "Guest Book",
                icon : "pi pi-users",
                list : {
                    child : [
                        { 
                            label : "Request Guest", 
                            id : 'request_guest'
                        },
                        { 
                            label : "Manage Guest",
                            id : 'manage_guest' 
                        }
                    ]
                }          
            },
            {
                label : "Broadcasting Email",
                icon : "pi pi-megaphone",
                list : {}          
            },
            {
                label : "Information",
                icon : "pi pi-info-circle",
                list : {}          
            },
            {
                label : "Invoice Tracking",
                icon : "pi pi-tablet",
                list : {
                    child: [
                        {
                            label : 'Register',
                            id : 'register_invoice'
                        },
                        {
                            label : "list Of Invoice",
                            id : 'list_of_invouce'
                        }
                    ]
                }
            },
            {
                label : "Reimbusement",
                icon : "pi pi-file-edit",
                list : {
                    child: [
                        {
                            label : 'Requset Reimbuse',
                            id : 'request_reimbuse'
                        },
                        {
                            label : "Manage Request",
                            id : 'manage_request'
                        }
                    ]
                }
            },
            {
                label : "Management",
                icon : "pi pi-user-edit",
                list : {
                    child: [
                        {
                            label : 'Article Management',
                            id : 'article_management'
                        },
                        {
                            label : "User Management",
                            id : 'user_management'
                        },
                        {
                            label : "User Role",
                            id : "user_role"
                        },
                        {
                            label : "User Log",
                            id : "user_log"
                        }
                    ]
                }
            },
            {
                label : "logout",
                icon : "pi pi-power-off",
                list : {}
            }
        ]
    },
    mutations: {},
    actions: {},
    getters: {},
    modules: {},
});

export default store;