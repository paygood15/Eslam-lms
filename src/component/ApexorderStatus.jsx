import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexorderStatus = ({ orderStatusCounts, chartTitle }) => {
  // Extract categories and series data from props
  const categories = orderStatusCounts.map(item => item._id);
  const data = orderStatusCounts.map(item => item.count);

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Order Status',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Orders',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' orders';
        },
      },
    },
    title: {
      text: chartTitle,
      align: 'left',
    },
  };

  const series = [
    {
      name: 'Orders',
      data: data,
    },
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default ApexorderStatus;
