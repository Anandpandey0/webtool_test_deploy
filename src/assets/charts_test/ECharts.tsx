import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const NDVIGraph: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const chartOptions = {
        backgroundColor: '#2b2b2b', // Dark grey background
        title: {
          text: '',
          left: 'center',
          textStyle: {
            color: '#ffffff',
          },
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#111111', // Dark tooltip background
          borderColor: '#FFFFFF', // White tooltip border
          textStyle: {
            color: '#FFFFFF', // White tooltip text
          },
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#ffffff',
              width: 1,
              type: 'dashed',
            },
          },
        },
        legend: {
          data: [
            'NDVI (2023/2024)',
            'NDVI (2022/2023)',
            'NDVI (2021/2022)',
            'NDVI (2020/2021)',
            'Typical index range',
          ],
          textStyle: {
            color: '#ffffff', // White legend text
          },
          top: '5%',
          left: '10%',
          selected: {
            'NDVI (2023/2024)': true,
            'NDVI (2022/2023)': false,
            'NDVI (2021/2022)': false,
            'NDVI (2020/2021)': false,
            'Typical index range': false,
          },
        },
        grid: {
          top: '15%',
          left: '10%',
          right: '5%',
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          data: [
            'Aug 22',
            'Sep 20',
            'Oct 19',
            'Nov 17',
            'Dec 16',
            'Jan 14',
            'Feb 15',
            'Mar 12',
            'Apr 10',
            'May 9',
            'Jun 7',
            'Jul 6',
          ],
          axisLine: {
            lineStyle: {
              color: '#ffffff', // White axis line
            },
          },
          axisLabel: {
            color: '#ffffff', // White axis labels
          },
          splitLine: {
            show: false,
          },
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 0.8,
          axisLine: {
            lineStyle: {
              color: '#ffffff', // White axis line
            },
          },
          axisLabel: {
            color: '#ffffff', // White axis labels
          },
          splitLine: {
            lineStyle: {
              color: '#444444', // Grey grid lines
            },
          },
        },
        series: [
          {
            name: 'NDVI (2023/2024)',
            type: 'line',
            smooth: true,
            data: [0.64, 0.62, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.6, 0.65, 0.7],
            lineStyle: {
              color: '#00E676',
              width: 3,
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#00E676', // Green color for filled circle, matching the line
            },
            emphasis: {
              focus: 'series',
            },
          },
          {
            name: 'NDVI (2022/2023)',
            type: 'line',
            smooth: true,
            data: [0.6, 0.55, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.6, 0.62, 0.65],
            lineStyle: {
              color: '#76e7ff',
              width: 3,
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#76e7ff', // Light blue color for filled circle, matching the line
            },
            emphasis: {
              focus: 'series',
            },
          },
          {
            name: 'NDVI (2021/2022)',
            type: 'line',
            smooth: true,
            data: [0.55, 0.52, 0.38, 0.42, 0.46, 0.51, 0.56, 0.62, 0.68, 0.55, 0.57, 0.6],
            lineStyle: {
              color: '#4a90e2',
              width: 3,
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#4a90e2', // Blue color for filled circle, matching the line
            },
            emphasis: {
              focus: 'series',
            },
          },
          {
            name: 'NDVI (2020/2021)',
            type: 'line',
            smooth: true,
            data: [0.5, 0.48, 0.36, 0.4, 0.44, 0.48, 0.53, 0.58, 0.64, 0.52, 0.54, 0.57],
            lineStyle: {
              color: '#ff6f61',
              width: 3,
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#ff6f61', // Red-orange color for filled circle, matching the line
            },
            emphasis: {
              focus: 'series',
            },
          },
          {
            name: 'Typical index range',
            type: 'line',
            smooth: true,
            data: [0.58, 0.57, 0.44, 0.48, 0.52, 0.56, 0.61, 0.66, 0.72, 0.58, 0.61, 0.64],
            lineStyle: {
              color: '#ffd700',
              width: 3,
            },
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#ffd700', // Gold color for filled circle, matching the line
            },
            emphasis: {
              focus: 'series',
            },
          },
        ],
      };

      chartInstance.setOption(chartOptions);

      // Responsive handling
      const handleResize = () => {
        chartInstance.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartInstance.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ height: '500px', width: '100%' }} />;
};

export default NDVIGraph;
