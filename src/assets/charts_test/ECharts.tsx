import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface StatAPI {
  Date: string[];
  "Mean GCI": number[];
  "Mean NDMI": number[];
  "Mean NDVI": number[];
}

interface NDVIGraphProps {
  data: StatAPI;
}

const GraphComponent: React.FC<NDVIGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const getMinMax = (data: StatAPI) => {
    const minMax = {
      ndvi: { min: Math.min(...data["Mean NDVI"]), max: Math.max(...data["Mean NDVI"]) },
      gci: { min: Math.min(...data["Mean GCI"]), max: Math.max(...data["Mean GCI"]) },
      ndmi: { min: Math.min(...data["Mean NDMI"]), max: Math.max(...data["Mean NDMI"]) },
    };
    return minMax;
  };

  const calculateYAxisRange = (minMax: { ndvi: { min: number, max: number }, gci: { min: number, max: number }, ndmi: { min: number, max: number } }) => {
    const deviations = {
      ndvi: minMax.ndvi.max - minMax.ndvi.min,
      gci: minMax.gci.max - minMax.gci.min,
      ndmi: minMax.ndmi.max - minMax.ndmi.min,
    };

    const maxDeviation = Math.max(deviations.ndvi, deviations.gci, deviations.ndmi);
    const minValue = Math.min(minMax.ndvi.min, minMax.gci.min, minMax.ndmi.min);
    const maxValue = Math.max(minMax.ndvi.max, minMax.gci.max, minMax.ndmi.max);

    const padding = maxDeviation * 0.1; // Add 10% padding to the range

    return {
      min: minValue - padding,
      max: maxValue + padding,
      interval: (maxValue - minValue + 2 * padding) / 5, // Create larger chunks
    };
  };

  useEffect(() => {
    if (chartRef.current && data) {
      const chartInstance = echarts.init(chartRef.current);

      const minMax = getMinMax(data);
      const yAxisRange = calculateYAxisRange(minMax);

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
            'Greenness',
            'Chlorophyll',
            'Moisture',
          ],
          textStyle: {
            color: '#ffffff', // White legend text
          },
          top: '5%',
          left: '10%',
        },
        grid: {
          top: '15%',
          left: '10%',
          right: '5%',
          bottom: '15%', // Increase bottom padding to prevent overlap
        },
        xAxis: {
          type: 'category',
          data: data.Date,
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
          min: yAxisRange.min,
          max: yAxisRange.max,
          interval: yAxisRange.interval, // Set larger chunks for the y-axis
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
          scale: true, // Makes the axis scale dynamically to highlight deviations
        },
        series: [
          {
            name: 'Greenness', // Renamed from 'Mean NDVI'
            type: 'line',
            smooth: true,
            data: data["Mean NDVI"],
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
            name: 'Chlorophyll', // Renamed from 'Mean GCI'
            type: 'line',
            smooth: true,
            data: data["Mean GCI"],
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
            name: 'Moisture', // Renamed from 'Mean NDMI'
            type: 'line',
            smooth: true,
            data: data["Mean NDMI"],
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
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            start: 0,
            end: 100,
          },
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 100,
            height: 20,  // Adjusted height to make it less obtrusive
            bottom: 0,  // Position the slider at the bottom
            backgroundColor: 'transparent', // Makes the slider background transparent
            fillerColor: 'transparent',  // Makes the filled area transparent
            borderColor: 'transparent',  // Makes the border of the slider transparent
            handleStyle: {
              color: 'transparent',  // Makes the handle transparent
              shadowBlur: 0,
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
  }, [data]);

  return <div ref={chartRef} style={{ height: '500px', width: '100%' }} />;
};

export default GraphComponent;
