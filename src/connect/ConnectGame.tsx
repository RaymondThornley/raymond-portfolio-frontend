import React from 'react';
import { aiList } from './ConnectAi';
import ConnectSpace from './ConnectSpace';

const playerSpaceText = ["X", "O"];

export type SpaceType = {
    textValue: string
}

type ConnectGameProps = {
    versusAi: boolean,
    aiIndex: number,
    aiPlayerOne: boolean,
    dimention: number,
    returnToSettings: () => void
}

type ConnectGameState = {
    board: SpaceType[][],
    currentPlayer: number,
    isWin: boolean
}

class ConnectGame extends React.Component<ConnectGameProps, ConnectGameState>{
    constructor(props: ConnectGameProps) {
        super(props);

        const board = this.createEmptyBoard();

        this.state = {
            board,
            currentPlayer: 1,
            isWin: false
        };

        this.isAiTurn = this.isAiTurn.bind(this);
        this.createEmptyBoard = this.createEmptyBoard.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.editBoard = this.editBoard.bind(this);
        this.aiTurn = this.aiTurn.bind(this);
        this.clickFunction = this.clickFunction.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.createBoardSpace = this.createBoardSpace.bind(this);
        this.createBoardArray = this.createBoardArray.bind(this);
    }

    componentDidMount() {
        if (this.isAiTurn()) {
            this.aiTurn();
        }
    }

    componentDidUpdate() {
        if (this.isAiTurn()) {
            this.aiTurn();
        }
    }

    isAiTurn() {
        return (this.props.versusAi === true && (this.props.aiPlayerOne === (this.state.currentPlayer === 1))
            && this.state.isWin === false);
    }

    createEmptyBoard() {
        const board = [];

        for (let i = 0; i < this.props.dimention; i++) {
            const boardRow = [];
            for (let j = 0; j < this.props.dimention; j++) {
                boardRow.push({ textValue: "Q" });
            }
            board.push(boardRow);
        }

        return board;
    }

    checkWin(board: SpaceType[][], xPos: number, yPos: number, playerText: string) {
        if (yPos + 4 < this.props.dimention
            && board[yPos + 1][xPos].textValue === playerText && board[yPos + 2][xPos].textValue === playerText
            && board[yPos + 3][xPos].textValue === playerText && board[yPos + 4][xPos].textValue === playerText) {
            return true;
        }
        if (xPos + 4 < this.props.dimention && yPos + 4 < this.props.dimention
            && board[yPos + 1][xPos + 1].textValue === playerText && board[yPos + 2][xPos + 2].textValue === playerText
            && board[yPos + 3][xPos + 3].textValue === playerText && board[yPos + 4][xPos + 4].textValue === playerText) {
            return true;
        }
        if (xPos + 4 < this.props.dimention
            && board[yPos][xPos + 1].textValue === playerText && board[yPos][xPos + 2].textValue === playerText
            && board[yPos][xPos + 3].textValue === playerText && board[yPos][xPos + 4].textValue === playerText) {
            return true;
        }
        if (xPos + 4 < this.props.dimention && yPos > 3
            && board[yPos - 1][xPos + 1].textValue === playerText && board[yPos - 2][xPos + 2].textValue === playerText
            && board[yPos - 3][xPos + 3].textValue === playerText && board[yPos - 4][xPos + 4].textValue === playerText) {
            return true;
        }
        if (yPos > 3
            && board[yPos - 1][xPos].textValue === playerText && board[yPos - 2][xPos].textValue === playerText
            && board[yPos - 3][xPos].textValue === playerText && board[yPos - 4][xPos].textValue === playerText) {
            return true;
        }
        if (xPos > 3 && yPos > 3
            && board[yPos - 1][xPos - 1].textValue === playerText && board[yPos - 2][xPos - 2].textValue === playerText
            && board[yPos - 3][xPos - 3].textValue === playerText && board[yPos - 4][xPos - 4].textValue === playerText) {
            return true;
        }
        if (xPos > 3
            && board[yPos][xPos - 1].textValue === playerText && board[yPos][xPos - 2].textValue === playerText
            && board[yPos][xPos - 3].textValue === playerText && board[yPos][xPos - 4].textValue === playerText) {
            return true;
        }
        if (xPos > 3 && yPos + 4 < this.props.dimention
            && board[yPos + 1][xPos - 1].textValue === playerText && board[yPos + 2][xPos - 2].textValue === playerText
            && board[yPos + 3][xPos - 3].textValue === playerText && board[yPos + 4][xPos - 4].textValue === playerText) {
            return true;
        }

        return false;
    }

    editBoard(xPos: number, yPos: number, player: number) {
        const newSpace = { ...this.state.board[yPos][xPos], textValue: playerSpaceText[player - 1] };
        const newRow = [...this.state.board[yPos]];
        newRow[xPos] = newSpace;
        const newBoard = [...this.state.board];
        newBoard[yPos] = newRow;

        const isWin = this.checkWin(newBoard, xPos, yPos, playerSpaceText[player - 1]);

        if (isWin) {
            this.setState({ board: newBoard, isWin: true });
        } else {
            this.setState({ board: newBoard, currentPlayer: this.state.currentPlayer === 1 ? 2 : 1 });
        }
    }

    aiTurn() {
        const aiMove = aiList[this.props.aiIndex].chooseSquare(this.state.board);

        if (aiMove === null) {
            console.log("AI Error");
            return;
        }

        this.editBoard(aiMove.xPos, aiMove.yPos, this.props.aiPlayerOne ? 1 : 2);
    }

    clickFunction(xVal: number, yVal: number) {
        if (this.isAiTurn() || this.state.isWin === true || this.state.board[yVal][xVal].textValue !== "Q") {
            return;
        }
        this.editBoard(xVal, yVal, this.state.currentPlayer);
    }

    restartGame() {
        const board = this.createEmptyBoard();

        this.setState({
            board, currentPlayer: 1, isWin: false
        });
    }

    createBoardSpace(yVal: number) {
        const clickFunction = this.clickFunction;
        return function (space: SpaceType, xVal: number) {
            return <ConnectSpace
                textValue={space.textValue}
                clickFunction={clickFunction}
                xVal={xVal}
                yVal={yVal}
                key={xVal + " " + yVal}
            />
        }
    }

    createBoardArray(boardRow: SpaceType[], index: number) {
        return <div key={index}>{boardRow.map(this.createBoardSpace(index))}</div>
    }

    render() {
        const gameText = this.state.isWin ? this.props.versusAi ?
            this.props.versusAi === true && (this.props.aiPlayerOne === (this.state.currentPlayer === 1)) ? "Computer wins!" : "Player wins!"
            : "Player " + playerSpaceText[this.state.currentPlayer - 1] + " wins!"
            : this.props.versusAi ? this.isAiTurn() ? "Computer's turn" : "Player's turn"
                : "Player " + playerSpaceText[this.state.currentPlayer - 1] + "'s turn";


        return (
            <div className="connectGame">
                <div className="connectBoard">
                    {this.state.board.map(this.createBoardArray)}
                </div>
                <div className="connectButtonList">
                    <button className="connectButton" onClick={this.restartGame}>Restart Game</button>
                    <button className="connectButton" onClick={this.props.returnToSettings}>Return to Settings</button>
                </div>
                <span>{gameText}</span>
            </div>
        );
    }
}

export default ConnectGame;
