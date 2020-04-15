import React from 'react';
import MinesweeperGame from './MinesweeperGame';
import '../css/minesweeper.css';

type MinesweeperState = {
    xDimension: string,
    yDimension: string,
    mineNumber: string,
    isGameActive: boolean,
    hasXError: boolean,
    hasYError: boolean,
    hasMineError: boolean,
    hasDimensionError: boolean,
    dimentionErrorText: string
}

class Minesweeper extends React.Component<{}, MinesweeperState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            xDimension: "10",
            yDimension: "10",
            mineNumber: "20",
            isGameActive: false,
            hasXError: false,
            hasYError: false,
            hasMineError: false,
            hasDimensionError: false,
            dimentionErrorText: ""
        }

        this.changeX = this.changeX.bind(this);
        this.blurX = this.blurX.bind(this);
        this.changeY = this.changeY.bind(this);
        this.blurY = this.blurY.bind(this);
        this.changeMine = this.changeMine.bind(this);
        this.blurMine = this.blurMine.bind(this);
        this.validateDimensions = this.validateDimensions.bind(this);
        this.startGame = this.startGame.bind(this);
        this.returnToSettings = this.returnToSettings.bind(this);
    }

    changeX(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0" || newValue.match("^[1-9]\\d{0,1}$")) {
            this.setState({ xDimension: newValue });
        }
    }

    blurX(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0") {
            this.setState({ hasXError: true });
        } else {
            this.setState({ hasXError: false });
            this.validateDimensions(newValue, this.state.yDimension, this.state.mineNumber);
        }
    }

    changeY(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0" || newValue.match("^[1-9]\\d{0,1}$")) {
            this.setState({ yDimension: newValue });
        }
    }

    blurY(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0") {
            this.setState({ hasYError: true });
        } else {
            this.setState({ hasYError: false });
            this.validateDimensions(this.state.xDimension, newValue, this.state.mineNumber);
        }
    }

    changeMine(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0" || newValue.match("^[1-9]\\d{0,2}$")) {
            this.setState({ mineNumber: newValue });
        }
    }

    blurMine(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0") {
            this.setState({ hasMineError: true });
        } else {
            this.setState({ hasMineError: false });
            this.validateDimensions(this.state.xDimension, this.state.yDimension, newValue);
        }
    }

    validateDimensions(xDimension: string, yDimension: string, mineNumber: string) {
        const xVal = Number(xDimension);
        const yVal = Number(yDimension);
        const mineVal = Number(mineNumber);
        if (xVal * yVal > 2000) {
            this.setState({ hasDimensionError: true, dimentionErrorText: "Error: Number of spaces can't exceed 2000" });
        } else if (mineVal + 10 > xVal * yVal) {
            this.setState({ hasDimensionError: true, dimentionErrorText: "Error: Too many mines for dimensions" });
        } else {
            this.setState({ hasDimensionError: false });
        }
    }

    startGame() {
        this.setState({ isGameActive: true });
    }

    returnToSettings() {
        this.setState({ isGameActive: false });
    }

    render() {
        const isButtonDisabled = this.state.hasXError || this.state.hasYError || this.state.hasMineError
            || this.state.hasDimensionError;

        let mineDensityText = "";
        if (isButtonDisabled === false) {
            const mineDensity = (Number(this.state.mineNumber) * 100 / (Number(this.state.xDimension) * Number(this.state.yDimension))).toFixed(1) + "%";
            mineDensityText = "Mine density is " + mineDensity;
        }

        return (
            <React.Fragment>
                <h2 className="minesweeperTitle">Minesweeper</h2>
                {this.state.isGameActive ?
                    <MinesweeperGame
                        xDimension={Number(this.state.xDimension)}
                        yDimension={Number(this.state.yDimension)}
                        mineNumber={Number(this.state.mineNumber)}
                        returnToSettings={this.returnToSettings}
                    />
                    :
                    <div className="minesweeperSettingsContainer">
                        <div>
                            <label htmlFor="xDimension">X Dimension:</label>
                            <input type="text" name="xDimension" value={this.state.xDimension}
                                onChange={this.changeX} onBlur={this.blurX} />
                            {this.state.hasXError ? <span>Error: Dimension value must not be blank or zero</span> : null}
                        </div>
                        <div>
                            <label htmlFor="yDimension">Y Dimension:</label>
                            <input type="text" name="yDimension" value={this.state.yDimension}
                                onChange={this.changeY} onBlur={this.blurY} />
                            {this.state.hasYError ? <span>Error: Dimension value must not be blank or zero</span> : null}
                        </div>
                        <div>
                            <label htmlFor="mineNumber">Mine Number:</label>
                            <input type="text" name="mineNumber" value={this.state.mineNumber}
                                onChange={this.changeMine} onBlur={this.blurMine} />
                            {this.state.hasMineError ? <span>Error: Mine value must not be blank or zero</span> : null}
                        </div>
                        {this.state.hasDimensionError ?
                            <div>{this.state.dimentionErrorText}</div> :
                            <div>{mineDensityText}</div>}
                        <button disabled={isButtonDisabled} onClick={this.startGame}>Start Game</button>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default Minesweeper;
