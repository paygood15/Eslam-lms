import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GroupStatic1 = ({
  profitPercentage,
  monthlyCompletedLessonChange,
  monthlyNewUserChange,
  monthlyOrderChange,
  yearlyUserChange
}) => {
  // Create data series from the props
  const series = [
    parseFloat(profitPercentage),  // Ensure to convert percentage to a number
    parseFloat(monthlyCompletedLessonChange),  // Convert percentage to a number
    parseFloat(monthlyNewUserChange),  // Convert percentage to a number
    parseFloat(monthlyOrderChange),  // Convert percentage to a number
    parseFloat(yearlyUserChange)  // Convert percentage to a number
  ];

  // Define chart options
  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: [
      'Profit Percentage', 
      'Monthly Completed Lesson Change', 
      'Monthly New User Change', 
      'Monthly Order Change', 
      'Yearly User Change'
    ],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default GroupStatic1;
