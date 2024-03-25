import Nav from 'react-bootstrap/Nav';

export default function CustomNav() {
  return (
    <Nav variant="tabs" defaultActiveKey="">
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Option 2</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}