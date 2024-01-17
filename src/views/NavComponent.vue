<template>
    <div class="tw-top-0 tw-h-[100px]">
      <div class="tw-flex tw-place-items-center">
        <section class="tw-relative tw-flex-1 mx-auto">
            <!-- navbar -->
          <nav class="tw-flex tw-justify-between tw-bg-white tw-text-blue-600 tw-drop-shadow-md">
            
            <!-- Responsive navbar -->
            <a class="tw-px-5 tw-xl:px-12 tw-py-4 tw-flex tw-w-full tw-items-center" href="#">
              <!-- <i class="pi pi-shopping-cart"></i> -->
              <span>This Is HIGS Application</span>
              <!-- <span class="tw-flex tw-absolute tw--mt-5 tw-ml-4"> -->
                <!-- <span class="tw-animate-ping tw-absolute tw-inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span> -->
                <!-- <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"> -->
                <!-- </span> -->
              <!-- </span> -->
            </a>

            <div class="tw-flex tw-mr-6 tw-items-center">
              <a class="tw-text-3xl tw-font-bold tw-font-heading" href="#">
                <img class="tw-w-[100px]" alt="Vue logo" src="../assets/logo.png">
              </a>
            </div>
            
          </nav>
          
        </section>
      </div>
    </div>
  </template>
  <script>
    export default {
        name: 'NavComponent'
    }
  </script>
  
  