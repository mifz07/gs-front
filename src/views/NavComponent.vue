<template>
    <div class="top-0 h-[18vh]">
      <div class="flex place-items-center">
        <section class="relative flex-1 mx-auto">
            <!-- navbar -->
          <nav class="flex justify-between bg-white text-blue-600 drop-shadow-md">
            
            <!-- Responsive navbar -->
            <a class="px-5 xl:px-12 py-4 flex w-full items-center hidden" href="#">
              <!-- <i class="pi pi-shopping-cart"></i> -->
              <span>This Is HIGS Application</span>
              <span class="flex absolute -mt-5 ml-4">
                <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
            </a>

            <div class="flex mr-6 items-center">
              <a class="text-3xl font-bold font-heading" href="#">
                <img class="w-[100px]" alt="Vue logo" src="../assets/logo.png">
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
  
  