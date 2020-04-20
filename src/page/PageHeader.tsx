import React from 'react';
import { Navbar, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class PageHeader extends React.Component {
    render() {
        return (
            <Navbar>
                <LinkContainer to="/"><NavLink>Home</NavLink></LinkContainer>
                <LinkContainer to="/mastermind"><NavLink>Mastermind</NavLink></LinkContainer>
                <LinkContainer to="/minesweeper"><NavLink>Minesweeper</NavLink></LinkContainer>
                <LinkContainer to="/tankwars"><NavLink>Tank Wars</NavLink></LinkContainer>
            </Navbar>
        );
    }
}

export default PageHeader;
