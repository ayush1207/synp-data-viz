import { DataVizHeader } from '../DataVizHeader/DataVizHeader';
import { DataVizContent } from '../DataVizContent/DataVizContent';
import React, { useState, useEffect } from 'react';
import csvFile from '../../core/data/gemini_BTCUSD_2020_1min.csv';
import csvFile_1 from '../../core/data/gemini_BTCUSD_2020_1min copy.csv';
import csvFile_2 from '../../core/data/gemini_BTCUSD_2020_1min copy 2.csv';
import { readString } from 'react-papaparse';

export function DataViz() {
    const [selectedColumn, setSelectedColumn] = useState("Open");
    const [chartType, setChartType] = useState("Line");

    const [csvData, setCsvData] = useState(null);

    useEffect(() => {
        (function fetchData() {
            try {
                const papaConfig = {
                    complete: (results) => {
                        const columnName = selectedColumn ? selectedColumn : "Open";
                        const columnData = results.data.map(row => row[columnName]);
                        setCsvData(results);
                    },
                    download: true,
                    header: true,
                };
                readString(csvFile_2, papaConfig);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    },[]);

    function getColData(columnName = 'Date') {
        const row = csvData.data.map(row => row[columnName]);
        return row;
    }

    const option = {
        xAxis: {
            type: 'category',
            formatter: '{dd}-{mm}-{yyyy} {hh}:{mm}',
            data: csvData ? getColData('Date') : [],
            name: "Time",
            nameLocation: 'center',
            alignWithLabel: true
        },
        yAxis: {
            type: 'value',
            min: function (value) {
                return value.min - 100;
            },
            max: function (value) {
                return value.max + 100;
            }
        },
        series: [
            {
                data: csvData ? getColData(selectedColumn ? selectedColumn : 'Open') : [],
                type: chartType ? chartType.toLowerCase() : 'line'
            }
        ]
    };


    /**
     * 
     * @param {*} item 
     */
    function handleVerticalAxis(item) {
        setSelectedColumn(item);
    }
    /**
     * 
     * @param {*} item 
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
                    option={option}>
                </DataVizContent>
            </div>
        </div>
    );
}