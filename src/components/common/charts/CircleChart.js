import React,{useMemo} from 'react';
import Chart from 'react-apexcharts';


export const CircleChartMultiple = ({
    height=200,
    series=[40, 30,50],
    labels=['Apples', 'Oranges', 'Bananas']
}) => {
    const options = {
        chart: {
            height: height,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: (w) => {
                            return 249
                        }
                    }
                }
            }
        },
        labels: labels
    }
    return <Chart
    options={options}
    series={series}
    type="radialBar"
    width="220" />
}
export const CircleChart = ({
    width = "220",
    fontSize='16px',
    fontColor='#fff',
    lineColor="#8bc34a",
    series,
    label
}) => {
  //  console.log(series);
    const options = {
        chart: {
            type: 'radialBar',
        },
        colors: [lineColor],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: fontSize,
                        color: fontColor,
                    },
                    value: {
                        offsetY: 10,
                        fontSize: fontSize,
                        color: fontColor,
                        formatter: (val) => {return val + "%"}
                    }
                },
                hollow: {
                    size: '60%',
                }
            },
        },
        labels: [label]
    }
    return useMemo(() => {
        return <Chart
                options={options}
                series={[series]}
                type="radialBar"
                width={width}
            />
    }, [])
}
