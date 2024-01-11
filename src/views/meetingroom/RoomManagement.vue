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

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-md text-gray-700 uppercase bg-slate-300 leading-9 text-center">
                <tr>
                    <td v-for="(item, index) in tableHeader" :key="index" class="leading-9 font-bold">
                        {{ item }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-200 even:bg-gray-50 even:dark:bg-gray-100 border-b dark:border-gray-700 text-gray-800 leading-9 text-center" 
                v-for="(item, index) in list_room" :key="index">
                    <td class="">
                        {{ (currentPage-1) * perPage + (index+1) + '.' }}
                    </td>
                    <td>{{ item.room_name }}</td>
                    <td>{{ item.floor }}</td>
                    <td>{{ item.facility }}</td>
                    <td>{{ item.available_start }}</td>
                    <td>{{ item.available_finish }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="mt-3 pagination">
        <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>

    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

// import the package
// import VueAwesomePaginate from "vue-awesome-paginate";
// import { FwbPagination } from 'flowbite-vue'
import Paginator from 'primevue/paginator';
// import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
// import {TailwindPagination} from 'laravel-vue-pagination'
// import Paginate from 'vuejs-paginate-next';

const list_rooms = ref({});

export default {
    name: 'RoomManagement',
    components: {
        Paginator
        // Paginate
        // TailwindPagination
        // VueAwesomePaginate
        // VueTailwindPagination,
    },
    data() {
        return {
            laravelData: {},
            currentPage: 1,
            perPage: 5,
            total: 20,
            pageNumber: 1,
            // currentPage: ref(1),
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
        console.log(this.apiUrl);
    },
    mounted(){
        this.handlePageChange(1)
    },
    methods: {
        handlePageChange(page) {
            console.log('masuk')
            axios({
                    method: 'get',
                    url: this.apiUrl + 'api/meeting_room',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2E0NTA2ZmE0MzU5OGRmNzQ2Y2VjNmVmODNhNTkzMTQ3OWVmMTQzZTY2MDQzYTNmMWM4MDJjOWQ5NmI1OTM2NGZlMjExZTUyY2I1MWE0MTQiLCJpYXQiOjE3MDQ0NzI0MDQuMjcwMTkzLCJuYmYiOjE3MDQ0NzI0MDQuMjcwMTk1LCJleHAiOjE3MzYwOTQ4MDQuMjEzOTY3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.GCT7Yvi0WLKPZnFG_DTk10pCsQGv6an7rzIOUuzWS2V9z77KO0h9O7ctFFrE8SGG0AWTwOthjUzBL3XWIeXT874cnzLO2dfJkv3gzstYMQhbKD7KAz6gWFR_1l7ZogcduYAnQZ_SpBts1l5ytqFN2fDZ_GFfnZ79PF5Ladb9F1PmA-e3Fq2i1p3Q4Ryvy_FuppuZVSrnY4RgXTZ8E5-uoVvlKlEAKp_qcK8lXmtZVafZEvFQzkVzNQJZ13LNXsGYN5GXD8vnDhoZjCGPwB7tHEcsR8fZyFumdg8x4s3X7ESmF_bKnlDqy4cTIYLuV_Adg0Pgeni3Y2p5rD5Sc7gAQ54uNUgBAGobb7oSWM1QmK5hI6jwebji5CV1DRsk4UcEVluS8l09Ht6b5wFa2G8URfD3Z7Ya-IZszKhEA6E63iG0Yg_8M0V5qTfhl4J_siFQ-YN1WQ-5ZnPF6XchWd_0he3ELPaFon7EXQgddJyccJoHkWy8VT6S7E3RjhdF6NXzDLIh09xgXKKhYGCQRW3r4Gt0EmibI9FaIcSOCsSYO7caSwIRl73nEOaZ5EsFLkLSqUQQSIYLRPXssn2UAWrB_p__Ttg8J_4kSBndeLkmT23bCFsmMuPDxzknCA5Phzj1ytGemwXY5FTY0wAIHARwxVIc0RI44HwzzkWwCVNScV4'
                    }, 
                    params: {
                        page: this.page,
                        perpage: this.perPage,
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    this.laravelData = response.data;
                    this.list_room = response.data.data;
                    list_rooms.value = response.data;
                    this.totalItems = response.data.total;
                    console.log(this.list_room)
            })
        },
    }

}
</script>

<style>
    /* Write your own CSS for pagination */
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
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
</style>