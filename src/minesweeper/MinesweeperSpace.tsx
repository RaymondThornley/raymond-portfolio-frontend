import React from 'react';

type MinesweeperSpaceProps = {
    textValue: string,
    clickFunction: (xVal: number, yVal: number) => void,
    xVal: number,
    yVal: number
}

const MinesweeperSpace = (props: MinesweeperSpaceProps) => {
    const clickFunction = function () { props.clickFunction(props.xVal, props.yVal) }

    return <span className={"minesweeperSpace minesweeperSpace" + props.textValue}
        onClick={clickFunction}>{props.textValue}</span>
}

export default MinesweeperSpace;
