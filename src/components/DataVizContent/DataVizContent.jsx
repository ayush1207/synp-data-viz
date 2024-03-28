/**
 * react imports
 */
import ReactECharts from 'echarts-for-react';
import React from 'react';

/**
 * component to render the chart
 */
export function DataVizContent({ csvData, option }) {
    const [option, setOption] = useState(null);

    return (
        <div className='container'>
            {csvData && option ?
                (<ReactECharts option={option} style={{height: '600px' }}></ReactECharts>) :
                (<p>Loading...</p>)}
        </div>
    )
}