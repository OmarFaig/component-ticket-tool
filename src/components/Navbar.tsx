import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { left } from '@popperjs/core';


function ResponsiveAppbar() {
    return (
    <Navbar expand="lg"  className ="bg-body-tertiary w-100" fixed="top">
    <Container style={{marginLeft:'100px',marginRight:'100px'}}>
        <Navbar.Brand href ="#home">Component Managment Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="#create-tickets">Create tickets</Nav.Link>
            <Nav.Link href="#dashboards">Dashboards</Nav.Link>
            </Nav>
            </Navbar.Collapse>
    </Container>
    </Navbar>
);
}
export default ResponsiveAppbar;