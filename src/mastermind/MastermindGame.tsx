import React from 'react';

type guessHistoryItemType = {
    guessNumbers: number[],
    guessCorrectPlace: number,
    guessIncorrectPlace: number
}

type MastermindGameProps = {
    numOptions: number,
    optionTypeName: string,
    optionNames: string[],
    numItems: number,
    isDuplicatesAllowed: boolean,
    numGuesses: number,
    returnToSettings: () => void
}

type MastermindGameState = {
    solutionList: number[],
    guessList: number[],
    guessHistory: guessHistoryItemType[],
    isWin: boolean,
    isLose: boolean
}

class MastermindGame extends React.Component<MastermindGameProps, MastermindGameState>{
    constructor(props: MastermindGameProps) {
        super(props);

        this.state = {
            solutionList: [],
            guessList: [],
            guessHistory: [],
            isWin: false,
            isLose: false
        }

        this.createSolution = this.createSolution.bind(this);
        this.checkGuess = this.checkGuess.bind(this);
        this.changeGuess = this.changeGuess.bind(this);
        this.createSolutionCell = this.createSolutionCell.bind(this);
        this.createGuessHistoryRow = this.createGuessHistoryRow.bind(this);
        this.createGuessHistoryCell = this.createGuessHistoryCell.bind(this);
        this.createGuessCell = this.createGuessCell.bind(this);
        this.createOption = this.createOption.bind(this);
    }

    componentDidMount() {
        this.createSolution();
    }

    createSolution() {
        let numList: number[] = [];
        for (let i = 0; i < this.props.numOptions; i++) {
            numList.push(i);
        }

        let solutionList: number[] = [];
        let guessList: number[] = [];
        for (let i = 0; i < this.props.numItems; i++) {
            const randomIndex = Math.floor(Math.random() * numList.length);
            solutionList.push(numList[randomIndex]);
            if (this.props.isDuplicatesAllowed === false) {
                numList.splice(randomIndex, 1);
            }
            guessList.push(0);
        }

        this.setState({ solutionList, guessList });
    }

    checkGuess() {
        let guessCorrectPlace = 0;
        for (let i = 0; i < this.props.numItems; i++) {
            if (this.state.solutionList[i] === this.state.guessList[i]) {
                guessCorrectPlace++;
            }
        }

        let guessIncorrectPlace = 0;
        let itemsByIndex = [];
        let guessByIndex = [];
        for (let i = 0; i < this.props.numOptions; i++) {
            itemsByIndex.push(0);
            guessByIndex.push(0);
        }
        for (let i = 0; i < this.state.solutionList.length; i++) {
            itemsByIndex[this.state.solutionList[i]] += 1;
            guessByIndex[this.state.guessList[i]] += 1;
        }
        for (let i = 0; i < itemsByIndex.length; i++) {
            guessIncorrectPlace += Math.min(itemsByIndex[i], guessByIndex[i]);
        }
        guessIncorrectPlace -= guessCorrectPlace;

        const newGuessHistoryRow: guessHistoryItemType = {
            guessNumbers: [...this.state.guessList],
            guessCorrectPlace,
            guessIncorrectPlace
        }
        const newGuessHistory = [...this.state.guessHistory, newGuessHistoryRow];
        this.setState({ guessHistory: newGuessHistory });

        if (guessCorrectPlace === this.state.solutionList.length) {
            this.setState({ isWin: true });
        } else if (newGuessHistory.length === this.props.numGuesses) {
            this.setState({ isLose: true });
        }
    }

    changeGuess(index: number, newValue: number) {
        const newGuessList = [...this.state.guessList];
        newGuessList[index] = newValue;
        this.setState({ guessList: newGuessList });
    }

    createSolutionCell(solution: number, index: number) {
        return <td key={index}>{this.state.isWin || this.state.isLose ? this.props.optionNames[solution] : "?"}</td>
    }

    createGuessHistoryRow(guessHistoryItem: guessHistoryItemType, index: number) {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                {guessHistoryItem.guessNumbers.map(this.createGuessHistoryCell)}
                <td>{guessHistoryItem.guessCorrectPlace}</td>
                <td>{guessHistoryItem.guessIncorrectPlace}</td>
            </tr>
        );
    }

    createGuessHistoryCell(item: number, index: number) {
        return (<td key={index}>{this.props.optionNames[item]}</td>);
    }

    createGuessCell(guess: number, index: number) {
        const ChangeGuessIndex = this.changeGuess;
        const changeGuess = function (event: React.ChangeEvent<HTMLSelectElement>) {
            ChangeGuessIndex(index, Number(event.currentTarget.value));
        }

        return (
            <td key={index}>
                <select value={this.state.guessList[index]} onChange={changeGuess}>
                    {this.props.optionNames.map(this.createOption)}
                </select>
            </td>
        );
    }

    createOption(name: string, index: number) {
        return (<option value={index} key={index}>{name}</option>);
    }

    render() {
        let bottomText = "";
        let hasDuplicate = false;
        if (this.state.isWin) {
            bottomText = "You won!"
        } else if (this.state.isLose) {
            bottomText = "You lose."
        } else if (this.props.isDuplicatesAllowed === false) {
            for (let i = 0; (i < this.state.guessList.length - 1) && (hasDuplicate === false); i++) {
                for (let j = i + 1; (j < this.state.guessList.length) && (hasDuplicate === false); j++) {
                    if (this.state.guessList[i] === this.state.guessList[j]) {
                        hasDuplicate = true;
                    }
                }
            }
            if (hasDuplicate) {
                bottomText = "Duplicate guesses are not allowed."
            }
        }

        return (
            <React.Fragment>
                <table className="mastermindGuessTable">
                    <thead>
                        <tr>
                            <td>Guess Number</td>
                            {this.state.solutionList.map(this.createSolutionCell)}
                            <td>Correct Place</td>
                            <td>Incorrect Place</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.guessHistory.map(this.createGuessHistoryRow)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Next Guess:</td>
                            {this.state.guessList.map(this.createGuessCell)}
                            <td colSpan={2}>You have {this.props.numGuesses - this.state.guessHistory.length} guesses left</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="mastermindButtonContainer">
                    <button onClick={this.checkGuess} disabled={this.state.isWin || this.state.isLose || hasDuplicate}>Check Guess</button>
                    <button onClick={this.props.returnToSettings}>Return to Settings</button>
                </div>
                <div className="masterminBottomText">{bottomText}</div>
            </React.Fragment>
        );
    }
}

export default MastermindGame;
