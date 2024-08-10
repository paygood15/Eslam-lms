import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexCharts1 = ({ width, series, label, color }) => {
  const [options, setOptions] = useState({
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
      },
    },
    colors: [color],
    labels: [label],
  });

  const [chartSeries, setChartSeries] = useState(Array.isArray(series) ? series : [series]);

  useEffect(() => {
    console.log('Options:', options);
    console.log('Series:', chartSeries);
  }, [options, chartSeries]);

  return (
    <div>
      <ReactApexChart 
        options={options} 
        series={chartSeries} 
        type="radialBar" 
        height={250} 
        width={width} 
      />
    </div>
  );
}

export default ApexCharts1;
