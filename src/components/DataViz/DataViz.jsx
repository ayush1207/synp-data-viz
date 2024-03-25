import { DataVizHeader } from '../DataVizHeader/DataVizHeader';
import { DataVizContent } from '../DataVizContent/DataVizContent';
import { useState } from 'react';

export function DataViz() {
    const [selectedColumn, setSelectedColumn] = useState("");
    const [chartType, setChartType] = useState("line");

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
        <>
            <div>
                <DataVizHeader
                    onSelectVerticalAxis={handleVerticalAxis}
                    onSelectChartView={handleChartView}>
                    selectedColumnData={selectedColumn}
                    selectedChartType={chartType}
                </DataVizHeader>
            </div>
            <div>
                <DataVizContent
                    selectedColumnData={selectedColumn}
                    selectedChartType={chartType}>
                </DataVizContent>
            </div>
        </>
    );
}