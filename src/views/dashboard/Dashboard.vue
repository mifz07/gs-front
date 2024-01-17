
<template>
    <div class="tw-relative">
        <div class="tw-grid tw-grid-cols-4 tw-gap-3 tw-h-auto">
            <div class="tw-p-3 tw-bg-white tw-rounded-lg tw-drop-shadow-lg tw-relative">
                <div class="tw-text-sm tw-text-gray-400 tw-mb-2 tw-text-semibold">Guest Book</div>
                <div class="">
                    <Chart type="doughnut" :data="chartDataGS" :options="chartOptionsGS" class="w-full" />
                </div>
            </div>
            <div class="tw-p-3 tw-bg-white tw-rounded-lg tw-drop-shadow-lg tw-relative">
                <div class="tw-text-sm tw-text-gray-400 tw-mb-2 tw-text-semibold">Meeting Room</div>
                <div class="">
                    <Chart type="pie" :data="chartDataGS" :options="chartOptionsGS" class="w-full" />
                </div>
            </div>
            <div class="tw-p-3 tw-bg-white tw-rounded-lg tw-drop-shadow-lg tw-relative">
                <div class="tw-text-sm tw-text-gray-400 tw-mb-2 tw-text-semibold">Meeting Room</div>
                <div class="">
                    <Chart type="bar" :data="charDataBar" :options="chartOptionsBar" class="w-full" />
                </div>
            </div>
            <div class="tw-bg-white tw-rounded-lg tw-drop-shadow-lg tw-relative">
                <div class="tw-text-sm tw-text-gray-400 tw-mb-2 tw-text-semibold">Meeting Room</div>
                <div class="">
                    <Chart type="polarArea" :data="charDataPolar" :options="chartOptionsPolar" class="w-full" />
                </div>
            </div>
            
        </div>

        <div class="tw-mt-[30px] tw-block">
            <div class="tw-w-full tw-h-50vh tw-p-2 tw-bg-white tw-rounded-lg tw-drop-shadow-lg tw-tw-relative">
                <div class="tw-text-sm tw-text-gray-400 tw-mb-2 tw-text-semibold">Guest Book</div>
                <div class="">
                    <Chart type="line" :data="chartDataLine" :options="chartOptionsLine" class="tw-w-full" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
    chartDataGS.value = setChartDataGS();
    chartOptionsGS.value = setChartOptionsGS();
    charDataBar.value = setChartDataBar();
    chartOptionsBar.value = setChartOptionsBar();
    chartDataPolar.value = setChartDataPolar();
    chartOptionsPolar.value = setChartOptionsPolar();
    chartDataLine.value = setChartDataLine();
    charOptionsLine.value = setChartOptionsLine();
});

const chartDataGS = ref();
const chartOptionsGS = ref(null);
const charDataBar = ref();
const chartOptionsBar = ref(null);
const chartDataPolar = ref();
const chartOptionsPolar = ref(null);
const chartDataLine = ref();
const charOptionsLine = ref(null);

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

//polar area
const setChartDataPolar = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        datasets: [
            {
                data: [11, 16, 7, 3, 14],
                backgroundColor: [
                    documentStyle.getPropertyValue('--red-500'),
                    documentStyle.getPropertyValue('--green-500'),
                    documentStyle.getPropertyValue('--yellow-500'),
                    documentStyle.getPropertyValue('--bluegray-500'),
                    documentStyle.getPropertyValue('--blue-500')
                ],
                label: 'My dataset'
            }
        ],
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
    };
};
const setChartOptionsPolar = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

// line char
const setChartDataLine = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [65, 59, 80, 81, 56, 55, 10]
            },
            {
                label: 'Dataset 2',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
};
const setChartOptionsLine = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
