import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class PageHeader extends React.Component {
    render() {
        return (
            <Navbar expand="lg">
                {/* <Navbar.Brand>Raymond Thornley</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="header-nav" />
                <Navbar.Collapse id="header-nav">
                    <Nav>
                        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                        <LinkContainer to="/mastermind"><Nav.Link>Mastermind</Nav.Link></LinkContainer>
                        <LinkContainer to="/minesweeper"><Nav.Link>Minesweeper</Nav.Link></LinkContainer>
                        <LinkContainer to="/tankwars"><Nav.Link>Tank Wars</Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default PageHeader;
