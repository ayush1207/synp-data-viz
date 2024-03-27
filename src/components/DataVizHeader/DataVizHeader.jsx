/**
 * bootstrap imports
 */
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
/**
 * constants imports
 */
import { DROPDOWN_DATA, GRAPH_TYPE } from '../../core/constants/app.constants';

/**
 * Data Visualizer Header
 * Having all necessary toggles 
 */
export function DataVizHeader({ onSelectVerticalAxis, onSelectChartView, selectedChartType ,selectedColumnData }) {
    /**
     * dropdown data to be shown in 
     */
    const dropDownData = DROPDOWN_DATA;
    /**
     * grah type
     */
    const navData = GRAPH_TYPE;

    /**
     * handle the dropdown and emit event to parent
     */
    function handleDropdownItemClick(item) {
        onSelectVerticalAxis(item);
    }
    /**
     * handle nav item click and emit event to parent 
     */
    function handleNavItemClick(item) {
        onSelectChartView(item);
    }

    return (
        <div className="container d-flex justify-content-between py-2">
            <div>
                <DropdownButton id="dropdown-basic-button" title={selectedColumnData ? selectedColumnData : dropDownData[0]}>
                    {dropDownData.map((item) => (
                        <Dropdown.Item
                            key={item}
                            onClick={() => handleDropdownItemClick(item)}>
                            {item}
                        </Dropdown.Item>)
                    )}
                </DropdownButton>
            </div>
            <div>
                <Nav variant="pills" defaultActiveKey={selectedChartType ? selectedChartType : navData[0]} className='border rounded'>
                    {navData.map((item) => (
                        <Nav.Item key={item}>
                            <Nav.Link
                                eventKey={item}
                                onClick={() => handleNavItemClick(item)}>
                                {item}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        </div>
    );
}