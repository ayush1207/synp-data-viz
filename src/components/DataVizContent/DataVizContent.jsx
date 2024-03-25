import ReactECharts from 'echarts-for-react';
import React, { useState, useEffect } from 'react';
import csvFile from '../../core/data/gemini_BTCUSD_2020_1min.csv';
import { readString } from 'react-papaparse';

export function DataVizContent({ selectedColumnData, selectedChartType }) {
    console.log(selectedColumnData)
    const [csvData, setCsvData] = useState(null);

    useEffect(() => {
        (function fetchData() {
            try {
                const papaConfig = {
                    complete: (results) => {
                        const columnName = selectedColumnData ? selectedColumnData : "Open";
                        const columnData = results.data.map(row => row[columnName]);
                        console.log(columnData);
                        setCsvData(results);
                    },
                    download: true,
                    header: true,
                };
                readString(csvFile, papaConfig);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

    function getColData(columnName = 'Date') {
        const row = csvData.data.map(row => row[columnName]);
        return row;
    }

    const option = {
        xAxis: {
            type: 'category',
            formatter : '{dd}-{mm}-{yyyy} {hh}:{mm}',
            data: csvData ? getColData('Date') : [],
            name : "Time",
            nameLocation : 'center',
            alignWithLabel : true
        },
        yAxis: {
            type: 'value',
            data: csvData ? getColData(selectedColumnData ? selectedColumnData : 'Open') : [],
        },
        series: [
            {
                type: selectedChartType ? selectedChartType.toLowerCase() : 'line'
            }
        ]
    };

    return (
        <div>
            {csvData ? (
                <ReactECharts option={option}></ReactECharts>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}