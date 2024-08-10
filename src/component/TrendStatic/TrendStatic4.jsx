import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TrendStatic4 = ({ dailyNewUsers, chartTitle }) => {
  // Function to convert the date object to timestamp
  const formatDate = ({ year, month }) => {
    return new Date(year, month - 1).getTime(); // month - 1 because JavaScript months are 0-indexed
  };

  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: chartTitle,
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      title: {
        text: 'Total Users',
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
  };

  const series = [
    {
      name: 'Daily Users',
      data: dailyNewUsers?.map(item => ({
        x: formatDate(item._id),
        y: item.totalUsers
      })),
    },
  ];

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default TrendStatic4;
