import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

function ResponsiveAppbar() {
    return (
    <Navbar expand="lg"  className ="bg-body-tertiary " fixed="top">
            <Container fluid style={{marginLeft:"100px",marginRight:"50px"}}>
            <Navbar.Brand as={Link} to="/">Component Managment Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/create-component-request">Create Component Request</Nav.Link>
        <Nav.Link as={Link} to="/database-input">Database-input</Nav.Link>
        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          </Nav>
            </Navbar.Collapse>
          
                <Nav.Link href="#username">USERNAME</Nav.Link>
          <Nav.Link href="https://github.com/OmarFaig/component-ticket-tool" target="_blank"style={{padding:"10px"}}
          >
              <img 
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                  alt="GitHub" 
                  width="30" 
                  height="30"
              />
          </Nav.Link>
    </Container>
        
    </Navbar>
);
}
export default ResponsiveAppbar;