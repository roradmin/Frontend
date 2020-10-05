import React,{useMemo} from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({
    width="220",
    series,
    labels,
    fontColor='#eee'
}) => {
    const options = {
        colors: ['#00C851','#dc3535'],
        legend: {
            labels: {colors: fontColor},
            position: 'bottom',
            offsetY: -10
        },
        labels: labels
    }
    //'#a5dc86','#FF6384','#FFCE56'
    return useMemo(() => <Chart
            options={options}
            series={series}
            type="donut"
            background="red"
            width={width} />
    , [series]);
}
    
export default PieChart;
