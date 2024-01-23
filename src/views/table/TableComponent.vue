<template>

    <div class="tw-w-full text-right tw-mb-2">
        <button 
            data-modal-target="default-modal" data-modal-toggle="default-modal"
            onclick="my_modal_4.showModal()"
            class="tw-bg-green-500 hover:tw-bg-green-400 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-inline-flex tw-items-center">
            <i class="pi pi-plus mr-2"></i>
            <span>Add</span>
        </button>
    </div>

    <div class="tw-w-full tw-bg-sky-200 tw-rounded-md tw-shadow-md">
        <div class="table tw-w-full">
            <table class="tw-w-full">
                <thead class="tw-text-center tw-font-semibold tw-text-sm">
                    <tr>
                        <td class="tw-p-2 tw-pl-1 tw-pr-1" v-for="(item) in list_header" :key="item">
                            {{ item }}
                        </td>
                    </tr>
                </thead>
                <tbody class="tw-text-left tw-font-normal tw-text-sm tw-leading-[10px] tw-bg-white">
                    <tr 
                        v-for="(val, key) in list_data" :key="val.room_name" 
                        class="hover:tw-bg-sky-100 hover:tw-shadow-md hover:tw-translate-x-1"
                        :class="{ 'tw-bg tw-bg-slate-100' : parseInt(key) % 2 == 0 }"
                    >
                        <td class="tw-p-2 tw-leading-normal">{{ val.room_name }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.floor }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.facility }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.available_start }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.available_finish }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.status }}</td>
                        <td>
                            <div class="flex tw-align-middle tw-justify-center">
                                <Button icon="pi pi-eye" severity="info" rounded outlined aria-label="Filter" size="small" style="padding-left: 5px; padding-right: 5px;"/>
                                <Button v-if="canEdit" icon="pi pi-pencil" severity="warning" rounded outlined aria-label="Filter" size="small" style="padding-left: 5px; padding-right: 5px;"/>
                                <Button v-if="canApprove" icon="pi pi-check" severity="success" rounded outlined aria-label="Filter" size="small" style="padding-left: 5px; padding-right: 5px;"/>
                                <Button v-if="canDelete" icon="pi pi-times" severity="danger" rounded outlined aria-label="Filter" size="small" style="padding-left: 5px; padding-right: 5px;"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="tw-mt-3 text-right">
        <vue-awesome-paginate 
            :total-items="totalItems"
            v-model="currentPage"
            :items-per-page="perPage"
            :max-pages-shown="5"
            :on-click="handlePageChange" />
    </div>

    <!-- Modal -->
    <dialog id="my_modal_4" class="tw-modal">
        <div class="tw-modal-box tw-w-11/12 tw-max-w-3xl">
            <h3 class="tw-font-bold tw-text-lg">{{ titleModal }}</h3>
            <div class="tw-divider"></div> 
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Room Name</span>
                </div>
                <input type="text" placeholder="Room Name" class="tw-input tw-input-bordered tw-input-sm tw-w-full tw-max-w-md" v-model="editVar.room_name" />
                </label>
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Location</span>
                </div>
                <input type="text" placeholder="Location" class="tw-input tw-input-bordered tw-input-sm tw-w-full tw-max-w-md" v-model="editVar.floor" />
                </label>
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Facility</span>
                </div>
                <input type="text" placeholder="Exp: White board, TV, Large Table" class="tw-input tw-input-bordered tw-input-sm tw-w-full tw-max-w-md" v-model="editVar.facility" />
                </label>
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Status</span>
                </div>
                <select class="tw-select tw-select-bordered tw-input-sm w-full max-w-md" v-model="editVar.status">
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
                    <VueDatePicker v-model="editVar.available_start" time-picker></VueDatePicker>  
                </div>
                <!-- <input type="text" placeholder="" class="tw-ml-2 tw-input tw-input-bordered tw-input-sm tw-max-w-sm" v-model="editVar.available_start" />   -->

                <label class="tw-ml-4 tw-form-control tw-max-w-sm tw-justify-center">
                    <div class="tw-label">
                        <span class="tw-label-text">Available to : </span>
                    </div>
                </label>  
                <div class="tw-w-[15vw]">
                    <VueDatePicker v-model="editVar.available_finish" time-picker></VueDatePicker>  
                </div>
                <!-- <input type="text" placeholder="" class="tw-ml-2 tw-input tw-input-bordered tw-input-sm tw-max-w-sm" v-model="editVar.available_finish" />               -->
            </div>
            <div class="tw-mt-3">
                <label class="tw-form-control tw-w-full tw-max-w-md">
                <div class="tw-label">
                    <span class="tw-label-text">Picture</span>
                </div>
                <input type="file" class="tw-file-input tw-input-sm w-full max-w-xs" 
                @change="previewImage"    
                />
                </label>
                <div class="tw-border tw-w-1/2 tw-p-2 tw-mt-3" v-if="preview != null">
                    <p>Image Preview</p>
                    <template v-if="preview">
                        <img :src="preview" class="tw-img-fluid tw-mt-2 tw-mb-2" />
                        <p class="tw-mb-0">file name: {{ image.name }}</p>
                        <p class="tw-mb-0">size: {{ image.size/1024 }}KB</p>
                    </template>
                </div>
            </div>
            <div class="tw-modal-action">
                <button class="tw-btn tw-btn-outline tw-btn-success tw-btn-sm tw-mr-2" @click="save">Success</button>
                <form method="dialog">
                    <!-- if there is a button, it will close the modal -->
                    
                    <button class="tw-btn tw-btn-outline tw-btn-error tw-btn-sm">Close</button>
                </form>
            </div>
        </div>
    </dialog>

</template>

<script>
    import { ref } from "vue";
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

    export default{
        name: "TableComponent",
        components: {
            VueDatePicker
        },
        props: [
            'list_data',
            'list_header',
            'currentPage',
            'perPage',
            'totalItems',
            'canEdit',
            'canDelete',
            'canApprove',
            'editVar',
            'titleModal'
        ],
        data(){
            return{
                currentPage: this.currentPage,
                visible : ref(false),
                preview : null,
                image : null,
                preview_list : [],
                image_list : [],
                editVar: this.editVar
            }
        },
        methods: {
            handlePageChange(page) {
                this.$emit('changePage', page);
            },
            save(){
                this.$emit('saveAction', this.editVar);
            },
            previewImage(event) {
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
                    this.editVar.picture=input.files[0];
                    reader.readAsDataURL(input.files[0]);
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
        }
    }

    // const emit = defineEmits(['changePage']);

    // const visible = ref(false);
    

    // const props = defineProps({
    //     list_data : Object,
    //     list_header : Object,
    //     currentPage: Number,
    //     perPage: Number,
    //     totalItems: Number,
    //     canEdit: Boolean,
    //     canDelete: Boolean,
    //     canApprove: Boolean,
    // });

    // onMounted(() => {
    //     console.log(props);
    // });

    // const currentPage = currentPage;

    // const handlePageChange = (page) => {
    //     console.log(page);
    //     emit('changePage', page);
    // }

    // let preview: null;
    // var image = null;
    // let preview_list = [];
    // let image_list = [];

    // const previewImage =  (event) => {
    //   var input = event.target;
    //   if (input.files) {
    //     var reader = new FileReader();
    //     reader.onload = (e) => {
    //         if(e.target.result == null){
    //             preview = [];
    //         }else{
    //             preview = e.target.result;
    //         }
    //     }
    //     image=input.files[0];
    //     reader.readAsDataURL(input.files[0]);
    //   }
    // };

    // const previewMultiImage = (event) => {
    //   var input = event.target;
    //   var count = input.files.length;
    //   var index = 0;
    //   if (input.files) {
    //     while(count --) {
    //       var reader = new FileReader();
    //       reader.onload = (e) => {
    //         preview_list.push(e.target.result);
    //       }
    //       image_list.push(input.files[index]);
    //       reader.readAsDataURL(input.files[index]);
    //       index ++;
    //     }
    //   }
    // };

    // const reset = () => {
    //   image = null;
    //   preview = null;
    //   image_list = [];
    //   preview_list = [];
    // };

</script>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    height: 40px !important;;
    width: 40px !important;;
    border-radius: 10px !important;;
    cursor: pointer !important;;
    background-color: rgb(255, 255, 255) !important;;
    border: 0.5px solid rgb(97, 220, 254) !important;;
    color: #000000 !important;
    padding-left: 1em !important;
    padding-right: 1em !important;
    justify-content: center !important;
  }
  .paginate-buttons:hover {
    background-color: #00a2ff !important;
    color: black !important;
    /* border-color: #34ffdd !important; */
  }
  .active-page {
    background-color: #00a2ff !important;
    border: 1px solid #ffffff !important;
    color: black !important;
  }
  .active-page:hover {
    background-color: #2988c8 !important;
  }
  .text-green-500 {
    --tw-text-opacity: 1;
    color: rgb(34 197 94 / var(--tw-text-opacity)) !important;
}
</style>