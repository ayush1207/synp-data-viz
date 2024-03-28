/**
 * react imports
 */
import ReactECharts from 'echarts-for-react';
import React from 'react';
import { useState, useEffect } from 'react';

/**
 * component to render the chart
 */
export function DataVizContent({ csvData, option }) {
    /**
     * resolved option
     */
    const [resolvedOption, setResolvedOption] = useState(null);

    /**
     * effect to re-render the component on option change
     */
    useEffect(() => {
        if (typeof option === 'object' && typeof option.then === 'function') {
            option.then((result) => {
                setResolvedOption(result);
            });
        } else {
            setResolvedOption(option);
        }
    }, [option]);

    return (
        <div className='container'>
            {csvData && resolvedOption ?
                (<ReactECharts option={resolvedOption} style={{ height: '600px' }}></ReactECharts>) :
                (<p>Loading...</p>)}
        </div>
    )
}