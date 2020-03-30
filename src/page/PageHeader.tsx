import React from 'react';
import { Link } from 'react-router-dom';

class PageHeader extends React.Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/minesweeper">Minesweeper</Link>
            </div>
        );
    }
}

export default PageHeader;
