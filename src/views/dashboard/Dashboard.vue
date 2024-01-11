
<template>

    <div class="grid grid-cols-4 gap-3">
        <div class="w-[22%] p-3 bg-white rounded-lg drop-shadow-lg relative">
            <div class="text-sm text-gray-400 mb-2 text-semibold">Guest Book</div>
            <div class="">
                <Chart type="doughnut" :data="chartDataGS" :options="chartOptionsGS" class="w-full" />
            </div>
        </div>
        <div class="w-[22%] p-3 bg-white rounded-lg drop-shadow-lg relative">
            <div class="text-sm text-gray-400 mb-2 text-semibold">Meeting Room</div>
            <div class="">
                <Chart type="pie" :data="chartDataGS" :options="chartOptionsGS" class="w-full" />
            </div>
        </div>
        <div class="w-[22%] p-3 bg-white rounded-lg drop-shadow-lg relative">
            <div class="text-sm text-gray-400 mb-2 text-semibold">Meeting Room</div>
            <div class="">
                <Chart type="bar" :data="charDataBar" :options="chartOptionsBar" class="w-full" />
            </div>
        </div>
        <div class="w-[22%] relative">
        </div>
        
    </div>

    <div class="card flex justify-content-center">
        <!-- <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-[100px]" /> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
    chartDataGS.value = setChartDataGS();
    chartOptionsGS.value = setChartOptionsGS();
    charDataBar.value = setChartDataBar();
    chartOptionsBar.value = setChartOptionsBar();
});

const chartDataGS = ref();
const chartOptionsGS = ref(null);
const charDataBar = ref();
const chartOptionsBar = ref(null);

// doughnut and pie
const setChartDataGS = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['A', 'B', 'C'],
        options: {
            plugins: {
                legend: {
                    display: false,
                    position: 'left',
                    labels: {
                        color: 'rgb(255, 99, 132)'
                    }
                }
            },
            legend: {
                display: false
            }
        },
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverBackgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ]
            }
        ]
    };
};

const setChartOptionsGS = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                // display: false,
                // boxWidth: 20,
                position: 'bottom',
                // maxWidth: 30,
                padding: 6,
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};

// bar
const setChartDataBar = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                type: 'bar',
                label: 'Dataset 1',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: [50, 25, 12, 48, 90, 76, 42]
            },
            {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: [21, 84, 24, 75, 37, 65, 34]
            },
            {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                data: [41, 52, 24, 74, 23, 21, 32]
            }
        ]
    };
};
const setChartOptionsBar = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
