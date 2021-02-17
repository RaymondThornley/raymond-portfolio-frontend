import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ConnectGame from './ConnectGame';
import { aiList, aiControls } from './ConnectAi';
import '../css/connect.css';

type ConnectState = {
    isGameActive: boolean,
    versusAi: boolean,
    aiIndex: number,
    aiPlayerOne: boolean,
    dimention: string,
    hasDimensionError: boolean
}

class Connect extends React.Component<{}, ConnectState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isGameActive: false,
            versusAi: false,
            aiIndex: 0,
            aiPlayerOne: false,
            dimention: "15",
            hasDimensionError: false
        }

        this.toggleAi = this.toggleAi.bind(this);
        this.changeAi = this.changeAi.bind(this);
        this.toggleAiPlayerOne = this.toggleAiPlayerOne.bind(this);
        this.changeDimension = this.changeDimension.bind(this);
        this.blurDimension = this.blurDimension.bind(this);
        this.startGame = this.startGame.bind(this);
        this.returnToSettings = this.returnToSettings.bind(this);
        this.createOption = this.createOption.bind(this);
    }

    toggleAi(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.checked;
        this.setState({ versusAi: newValue });
    }

    changeAi(event: React.SyntheticEvent<HTMLSelectElement>) {
        const newValue = Number(event.currentTarget.value);
        this.setState({ aiIndex: newValue });
    }

    toggleAiPlayerOne(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.checked;
        this.setState({ aiPlayerOne: newValue });
    }

    changeDimension(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0" || newValue.match("^[1-9]\\d{0,1}$")) {
            this.setState({ dimention: newValue });
        }
    }

    blurDimension(event: React.SyntheticEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        if (newValue === "" || newValue === "0") {
            this.setState({ hasDimensionError: true });
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

    createOption(option: aiControls, index: number) {
        return (
            <option value={index} key={index}>
                {option.name}
            </option>
        )
    }

    render() {
        const isButtonDisabled = this.state.hasDimensionError;

        return (
            <React.Fragment>
                <h2 className="gameTitle">Connect 5</h2>
                {this.state.isGameActive ? <ConnectGame
                    versusAi={this.state.versusAi}
                    aiIndex={this.state.aiIndex}
                    aiPlayerOne={this.state.aiPlayerOne}
                    dimention={Number(this.state.dimention)}
                    returnToSettings={this.returnToSettings}
                />
                    :
                    <div className="gameSettingsContainer">
                        <Row className="rowNoMargin">
                            <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                <label htmlFor="dimension" className="gameSettingsLabel">Board size:</label>
                            </Col>
                            <Col xs={12} sm={6} className="gameSettingsOption">
                                <input type="text" name="dimension" value={this.state.dimention}
                                    onChange={this.changeDimension} onBlur={this.blurDimension} />
                                {this.state.hasDimensionError ? <span>Error: Size value must not be blank or zero</span> : null}
                            </Col>
                        </Row>
                        <Row className="rowNoMargin">
                            <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                <label htmlFor="versusAi" className="gameSettingsLabel">Play against AI:</label>
                            </Col>
                            <Col xs={12} sm={6} className="gameSettingsOption">
                                <input type="checkbox" name="versusAi" checked={this.state.versusAi}
                                    onChange={this.toggleAi} />
                            </Col>
                        </Row>
                        {this.state.versusAi ? <React.Fragment>
                            <Row className="rowNoMargin">
                                <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                    <label htmlFor="selectAi" className="gameSettingsLabel">Choose options:</label>
                                </Col>
                                <Col xs={12} sm={6} className="gameSettingsOption">
                                    <select name="selectAi" value={this.state.aiIndex}
                                        onChange={this.changeAi}>
                                        {aiList.map(this.createOption)}
                                    </select>
                                </Col>
                            </Row>
                            <Row className="rowNoMargin">
                                <Col xs={12} sm={6} className="gameSettingsLabelContainer">
                                    <label htmlFor="aiFirst" className="gameSettingsLabel">Let AI go first:</label>
                                </Col>
                                <Col xs={12} sm={6} className="gameSettingsOption">
                                    <input type="checkbox" name="aiFirst" checked={this.state.aiPlayerOne}
                                        onChange={this.toggleAiPlayerOne} />
                                </Col>
                            </Row>
                        </React.Fragment> : null}
                        <button disabled={isButtonDisabled} onClick={this.startGame}>Start Game</button>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default Connect;
