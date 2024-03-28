/**
 * components 
 */
import { DataVizHeader } from '../DataVizHeader/DataVizHeader';
import { DataVizContent } from '../DataVizContent/DataVizContent';
/**
 * react imports
 */
import React, { useState, useEffect } from 'react';
import { readString } from 'react-papaparse';
/**
 * csv files
 */
import csvFile from '../../core/data/gemini_BTCUSD_2020_1min.csv';
import csvFile_1 from '../../core/data/gemini_BTCUSD_2020_1min copy.csv';
import csvFile_2 from '../../core/data/gemini_BTCUSD_2020_1min copy 2.csv';
import csvFileMain from '../../core/data/gemini_BTCUSD_2020_1min_main.csv';

/**
 * data visualizer component rendering the main components
 */
export function DataViz() {
    /**
     * state of the component 
     * to select column for y axis
     */
    const [selectedColumn, setSelectedColumn] = useState("Open");
    /**
     * state for the type of rendering of the chart
     */
    const [chartType, setChartType] = useState("Line");
    /**
     * state for chart data
     */
    const [csvData, setCsvData] = useState(null);

    /**
     * effect to parse the csv
     */
    useEffect(() => {
        (function fetchData() {
            try {
                const papaConfig = {
                    complete: (results) => {
                        const columnName = selectedColumn ?? selectedColumn;
                        results.data.map(row => row[columnName]);
                        setCsvData(results);
                    },
                    download: true,
                    header: true,
                };
                readString(csvFile_1, papaConfig);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    /**
     * get the column of the csv to render the data
     */
    function getColData(columnName = 'Date') {
        const row = csvData.data.map(row => row[columnName]);
        return row;
    }


    /**
     * function to get the average data of the month 
     */
    async function chartTypeBarAverage() {
        if (chartType == 'Bar') {
            const coinsEarned = await getColData(selectedColumn ? selectedColumn : 'Open');
            const days = await getColData('Date');
            const monthlyData = {};

            if (coinsEarned && days) {
                await days.forEach(async (date, index) => {
                    if (date != null) {
                        const splitDate = date.split('/');
                        const monthYear = (splitDate[0] + '/' + splitDate[2].split(' ')[0]);
                        monthlyData[monthYear] = monthlyData[monthYear] || { total: 0, count: 0 };
                        monthlyData[monthYear].total += parseFloat(coinsEarned[index]);
                        monthlyData[monthYear].count++;
                    }
                });

                const monthlyAverages = Object.entries(monthlyData).map(([monthYear, { total, count }]) => ({
                    monthYear,
                    average: total / count
                }));

                const months = monthlyAverages.map(entry => entry.monthYear);
                const averageValues = monthlyAverages.map(entry => entry.average)
                return [months, averageValues];
            }
        }
    }

    /**
     * option of the chart 
     * to configure the chart
     */
    async function getOption() {
        let chartTypeAverageData;
        if (chartType === 'Bar') {
            chartTypeAverageData = await chartTypeBarAverage();
        }
    
        const xAxisData = csvData ? (chartType === 'Bar' && chartTypeAverageData ? chartTypeAverageData[0] : getColData('Date')) : [];
        const seriesData = csvData ? (chartType === 'Bar' && chartTypeAverageData ? chartTypeAverageData[1] : getColData(selectedColumn || 'Open')) : [];
    
        const option = {
            xAxis: {
                type: 'category',
                data: xAxisData,
                name: "Time",
                nameLocation: 'center',
                alignWithLabel: true
            },
            yAxis: {
                type: 'value',
                min: function (value) {
                    return value.min - 10;
                },
                max: function (value) {
                    return value.max + 10;
                }
            },
            series: [
                {
                    data: seriesData,
                    type: chartType ? chartType.toLowerCase() : 'line'
                }
            ]
        };
        return option;
    }


    /**
     * handler for y-axis 
     * triggered after the event received from the child component
     */
    function handleVerticalAxis(item) {
        setSelectedColumn(item);
    }
    /**
     * handler for the chart view type
     * triggered after the event received from the child component
     */
    function handleChartView(item) {
        setChartType(item);
    }

    return (
        <div className=''>
            <div class="mt-2 mb-5 border-bottom">
                <DataVizHeader
                    onSelectVerticalAxis={handleVerticalAxis}
                    onSelectChartView={handleChartView}
                    selectedColumnData={selectedColumn}
                    selectedChartType={chartType}>
                </DataVizHeader>
            </div>
            <div class="h-100">
                <DataVizContent
                    selectedColumnData={selectedColumn}
                    selectedChartType={chartType}
                    csvData={csvData}
                    option={getOption()}>
                </DataVizContent>
            </div>
        </div>
    );
}