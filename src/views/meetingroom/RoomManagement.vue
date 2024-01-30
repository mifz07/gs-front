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

    <div class="mt-3">
        <TableComponent 
            :list_data="list_room" 
            :list_header="list_header" 
            :currentPage="currentPage" 
            :perPage="perPage"
            :totalItems="totalItems"
            :titleModal="titleModal"
            :canEdit=true
            :canDelete=true
            :canApprove=false
            @change-page="handlePage"
            @load-modal="show_modal"
            @show-modal="change_data"
            @hapus-action="deleteRoom"
        ></TableComponent>
    </div>

    <!-- Modal -->
    <dialog id="my_modal_4" class="tw-modal" :open="visible">
        <div class="tw-modal-box tw-w-11/12 tw-max-w-3xl">
            <h3 class="tw-font-bold tw-text-lg">{{ titleModal }}</h3>
            <div class="tw-divider"></div> 
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Room Name</span>
                </div>
                <input type="text" placeholder="Room Name" class="tw-input tw-input-bordered tw-input-sm tw-w-full tw-max-w-md" v-model="room.room_name" :disabled="!type_modal"/>
                </label>
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Location</span>
                </div>
                <input type="text" placeholder="Location" class="tw-input tw-input-bordered tw-input-sm tw-w-full tw-max-w-md" v-model="room.floor" :disabled="!type_modal" />
                </label>
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Facility</span>
                </div>
                <input type="text" placeholder="Exp: White board, TV, Large Table" class="tw-input tw-input-bordered tw-input-sm tw-w-full tw-max-w-md" v-model="room.facility" :disabled="!type_modal" />
                </label>
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Status</span>
                </div>
                <select class="tw-select tw-select-bordered tw-input-sm w-full max-w-md" v-model="room.status" :disabled="!type_modal">
                    <option disabled selected>Select Status</option>
                    <option value="available">Available</option>
                    <option value="not_available">Not Available</option>
                </select>
                </label>
            </div>
            <div class="tw-w-full flex tw-mt-3">
                <label class="tw-form-control tw-max-w-sm tw-justify-center">
                    <div class="tw-label">
                        <span class="tw-label-text">Available from : </span>
                    </div>
                </label>
                <div class="tw-w-[15vw]">
                    <VueDatePicker v-model="room.available_start" time-picker :disabled="!type_modal"></VueDatePicker>  
                </div>
                <!-- <input type="text" placeholder="" class="tw-ml-2 tw-input tw-input-bordered tw-input-sm tw-max-w-sm" v-model="room.available_start" />   -->

                <label class="tw-ml-4 tw-form-control tw-max-w-sm tw-justify-center">
                    <div class="tw-label">
                        <span class="tw-label-text">Available to : </span>
                    </div>
                </label>  
                <div class="tw-w-[15vw]">
                    <VueDatePicker v-model="room.available_finish" time-picker :disabled="!type_modal"></VueDatePicker>  
                </div>
                <!-- <input type="text" placeholder="" class="tw-ml-2 tw-input tw-input-bordered tw-input-sm tw-max-w-sm" v-model="room.available_finish" />               -->
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Picture</span>
                </div>
                <input type="file" class="tw-file-input tw-input-sm w-full max-w-xs" 
                @change="previewImage"    
                :disabled="!type_modal"
                />
                </label>
                <div class="tw-border tw-w-1/2 tw-p-2 tw-mt-3" v-if="preview != null">
                    <p>Image Preview</p>
                    <template v-if="preview">
                        <img :src="preview" class="tw-img-fluid tw-mt-2 tw-mb-2" />
                        <!-- <p class="tw-mb-0">file name: {{ image.name }}</p> -->
                        <!-- <p class="tw-mb-0">size: {{ image.size/1024 }}KB</p> -->
                    </template>
                </div>
            </div>
            <div class="tw-modal-action">
                <button class="tw-btn tw-btn-outline tw-btn-success tw-btn-sm tw-mr-2" :class="{'disable': loading_save}" @click="saveRoom">
                    <span v-if="!loading_save">Success</span>
                    <span class="tw-loading tw-loading-dots tw-loading-sm" v-if="loading_save"></span>
                </button>
                <button class="tw-btn tw-btn-outline tw-btn-error tw-btn-sm" @click="close_modal">Close</button>
            </div>
        </div>
    </dialog>

</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import authHeader from "../../service/auth-header";
import TableComponent from "../table/TableComponent.vue";
import {Blob} from 'buffer';


// import { FwbPagination } from 'flowbite-vue'
import Paginator from 'primevue/paginator';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
// import {TailwindPagination} from 'laravel-vue-pagination'
// import Paginate from 'vuejs-paginate-next';

// const list_rooms = ref();

export default {
    name: 'RoomManagement',
    components: {
        Paginator,
        TableComponent,
        VueDatePicker
        // Paginate
        // TailwindPagination
        // VueAwesomePaginate
        // VueTailwindPagination,
    },
    data() {
        return {
            // laravelData: ref(),
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
            },
            visible: false, // for modal
            preview : null, // for image preview
            image : null, // for hold data image
            preview_list : [], // for multiple image preview
            image_list : [], // for hold multiple data image
            loading_save: false, // loading for button save
            type_modal: true // for type modal (detail, edit)
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
            // get list room data
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
        show_modal(){ // for create new room
            this.visible = true;
        },
        close_modal(){
            this.visible = false;
            this.room = {
                    id: null,
                    room_name: '',
                    floor: '',
                    facility: '',
                    status: '',
                    available_start: null,
                    available_finish: null,
                    picture: ''
            };
            this.preview = null;
            this.image = null;
            this.preview_list = [];
            this.image_list = [];
            this.loading_save= false;
            this.type_modal = true;
        },
        previewImage(event, path) {
            if(!event){
                this.preview = this.baseUrl + 'image/meeting_room/' + path;
                if (this.preview) {
                    const filename = this.preview.split('/').pop();
                    const imageFile = new File([Blob], filename, { type: 'image/jpeg,jpg,png' });
                    
                    var reader = new FileReader();
                    this.image = imageFile;
                    // this.room.picture = imageFile;
                    // console.log(this.room.picture);
                    reader.readAsDataURL(imageFile);
                }
            }else{
                var input = event.target;
                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        if(e.target.result == null){
                            this.preview = [];
                        }else{
                            this.preview = e.target.result;
                        }
                    }
                    this.image=input.files[0];
                    this.room.picture=input.files[0];
                    reader.readAsDataURL(input.files[0]);
                }
            }
        },
        previewMultiImage(event){
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            if (input.files) {
                while(count --) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        preview_list.push(e.target.result);
                    }
                    image_list.push(input.files[index]);
                    reader.readAsDataURL(input.files[index]);
                    index ++;
                }
            }
        },
        reset(){
            this.image = null;
            this.preview = null;
            this.image_list = [];
            this.preview_list = [];
        },
        change_data(data){ // for view, edit room
            this.type_modal = data.type;
            var datas = data.data;
            var start = datas.available_start.split(':');
            var finish = datas.available_finish.split(':');
            var start_hour = start[0];
            var start_min = start[1];
            var finish_hour = finish[0];
            var finis_min = finish[1];
            this.room = {
                    id: datas.id,
                    room_name: datas.room_name,
                    floor: datas.floor,
                    facility: datas.facility,
                    status: datas.status,
                    available_start: { hours: start_hour, minutes: start_min },
                    available_finish: { hours: finish_hour, minutes: finis_min },
                    picture: datas.picture
            };
            this.visible = true;
            this.previewImage('', this.room.picture)

        },
        saveRoom(){
            this.loading_save = true;
            var formData = new FormData();
            formData.append("picture", this.room.picture);
            formData.append("room_name", this.room.room_name);
            formData.append("floor", this.room.floor);
            formData.append("facility", this.room.facility);
            formData.append("status", this.room.status);            
            formData.append("available_start", this.room.available_start.hours +':'+ (this.room.available_start.minutes < 10 ? '0' + this.room.available_start.minutes : this.room.available_start.minutes) );
            formData.append("available_finish", this.room.available_finish.hours +':'+ (this.room.available_finish.minutes < 10 ? '0' + this.room.available_finish.minutes : this.room.available_finish.minutes) );

            if(!this.room.id){
                var method = 'post';
                var url = this.apiUrl + 'meeting_room';
            }else{
                var method = 'post';
                var url = this.apiUrl + 'meeting_room/' + this.room.id+'?_method=PUT';
            }

            axios({
                method: method,
                url: url,
                headers: authHeader(), 
                data: formData
            }).then((response) => {
                // console.log(response);
                if(!response.data.status){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: response.data.status,
                    });
                    this.loading_save = false;
                }else{
                    this.handlePage(this.currentPage);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: "Save Room Successfully!",
                    })
                    .then((result) => {
                        if(result)
                            this.close_modal();
                    });
                }
            });
        },
        deleteRoom(room){
            Swal.fire({
                icon: 'warning',
                tittle: 'Warning',
                text: 'Are you sure want to delete this room?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'No'
            }).then((result) => {
                if(result.isConfirmed){

                    axios({
                        method: 'delete',
                        url: this.apiUrl + 'meeting_room/' + room.id,
                        headers: authHeader(),
                    }).then((response) => {
                        if(response.data.status)
                        {
                            this.handlePage(this.currentPage);
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: "Delete Room Successfully!"
                            });
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!!',
                                text: 'Delete Data Failed'
                            })
                        }
                    }).catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.message
                        });
                    })
                }
            })
        },

    }

}
</script>

<style>
  .tw-modal{
    background-color: rgba(0,0,0,.4) !important;
  }
</style>