import React from 'react';

type MinesweeperSpaceProps = {
    textValue: string,
    clickFunction: (xVal: number, yVal: number) => void,
    xVal: number,
    yVal: number
}

const MinesweeperSpace = (props: MinesweeperSpaceProps) => {
    const clickFunction = function () { props.clickFunction(props.xVal, props.yVal) }

    return <input type="button" value={props.textValue} onClick={clickFunction} />
}

export default MinesweeperSpace;
