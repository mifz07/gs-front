<template>
    <div class="grid grid-1 gap-4">
        <h3 class="text-gray-500 text-[25px] font-bold">
            Meeting Room Management
        </h3>
    </div>
    <div class="mt-1">
        <small class="text-gray-400">
            <i>Meeting Room/Meeting Room Managament</i>
        </small>
    </div>

    <div class="card">
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

    <div class="mt-3 pagination">
        <!-- <Paginator :rows="10" :totalRecords="20" :rowsPerPageOptions="[10, 20, 30]" onPageChange="handlePageChange"></Paginator> -->
    </div>

    <div class="mt-3">
        <vue-awesome-paginate :total-items="totalItems"
            v-model="currentPage"
            :items-per-page="perPage"
            :max-pages-shown="5"
            :on-click="handlePageChange" />
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import authHeader from "../../service/auth-header";


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
            // total: '',
            type: '',
            // perPage: 5, // adjust perPage as needed
            totalItems: 100,
            keyword: '',
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
        this.handlePageChange(1)
    },
    methods: {
        handlePageChange(page) {
            this.page = this.currentPage
            axios({
                    method: 'get',
                    url: this.apiUrl + 'meeting_room',
                    headers: authHeader(), 
                    params: {
                        page: this.page,
                        perpage: this.perPage,
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    this.laravelData = response.data.data;
                    this.list_room = response.data.data;
                    // list_rooms.value = response.data.data;
                    this.totalItems = response.data.total;
                    // console.log(this.list_room)
            })
        },
    }

}
</script>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 0.5px solid rgb(104, 93, 93);
    color: #000000 !important;
    padding-left: 1em !important;
    padding-right: 1em !important;
    justify-content: center !important;
  }
  .paginate-buttons:hover {
    background-color: #00c3ff !important;
    color: white impr !important;
    /* border-color: #34ffdd !important; */
  }
  .active-page {
    background-color: #0092f3 !important;
    border: 1px solid #005d9b !important;
    color: white !important;
  }
  .active-page:hover {
    background-color: #2988c8 !important;
  }
  .text-green-500 {
    --tw-text-opacity: 1;
    color: rgb(34 197 94 / var(--tw-text-opacity)) !important;
}
</style>