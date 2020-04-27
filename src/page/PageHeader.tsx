import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class PageHeader extends React.Component {
    render() {
        return (
            <Navbar expand="sm">
                {/* <Navbar.Brand>Raymond Thornley</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="header-nav" />
                <Navbar.Collapse id="header-nav">
                    <Nav>
                        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                        <NavDropdown title="Mastermind" id="mastermindHeaderDropdown">
                            <LinkContainer to="/mastermind">
                                <NavDropdown.Item>Play Game</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item href="https://github.com/RaymondThornley/raymond-portfolio-frontend/tree/master/src/mastermind"
                            >View Code on GitHub&trade;</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Minesweeper" id="minesweeperHeaderDropdown">
                            <LinkContainer to="/minesweeper">
                                <NavDropdown.Item>Play Game</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item href="https://github.com/RaymondThornley/raymond-portfolio-frontend/tree/master/src/minesweeper"
                            >View Code on GitHub&trade;</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Tank Wars" id="tankWarsHeaderDropdown">
                            <LinkContainer to="/tankwars">
                                <NavDropdown.Item>Play Game</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item href="https://github.com/RaymondThornley/raymond-portfolio-frontend/tree/master/src/tankWars"
                            >View Code on GitHub&trade;</NavDropdown.Item>
                        </NavDropdown>
                        {/* <LinkContainer to="/mastermind"><Nav.Link>Mastermind</Nav.Link></LinkContainer>
                        <LinkContainer to="/minesweeper"><Nav.Link>Minesweeper</Nav.Link></LinkContainer>
                        <LinkContainer to="/tankwars"><Nav.Link>Tank Wars</Nav.Link></LinkContainer> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        );
    }
}

export default PageHeader;
