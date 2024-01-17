<template>
    <div class="tw-w-full tw-bg-sky-300 tw-rounded-md">
        <div class="table tw-w-full">
            <table class="tw-w-full">
                <thead class="tw-text-center tw-font-semibold tw-text-sm">
                    <tr>
                        <td class="tw-p-2 tw-pl-1 tw-pr-1" v-for="(item) in props.list_header" :key="item">
                            {{ item }}
                        </td>
                    </tr>
                </thead>
                <tbody class="tw-text-left tw-font-normal tw-text-sm tw-leading-[10px] tw-bg-white">
                    <tr 
                        v-for="(val, key) in props.list_data" :key="val.room_name" 
                        class="hover:tw-bg-sky-100"
                        :class="{ 'tw-bg tw-bg-slate-200' : parseInt(key) % 2 == 0 }"
                    >
                        <td class="tw-p-2 tw-leading-normal">{{ val.room_name }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.floor }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.facility }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.available_start }}</td>
                        <td class="tw-p-2 tw-leading-normal">{{ val.available_finish }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="tw-mt-3">
        <vue-awesome-paginate 
            :total-items="totalItems"
            v-model="currentPage"
            :items-per-page="perPage"
            :max-pages-shown="5"
            :on-click="handlePageChange" />
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from "vue";

    const emit = defineEmits(['changePage']);

    const props = defineProps({
        list_data : Object,
        list_header : Object,
        currentPage: Number,
        perPage: Number,
        totalItems: Number,
    });

    onMounted(() => {
        console.log(props);
    });

    const currentPage = props.currentPage;

    const handlePageChange = (page) => {
        console.log(page);
        emit('changePage', page);
    }

    const check = () => {
        console.log('masuk');
    }

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
    background-color: rgb(242, 242, 242) !important;;
    border: 0.5px solid rgb(104, 93, 93) !important;;
    color: #000000 !important;
    padding-left: 1em !important;
    padding-right: 1em !important;
    justify-content: center !important;
  }
  .paginate-buttons:hover {
    background-color: #00c3ff !important;
    color: black !important;
    /* border-color: #34ffdd !important; */
  }
  .active-page {
    background-color: #0092f3 !important;
    border: 1px solid #005d9b !important;
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