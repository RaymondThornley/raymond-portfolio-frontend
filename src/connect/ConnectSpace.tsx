import React from 'react';

type ConnectSpaceProps = {
    textValue: string,
    clickFunction: (xVal: number, yVal: number) => void,
    xVal: number,
    yVal: number
}

const ConnectSpace = (props: ConnectSpaceProps) => {
    const clickFunction = function () { props.clickFunction(props.xVal, props.yVal) }

    return <span className={"connectSpace connectSpace" + props.textValue}
        onClick={clickFunction}>{props.textValue}</span>
}

export default ConnectSpace;
