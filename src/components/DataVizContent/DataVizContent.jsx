import ReactECharts from 'echarts-for-react';
import React from 'react';

export function DataVizContent({ csvData, option }) {
    return (
        <div>
            {csvData ?
                (<ReactECharts option={option}></ReactECharts>) :
                (<p>Loading...</p>)}
        </div>
    )
}