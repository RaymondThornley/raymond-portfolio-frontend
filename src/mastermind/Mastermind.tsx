import React from 'react';

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
    selectedOptionType: optionType,
    numItems: number,
    isDuplicatesAllowed: boolean,
    isInfiniteGuesses: boolean,
    numGuesses: string,
    isGameActive: boolean
}

class Mastermind extends React.Component<{}, MastermindState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedOptionType: optionList[0],
            numItems: 4,
            isDuplicatesAllowed: false,
            isInfiniteGuesses: false,
            numGuesses: "10",
            isGameActive: false
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isGameActive ?
                    <div></div> :
                    <div></div>}
            </React.Fragment>
        );
    }
}

export default Mastermind;
