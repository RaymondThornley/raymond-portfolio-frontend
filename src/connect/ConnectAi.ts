import { SpaceType } from './ConnectGame';

export type aiChosenSquare = {
    xPos: number,
    yPos: number
}

export type aiControls = {
    name: string,
    chooseSquare: (board: SpaceType[][]) => aiChosenSquare | null // Only should return null on error
}

const aiTest: aiControls = { // Remove when ai controls work and replace with better
    name: "Test",
    chooseSquare: function (board: SpaceType[][]) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j].textValue === "Q") {
                    return { xPos: j, yPos: i }
                }
            }
        }

        return null;
    }
}

export const aiList = [aiTest];
