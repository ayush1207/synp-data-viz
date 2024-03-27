/**
 * react imports
 */
import ReactECharts from 'echarts-for-react';
import React from 'react';

/**
 * component to render the chart
 */
export function DataVizContent({ csvData, option }) {
    return (
        <div>
            {csvData ?
                (<ReactECharts option={option} style={{height: '600px' }}></ReactECharts>) :
                (<p>Loading...</p>)}
        </div>
    )
}