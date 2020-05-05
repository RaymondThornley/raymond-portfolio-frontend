import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MastermindGame from './MastermindGame';
import '../css/mastermind.css';

type optionType = {
    numOptions: number,
    optionTypeName: string,
    optionNames: string[]
}

const optionList: optionType[] = [
    {
        numOptions: 6,
        optionTypeName: "Six colors",
        optionNames: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"]
    },
    {
        numOptions: 7,
        optionTypeName: "Seven colors",
        optionNames: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
    },
    {
        numOptions: 10,
        optionTypeName: "Digits",
        optionNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    }
]

type MastermindState = {
    selectedOptionType: number,
    numItems: string,
    isDuplicatesAllowed: boolean,
    numGuesses: string,
    isGameActive: boolean,
    hasItemError: boolean,
    hasGuessError: boolean,
    hasTooManyItemsError: boolean
}

class Mastermind extends React.Component<{}, MastermindState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedOptionType: 0,
            numItems: "4",
            isDuplicatesAllowed: false,
            numGuesses: "10",
            isGameActive: false,
            hasItemError: false,
            hasGuessError: false,
            hasTooManyItemsError: false
        }

        this.changeOption = this.changeOption.bind(this);
        this.changeItemNum = this.changeItemNum.bind(this);
        this.blurItemNum = this.blurItemNum.bind(this);
        this.toggleDuplicates = this.toggleDuplicates.bind(this);
        this.changeGuessNum = this.changeGuessNum.bind(this);
        this.blurGuessNum = this.blurGuessNum.bind(this);
        this.startGame = this.startGame.bind(this);
        this.returnToSettings = this.returnToSettings.bind(this);
        this.createOption = this.createOption.bind(this);
    }

    changeOption(event: React.SyntheticEvent<HTMLSelectElement>) {
        const newValue = Number(event.currentTarget.value);
        this.setState({ selectedOptionType: newValue });
        this.validateTooManyItems(newValue, this.state.numItems, this.state.isDuplicatesAllowed);
    }

    changeItemNum(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0" || newValue.match("^[1-9]\\d{0,1}$")) {
            this.setState({ numItems: newValue });
        }
    }

    blurItemNum(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0") {
            this.setState({ hasItemError: true });
        } else {
            this.setState({ hasItemError: false });
            this.validateTooManyItems(this.state.selectedOptionType, newValue, this.state.isDuplicatesAllowed);
        }
    }

    toggleDuplicates(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.checked;
        this.setState({ isDuplicatesAllowed: newValue });
        this.validateTooManyItems(this.state.selectedOptionType, this.state.numItems, newValue);
    }

    changeGuessNum(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0" || newValue.match("^[1-9]\\d{0,1}$")) {
            this.setState({ numGuesses: newValue });
        }
    }

    blurGuessNum(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0") {
            this.setState({ hasGuessError: true });
        } else {
            this.setState({ hasGuessError: false });
        }
    }

    validateTooManyItems(selectedOptionType: number, numItems: string, isDuplicatesAllowed: boolean) {
        if (isDuplicatesAllowed === false && optionList[selectedOptionType].numOptions < Number(numItems)) {
            this.setState({ hasTooManyItemsError: true });
        } else {
            this.setState({ hasTooManyItemsError: false });
        }
    }

    startGame() {
        this.setState({ isGameActive: true });
    }

    returnToSettings() {
        this.setState({ isGameActive: false });
    }

    createOption(option: optionType, index: number) {
        return (
            <option value={index} key={index}>
                {option.optionTypeName + " (" + option.numOptions + " options)"}
            </option>
        )
    }

    render() {
        const isButtonDisabled = this.state.hasItemError || this.state.hasGuessError || this.state.hasTooManyItemsError

        return (
            <React.Fragment>
                <h2 className="mastermindTitle">Mastermind</h2>
                {this.state.isGameActive ?
                    <MastermindGame
                        numOptions={optionList[this.state.selectedOptionType].numOptions}
                        optionTypeName={optionList[this.state.selectedOptionType].optionTypeName}
                        optionNames={optionList[this.state.selectedOptionType].optionNames}
                        numItems={Number(this.state.numItems)}
                        isDuplicatesAllowed={this.state.isDuplicatesAllowed}
                        numGuesses={Number(this.state.numGuesses)}
                        returnToSettings={this.returnToSettings}
                    />
                    :
                    <div className="gameSettingsContainer">
                        <Row className="rowNoMargin">
                            <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                <label htmlFor="selectOption" className="gameSettingsLabel">Choose options:</label>
                            </Col>
                            <Col xs={12} sm={6} className="gameSettingsOption">
                                <select name="selectOption" value={this.state.selectedOptionType}
                                    onChange={this.changeOption}>
                                    {optionList.map(this.createOption)}
                                </select>
                            </Col>
                        </Row>
                        <Row className="rowNoMargin">
                            <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                <label htmlFor="numItems" className="gameSettingsLabel">Number of items to guess:</label>
                            </Col>
                            <Col xs={12} sm={6} className="gameSettingsOption">
                                <input type="text" name="numItems" value={this.state.numItems}
                                    onChange={this.changeItemNum} onBlur={this.blurItemNum} />
                                {this.state.hasItemError ? <span>Error: Number of Items value must not be blank or zero</span> : null}
                            </Col>
                        </Row>
                        <Row className="rowNoMargin">
                            <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                <label htmlFor="allowDuplicates" className="gameSettingsLabel">Allow Duplicates:</label>
                            </Col>
                            <Col xs={12} sm={6} className="gameSettingsOption">
                                <input type="checkbox" name="allowDuplicates" checked={this.state.isDuplicatesAllowed}
                                    onChange={this.toggleDuplicates} />
                            </Col>
                        </Row>
                        <Row className="rowNoMargin">
                            <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                <label htmlFor="numGuesses" className="gameSettingsLabel">Number of guesses:</label>
                            </Col>
                            <Col xs={12} sm={6} className="gameSettingsOption">
                                <input type="text" name="numGuesses" value={this.state.numGuesses}
                                    onChange={this.changeGuessNum} onBlur={this.blurGuessNum} />
                                {this.state.hasGuessError ? <span>Error: Number of Guesses value must not be blank or zero</span> : null}
                            </Col>
                        </Row>
                        {this.state.hasTooManyItemsError ?
                            <div>Error: Too may items for current option list is no duplicates</div> : null}
                        <button disabled={isButtonDisabled} onClick={this.startGame}>Start Game</button>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default Mastermind;
