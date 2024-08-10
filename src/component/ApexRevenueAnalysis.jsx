import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexRevenueAnalysis = ({ profitPercentage, totalCoursePrice, totalRevenue }) => {
  // Define the series data and categories based on the props
  const series = [
    {
      name: 'Values',
      data: [totalCoursePrice, totalRevenue]
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Total Course Price', 'Total Revenue'],
    },
    yaxis: {
      title: {
        text: 'Values'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    },
    title: {
      text: 'Revenue Analysis',
      align: 'left',
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default ApexRevenueAnalysis;
