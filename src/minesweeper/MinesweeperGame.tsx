import React from 'react';
import MinesweeperSpace from './MinesweeperSpace';

type SpaceType = {
    textValue: string,
    hasMine: boolean
}

type MinesweeperGameProps = {
    xDimension: number,
    yDimension: number,
    mineNumber: number
}

type MinesweeperGameState = {
    spaceArray: SpaceType[][],
    isFirstClick: boolean,
    flagMode: boolean,
    hasLost: boolean,
    hasWon: boolean
}

class MinesweeperGame extends React.Component<MinesweeperGameProps, MinesweeperGameState>{
    constructor(props: MinesweeperGameProps) {
        super(props);

        const spaceArray = [];
        for (let i = 0; i < props.yDimension; i++) {
            const spaceRow = [];
            for (let j = 0; j < props.xDimension; j++) {
                spaceRow.push({ textValue: "Q", hasMine: false });
            }
            spaceArray.push(spaceRow);
        }

        this.state = {
            spaceArray,
            isFirstClick: true,
            flagMode: false,
            hasLost: false,
            hasWon: false
        }

        this.initializeSpaceArray = this.initializeSpaceArray.bind(this);
        this.clickSpace = this.clickSpace.bind(this);
        this.calculateSpace = this.calculateSpace.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.toggleFlagMode = this.toggleFlagMode.bind(this);
        this.createSpace = this.createSpace.bind(this);
        this.createSpaceRow = this.createSpaceRow.bind(this);
    }

    initializeSpaceArray(xVal: number, yVal: number) {
        const bannedNumbers = [xVal + yVal * this.props.xDimension];
        if (xVal !== 0 && yVal !== 0) { // Up-Left
            bannedNumbers.push((xVal - 1) + (yVal - 1) * this.props.xDimension)
        }
        if (yVal !== 0) { // Up
            bannedNumbers.push(xVal + (yVal - 1) * this.props.xDimension)
        }
        if (xVal !== this.props.xDimension - 1 && yVal !== 0) { // Up-Right
            bannedNumbers.push((xVal + 1) + (yVal - 1) * this.props.xDimension)
        }
        if (xVal !== this.props.xDimension - 1) { // Right
            bannedNumbers.push((xVal + 1) + yVal * this.props.xDimension)
        }
        if (xVal !== this.props.xDimension - 1 && yVal !== this.props.yDimension - 1) { // Down-Right
            bannedNumbers.push((xVal + 1) + (yVal + 1) * this.props.xDimension)
        }
        if (yVal !== this.props.yDimension - 1) { // Down
            bannedNumbers.push(xVal + (yVal + 1) * this.props.xDimension)
        }
        if (xVal !== 0 && yVal !== this.props.yDimension - 1) { // Down-Left
            bannedNumbers.push((xVal - 1) + (yVal + 1) * this.props.xDimension)
        }
        if (xVal !== 0) { // Left
            bannedNumbers.push((xVal - 1) + yVal * this.props.xDimension)
        }

        const allowedNumbers = [];
        for (let i = 0; i < this.props.xDimension * this.props.yDimension; i++) {
            if (bannedNumbers.indexOf(i) === -1) {
                allowedNumbers.push(i);
            }
        }

        const mineNumbers = [];
        for (let i = 0; i < this.props.mineNumber; i++) {
            const randomIndex = Math.floor(Math.random() * allowedNumbers.length);
            const value = allowedNumbers.splice(randomIndex, 1);
            mineNumbers.push(value[0]);
        }

        const spaceArray = [];
        for (let i = 0; i < this.props.yDimension; i++) {
            const spaceRow = [];
            for (let j = 0; j < this.props.xDimension; j++) {
                spaceRow.push({
                    textValue: "Q",
                    hasMine: mineNumbers.indexOf(j + i * this.props.xDimension) !== -1
                })
            }
            spaceArray.push(spaceRow);
        }

        this.setState({ isFirstClick: false });

        this.calculateSpace(xVal, yVal, spaceArray, false);
    }

    clickSpace(xVal: number, yVal: number) {
        if (this.state.hasLost || this.state.hasWon) {
            return;
        }
        if (this.state.isFirstClick) {
            this.initializeSpaceArray(xVal, yVal);
        } else {
            this.calculateSpace(xVal, yVal, this.state.spaceArray, false);
        }
    }

    calculateSpace(xVal: number, yVal: number, spaceArray: SpaceType[][], isCasdade: boolean) {
        if (this.state.flagMode && spaceArray[yVal][xVal].textValue === "F") {
            const newSpace = { ...spaceArray[yVal][xVal], textValue: ("Q") };
            const newSpaceRow = [...spaceArray[yVal]];
            newSpaceRow[xVal] = newSpace;
            let newSpaceArray = [...spaceArray];
            newSpaceArray[yVal] = newSpaceRow;
            this.setState({ spaceArray: newSpaceArray });
            return newSpaceArray;
        }

        if (spaceArray[yVal][xVal].textValue === "Q") {
            if (this.state.flagMode) {
                const newSpace = { ...spaceArray[yVal][xVal], textValue: ("F") };
                const newSpaceRow = [...spaceArray[yVal]];
                newSpaceRow[xVal] = newSpace;
                let newSpaceArray = [...spaceArray];
                newSpaceArray[yVal] = newSpaceRow;
                this.setState({ spaceArray: newSpaceArray });
                return newSpaceArray;
            }

            if (spaceArray[yVal][xVal].hasMine) {
                const newSpaceArray = [];
                for (let i = 0; i < this.props.yDimension; i++) {
                    const newSpaceRow = [];
                    for (let j = 0; j < this.props.xDimension; j++) {
                        const space = spaceArray[i][j];
                        const newSpace = space.hasMine ? { ...space, textValue: "M" } : space;
                        newSpaceRow.push(newSpace);
                    }
                    newSpaceArray.push(newSpaceRow);
                }
                this.setState({ hasLost: true, spaceArray: newSpaceArray });
                return newSpaceArray;
            }

            let mineCount = 0;

            if (xVal !== 0 && yVal !== 0) { // Up-Left
                if (spaceArray[yVal - 1][xVal - 1].hasMine) {
                    mineCount++;
                }
            }
            if (yVal !== 0) { // Up
                if (spaceArray[yVal - 1][xVal].hasMine) {
                    mineCount++;
                }
            }
            if (xVal !== this.props.xDimension - 1 && yVal !== 0) { // Up-Right
                if (spaceArray[yVal - 1][xVal + 1].hasMine) {
                    mineCount++;
                }
            }
            if (xVal !== this.props.xDimension - 1) { // Right
                if (spaceArray[yVal][xVal + 1].hasMine) {
                    mineCount++;
                }
            }
            if (xVal !== this.props.xDimension - 1 && yVal !== this.props.yDimension - 1) { // Down-Right
                if (spaceArray[yVal + 1][xVal + 1].hasMine) {
                    mineCount++;
                }
            }
            if (yVal !== this.props.yDimension - 1) { // Down
                if (spaceArray[yVal + 1][xVal].hasMine) {
                    mineCount++;
                }
            }
            if (xVal !== 0 && yVal !== this.props.yDimension - 1) { // Down-Left
                if (spaceArray[yVal + 1][xVal - 1].hasMine) {
                    mineCount++;
                }
            }
            if (xVal !== 0) { // Left
                if (spaceArray[yVal][xVal - 1].hasMine) {
                    mineCount++;
                }
            }

            const newSpace = { ...spaceArray[yVal][xVal], textValue: ("" + mineCount) };
            const newSpaceRow = [...spaceArray[yVal]];
            newSpaceRow[xVal] = newSpace;
            let newSpaceArray = [...spaceArray];
            newSpaceArray[yVal] = newSpaceRow;

            if (mineCount === 0) {
                if (xVal !== 0 && yVal !== 0) { // Up-Left
                    newSpaceArray = this.calculateSpace(xVal - 1, yVal - 1, newSpaceArray, true);
                }
                if (yVal !== 0) { // Up
                    newSpaceArray = this.calculateSpace(xVal, yVal - 1, newSpaceArray, true);
                }
                if (xVal !== this.props.xDimension - 1 && yVal !== 0) { // Up-Right
                    newSpaceArray = this.calculateSpace(xVal + 1, yVal - 1, newSpaceArray, true);
                }
                if (xVal !== this.props.xDimension - 1) { // Right
                    newSpaceArray = this.calculateSpace(xVal + 1, yVal, newSpaceArray, true);
                }
                if (xVal !== this.props.xDimension - 1 && yVal !== this.props.yDimension - 1) { // Down-Right
                    newSpaceArray = this.calculateSpace(xVal + 1, yVal + 1, newSpaceArray, true);
                }
                if (yVal !== this.props.yDimension - 1) { // Down
                    newSpaceArray = this.calculateSpace(xVal, yVal + 1, newSpaceArray, true);
                }
                if (xVal !== 0 && yVal !== this.props.yDimension - 1) { // Down-Left
                    newSpaceArray = this.calculateSpace(xVal - 1, yVal + 1, newSpaceArray, true);
                }
                if (xVal !== 0) { // Left
                    newSpaceArray = this.calculateSpace(xVal - 1, yVal, newSpaceArray, true);
                }
            }

            if (isCasdade === false) {
                const isWin = this.checkWin(newSpaceArray);
                if (isWin === false) {
                    this.setState({ spaceArray: newSpaceArray });
                }
            }

            return newSpaceArray;
        } else {
            return spaceArray;
        }
    }

    checkWin(spaceArray: SpaceType[][]) {
        for (let i = 0; i < this.props.yDimension; i++) {
            for (let j = 0; j < this.props.xDimension; j++) {
                const space = spaceArray[i][j];
                if (space.textValue === "Q" && space.hasMine === false) {
                    return false;
                }
            }
        }
        this.setState({ spaceArray, hasWon: true });
        return true;
    }

    toggleFlagMode() {
        this.setState({ flagMode: !this.state.flagMode });
    }

    createSpace(yVal: number) {
        const clickSpace = this.clickSpace
        return function (space: SpaceType, xVal: number) {
            return <MinesweeperSpace
                textValue={space.textValue}
                clickFunction={clickSpace}
                xVal={xVal}
                yVal={yVal}
            />
        }
    }

    createSpaceRow(spaceRow: SpaceType[], index: number) {
        return <div>{spaceRow.map(this.createSpace(index))}</div>
    }

    render() {
        return (
            <div>
                {this.state.spaceArray.map(this.createSpaceRow)}
                <button disabled={this.state.isFirstClick || this.state.hasWon || this.state.hasLost}
                    onClick={this.toggleFlagMode}>{this.state.flagMode ? "Stop Flag Mode" : "Start Flag Mode"}</button>
                {this.state.hasWon ? <span>You won!</span> : null}
                {this.state.hasLost ? <span>You lost.</span> : null}
            </div>
        )
    }
}

export default MinesweeperGame;
