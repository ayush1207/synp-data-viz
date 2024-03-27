import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export function DataVizHeader({ onSelectVerticalAxis, onSelectChartView, selectedChartType ,selectedColumnData }) {
    /**
     * 
     */
    const dropDownData = ['Open', 'Close', 'High', 'Low', 'Volume'];
    /**
     * 
     */
    const navData = ['Line', 'Bar'];

    // let selectedColumnData = dropDownData[0];


    /**
     * 
     * @param {*} item 
     */
    function handleDropdownItemClick(item) {
        onSelectVerticalAxis(item);
    }

    function handleNavItemClick(item) {
        onSelectChartView(item);
    }

    return (
        <div className="d-flex justify-content-between">
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
            {selectedColumnData}
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