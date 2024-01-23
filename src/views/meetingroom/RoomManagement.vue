<template>
    <div class="tw-grid tw-grid-1 tw-gap-4">
        <h3 class="tw-text-gray-500 tw-text-[25px] tw-font-bold">
            Meeting Room Management
        </h3>
    </div>
    <div class="tw-mt-1">
        <small class="tw-text-gray-400">
            <i>Meeting Room/Meeting Room Managament</i>
        </small>
    </div>

    <div class="card tw-hidden">
        <DataTable :value="list_room" lazy stripedRows :size="small" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="room_name" header="Name"></Column>
            <Column field="floor" header="Floor"></Column>
            <Column field="facility" header="Facility"></Column>
            <Column field="available_start" header="Available For"></Column>
            <Column field="available_finish" header="Available To"></Column>
            <Column header="Status">
                <template #body="{ data }">
                    <i class="pi" :class="{ 'pi-check-circle text-green-500': data.status == 'available', 'pi-times-circle text-red-500': data.status == 'not available'}"></i>
                </template>
                <!-- <template #filter="{ filterModel }">
                    <label for="verified-filter" class="font-bold"> Verified </label>
                    <TriStateCheckbox v-model="filterModel.value" inputId="verified-filter" />
                </template> -->
            </Column>
        </DataTable>
    </div>

    <div class="mt-3">
        <Table 
            :list_data="list_room" 
            :list_header="list_header" 
            :currentPage="currentPage" 
            :perPage="perPage"
            :totalItems="totalItems"
            :editVar="room"
            :titleModal="titleModal"
            :canEdit=false
            :canDelete=true
            :canApprove=true
            @change-page="handlePage"
            @save-action="saveRoom"
            @delete-action="deleteRoom"
        ></Table>
    </div>

</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import authHeader from "../../service/auth-header";
import Table from "../table/TableComponent.vue";

// import { FwbPagination } from 'flowbite-vue'
import Paginator from 'primevue/paginator';
// import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
// import {TailwindPagination} from 'laravel-vue-pagination'
// import Paginate from 'vuejs-paginate-next';

// const list_rooms = ref();

export default {
    name: 'RoomManagement',
    components: {
        Paginator,
        Table
        // Paginate
        // TailwindPagination
        // VueAwesomePaginate
        // VueTailwindPagination,
    },
    data() {
        return {
            laravelData: ref(),
            currentPage: 1,
            perPage: 5,
            total: 20,
            pageNumber: 1,
            filter: ref(),
            list_room: ref({'data' : []}),
            list_header: {},
            // total: '',
            type: '',
            // perPage: 5, // adjust perPage as needed
            totalItems: 100,
            keyword: '',
            titleModal: 'Management Room Meeting',
            room : {
                    id: null,
                    room_name: '',
                    floor: '',
                    facility: '',
                    status: '',
                    available_start: null,
                    available_finish: null,
                    picture: ''
                },
            tableHeader: {
                'no' : 'No',
                'room_name' : "Room Name",
                'floor' : "Location",
                'facility' : "Facility",
                'available_from' : "Available From",
                'available_to' : "Available To",
                'action' : 'Action'
            }
        };
    },
    beforeCreate() {
        // console.log(this.apiUrl);
    },
    mounted(){
        this.handlePage(1)
    },
    methods: {
        handlePage(page) {
            console.log('ini dari emit', page)
            this.currentPage = page
            axios({
                    method: 'get',
                    url: this.apiUrl + 'meeting_room',
                    headers: authHeader(), 
                    params: {
                        page: this.currentPage,
                        perpage: this.perPage,
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    this.laravelData = response.data.data;
                    this.list_room = response.data.data;
                    this.list_header = response.data.header;
                    this.totalItems = response.data.total;
            })
        },
        saveRoom(room){
            console.log(room);
        },
        deleteRoom(room){
            console.log(room);
        }
    }

}
</script>

<style>
  
</style>