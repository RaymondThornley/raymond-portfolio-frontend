import React from 'react';

type controlsType = {
    move: () => string
    shoot: () => boolean
}

type bulletType = {
    xPos: number,
    yPos: number,
    xVel: number,
    yVel: number
}

type tankObject = {
    x: number,
    y: number,
    offset: number,
    color: number,
    cooldown: number,
    lives: number,
    bullets: bulletType[],
    bulletCounter: number,
    control: controlsType,
    upBorder: number,
    downBorder: number,
    leftBorder: number,
    rightBorder: number,
    animate: () => void,
    draw: () => void
}

type obstacleType = {
    size: number,
    x: number,
    y: number
}

type gameType = {
    init: (ref: React.RefObject<HTMLCanvasElement>) => void,
    load: () => void,
    ready: () => void,
    restart: () => void,
    startPlayer: () => void,
    startAi: () => void,
    end: () => void,
    animationLoop: () => void,
    animate: () => void,

    startable: boolean,
    restartable: boolean,
    showControls: boolean,
    loaded: number,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    playerOneWinScreen: HTMLImageElement,
    playerTwoWinScreen: HTMLImageElement,
    controlWindow: HTMLImageElement,
    tank: HTMLImageElement,

    wKey: boolean,
    aKey: boolean,
    sKey: boolean,
    dKey: boolean,
    eKey: boolean,
    leftKey: boolean,
    upKey: boolean,
    rightKey: boolean,
    downKey: boolean,
    dotKey: boolean,
    oneKey: boolean,
    twoKey: boolean,
    rKey: boolean,
    cKey: boolean,


    animationTimeout: number,
    ended: boolean,
    animationInterval: NodeJS.Timeout,
    animationFrame: number,
    playerOneWin: boolean,
    playerTwoWin: boolean,
    controlToggle: boolean,

    tanks: tankObject[],
    obstacle: obstacleType[]
}

// Setup requestAnimationFrame and cancelAnimationFrame for use in the game code
// (function () {
//     const lastTime = 0;
//     const vendors = ['ms', 'moz', 'webkit', 'o'];
//     for (const x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//         window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//         window.cancelAnimationFrame =
//             window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
//     }

//     if (!window.requestAnimationFrame)
//         window.requestAnimationFrame = function (callback) {
//             const currTime = new Date().getTime();
//             const timeToCall = Math.max(0, 16 - (currTime - lastTime));
//             const id = window.setTimeout(function () { callback(currTime + timeToCall); },
//                 timeToCall);
//             lastTime = currTime + timeToCall;
//             return id;
//         };

//     if (!window.cancelAnimationFrame)
//         window.cancelAnimationFrame = function (id) {
//             clearTimeout(id);
//         };
// }());

// Manual keyboard control scheme using WASD to move and E to shoot
const wasdeControls: controlsType = {
    move: function () {
        let move = 0;
        let command = 'Stationary';
        if (game.wKey) {
            move += 1;
        }
        if (game.sKey) {
            move += 2;
        }
        if (game.aKey) {
            move += 4;
        }
        if (game.dKey) {
            move += 8;
        }

        switch (move) {
            // No Movement
            case 0:
            case 3:
            case 12:
            case 15:
                break;

            // Moving Up
            case 1:
            case 13:
                command = 'Up';
                break;

            // Moving Up Right
            case 9:
                command = 'UpRight';
                break;

            // Moving Right
            case 8:
            case 11:
                command = 'Right';
                break;

            // Moving Down Right
            case 10:
                command = 'DownRight';
                break;

            // Moving Down
            case 2:
            case 14:
                command = 'Down';
                break;

            // Moving Down Left
            case 6:
                command = 'DownLeft';
                break;

            // Moving Left
            case 4:
            case 7:
                command = 'Left';
                break;

            // Moving Up Left
            case 5:
                command = 'UpLeft';
                break;
        }
        return command;
    },

    shoot: function () {
        return game.eKey;
    }
}

// Manual keyboard control scheme using the arrow keys to move and . to shoot
const arrowControls: controlsType = {
    move: function () {
        let move = 0;
        let command = 'Stationary';
        if (game.upKey) {
            move += 1;
        }
        if (game.downKey) {
            move += 2;
        }
        if (game.leftKey) {
            move += 4;
        }
        if (game.rightKey) {
            move += 8;
        }

        switch (move) {
            // No Movement
            case 0:
            case 3:
            case 12:
            case 15:
                break;

            // Moving Up
            case 1:
            case 13:
                command = 'Up';
                break;

            // Moving Up Right
            case 9:
                command = 'UpRight';
                break;

            // Moving Right
            case 8:
            case 11:
                command = 'Right';
                break;

            // Moving Down Right
            case 10:
                command = 'DownRight';
                break;

            // Moving Down
            case 2:
            case 14:
                command = 'Down';
                break;

            // Moving Down Left
            case 6:
                command = 'DownLeft';
                break;

            // Moving Left
            case 4:
            case 7:
                command = 'Left';
                break;

            // Moving Up Left
            case 5:
                command = 'UpLeft';
                break;
        }
        return command;
    },

    shoot: function () {
        return game.dotKey;
    }
}

// Stay stationary without shooting controls
const nullControls: controlsType = {
    move: function () {
        return 'Stationary';
    },

    shoot: function () {
        return false;
    }
}

// Controls for the AI. Assumes that game.tanks[0] is the player and game.tanks[1] is the AI
const aiControls: controlsType = {
    move: function () {
        let move = '';
        if (game.tanks[1].y > game.tanks[0].y + 20) {
            move = move.concat('Up');
        } else if (game.tanks[1].y < game.tanks[0].y - 20) {
            move = move.concat('Down');
        }
        if (game.tanks[1].x > game.tanks[0].x + 20) {
            move = move.concat('Left');
        } else if (game.tanks[1].x < game.tanks[0].x - 20) {
            move = move.concat('Right');
        }

        return move;
    },

    shoot: function () {
        switch (game.tanks[1].offset) {
            case 0:
                return ((game.tanks[0].x > game.tanks[1].x - 30) && (game.tanks[0].x < game.tanks[1].x + 30) && (game.tanks[0].y < game.tanks[1].y));

            case 1:
                return ((game.tanks[0].x + game.tanks[0].y > game.tanks[1].x + game.tanks[1].y - 30) && (game.tanks[0].x + game.tanks[0].y < game.tanks[1].x + game.tanks[1].y + 30) && (game.tanks[0].x - game.tanks[0].y > game.tanks[1].x - game.tanks[1].y));

            case 2:
                return ((game.tanks[0].y > game.tanks[1].y - 30) && (game.tanks[0].y < game.tanks[1].y + 30) && (game.tanks[0].x > game.tanks[1].x));

            case 3:
                return ((game.tanks[0].x - game.tanks[0].y > game.tanks[1].x - game.tanks[1].y - 30) && (game.tanks[0].x - game.tanks[0].y < game.tanks[1].x - game.tanks[1].y + 30) && (game.tanks[0].x + game.tanks[0].y > game.tanks[1].x + game.tanks[1].y));

            case 4:
                return ((game.tanks[0].x > game.tanks[1].x - 30) && (game.tanks[0].x < game.tanks[1].x + 30) && (game.tanks[0].y > game.tanks[1].y));

            case 5:
                return ((game.tanks[0].x + game.tanks[0].y > game.tanks[1].x + game.tanks[1].y - 30) && (game.tanks[0].x + game.tanks[0].y < game.tanks[1].x + game.tanks[1].y + 30) && (game.tanks[0].x - game.tanks[0].y < game.tanks[1].x - game.tanks[1].y));

            case 6:
                return ((game.tanks[0].y > game.tanks[1].y - 30) && (game.tanks[0].y < game.tanks[1].y + 30) && (game.tanks[0].x < game.tanks[1].x));

            case 7:
                return ((game.tanks[0].x - game.tanks[0].y > game.tanks[1].x - game.tanks[1].y - 30) && (game.tanks[0].x - game.tanks[0].y < game.tanks[1].x - game.tanks[1].y + 30) && (game.tanks[0].x + game.tanks[0].y < game.tanks[1].x + game.tanks[1].y));
            default:
                return false;
        }
    }
}

// A stationary bullet outside of the screen
function Bullet() {
    const newBullet: bulletType = {
        xPos: -10,
        yPos: -10,
        xVel: 0,
        yVel: 0
    }

    return newBullet;
}

/*
    Constructor function for the Tank class
    Parameters:
    x, y - The tank's initial x and y position
    color - The tanks color, should be 0 for blue or 30 for green
    control - The tank's control scheme, needs a move() function that returns an string and a shoot() function that returns a boolean
    upBorder, downBorder, leftBorder, rightBorder - The maximum the tank can go up, down, left, and right
*/
function Tank(x: number, y: number, color: number, control: controlsType, upBorder: number, downBorder: number, leftBorder: number, rightBorder: number) {
    const newTank: tankObject = {
        x: x,
        y: y,
        offset: 0,
        color: color,
        cooldown: 0,
        lives: 5,
        bullets: [Bullet(), Bullet(), Bullet()], // Three bullets per tank is enough
        bulletCounter: 0,
        control: control,
        upBorder: upBorder,
        downBorder: downBorder,
        leftBorder: leftBorder,
        rightBorder: rightBorder,

        animate: function () {
            const control = this.control.move();
            let xVel = 0;
            let yVel = 0;

            // Determine movement direction and velocity
            switch (control) {
                // No Movement
                case 'Stationary':
                    break;

                // Moving Up
                case 'Up':
                    yVel = -7;
                    this.offset = 0;
                    break;

                // Moving Up Right
                case 'UpRight':
                    xVel = 5;
                    yVel = -5;
                    this.offset = 1;
                    break;

                // Moving Right
                case 'Right':
                    xVel = 7;
                    this.offset = 2;
                    break;

                // Moving Down Right
                case 'DownRight':
                    xVel = 5;
                    yVel = 5;
                    this.offset = 3;
                    break;

                // Moving Down
                case 'Down':
                    yVel = 7;
                    this.offset = 4;
                    break;

                // Moving Down Left
                case 'DownLeft':
                    xVel = -5;
                    yVel = 5;
                    this.offset = 5;
                    break;

                // Moving Left
                case 'Left':
                    xVel = -7;
                    this.offset = 6;
                    break;

                // Moving Up Left
                case 'UpLeft':
                    xVel = -5;
                    yVel = -5;
                    this.offset = 7;
                    break;
            }

            // Move the determined velocity unless reaching border or obstacle
            let xTemp = this.x + xVel;
            let yTemp = this.y + yVel;

            if (xTemp > this.rightBorder) {
                xTemp = this.rightBorder;
            } else if (xTemp < this.leftBorder) {
                xTemp = this.leftBorder;
            }
            if (yTemp > this.downBorder) {
                yTemp = this.downBorder;
            } else if (yTemp < this.upBorder) {
                yTemp = this.upBorder;
            }

            for (let i = 0; i < game.obstacle.length; i++) {
                if ((xTemp < game.obstacle[i].x + game.obstacle[i].size) && (yTemp < game.obstacle[i].y + game.obstacle[i].size) && (xTemp > game.obstacle[i].x - 60) && (yTemp > game.obstacle[i].y - 60)) {
                    if (xTemp + yTemp > game.obstacle[i].x + game.obstacle[i].y + game.obstacle[i].size - 60) {
                        if (xTemp - yTemp > game.obstacle[i].x - game.obstacle[i].y) {
                            xTemp = game.obstacle[i].x + game.obstacle[i].size;
                        } else if (xTemp - yTemp < game.obstacle[i].x - game.obstacle[i].y) {
                            yTemp = game.obstacle[i].y + game.obstacle[i].size;
                        } else {
                            xTemp = game.obstacle[i].x + game.obstacle[i].size;
                            yTemp = game.obstacle[i].y + game.obstacle[i].size;
                        }
                    } else if (xTemp + yTemp < game.obstacle[i].x + game.obstacle[i].y + game.obstacle[i].size - 60) {
                        if (xTemp - yTemp > game.obstacle[i].x - game.obstacle[i].y) {
                            yTemp = game.obstacle[i].y - 60;
                        } else if (xTemp - yTemp < game.obstacle[i].x - game.obstacle[i].y) {
                            xTemp = game.obstacle[i].x - 60;
                        } else {
                            xTemp = game.obstacle[i].x - 60;
                            yTemp = game.obstacle[i].y - 60;
                        }
                    } else {
                        if (xTemp - yTemp > game.obstacle[i].x - game.obstacle[i].y) {
                            xTemp = game.obstacle[i].x + game.obstacle[i].size;
                            yTemp = game.obstacle[i].y - 60;
                        } else if (xTemp - yTemp < game.obstacle[i].x - game.obstacle[i].y - game.obstacle[i].size + 60) {
                            xTemp = game.obstacle[i].x - 60;
                            yTemp = game.obstacle[i].y + game.obstacle[i].size;
                        }
                    }
                }
            }

            for (let i = 0; i < game.tanks.length; i++) {
                if (game.tanks[i] !== this) {
                    if ((xTemp < game.tanks[i].x + 60) && (yTemp < game.tanks[i].y + 60) && (xTemp > game.tanks[i].x - 60) && (yTemp > game.tanks[i].y - 60)) {
                        if (xTemp + yTemp > game.tanks[i].x + game.tanks[i].y) {
                            if (xTemp - yTemp > game.tanks[i].x - game.tanks[i].y) {
                                xTemp = game.tanks[i].x + 60;
                            } else if (xTemp - yTemp < game.tanks[i].x - game.tanks[i].y) {
                                yTemp = game.tanks[i].y + 60;
                            } else {
                                xTemp = game.tanks[i].x + 60;
                                yTemp = game.tanks[i].y + 60;
                            }
                        } else if (xTemp + yTemp < game.tanks[i].x + game.tanks[i].y) {
                            if (xTemp - yTemp > game.tanks[i].x - game.tanks[i].y) {
                                yTemp = game.tanks[i].y - 60;
                            } else if (xTemp - yTemp < game.tanks[i].x - game.tanks[i].y) {
                                xTemp = game.tanks[i].x - 60;
                            } else {
                                xTemp = game.tanks[i].x - 60;
                                yTemp = game.tanks[i].y - 60;
                            }
                        } else {
                            if (xTemp - yTemp > game.tanks[i].x - game.tanks[i].y) {
                                xTemp = game.tanks[i].x + 60;
                                yTemp = game.tanks[i].y - 60;
                            } else if (xTemp - yTemp < game.tanks[i].x - game.tanks[i].y) {
                                xTemp = game.tanks[i].x - 60;
                                yTemp = game.tanks[i].y + 60;
                            }
                        }
                    }
                    // After checking tank collision, check if the tank is hit by any bullets
                    for (let j = 0; j < 3; j++) {
                        if ((game.tanks[i].bullets[j].xPos > this.x) && (game.tanks[i].bullets[j].xPos < this.x + 60) && (game.tanks[i].bullets[j].yPos > this.y) && (game.tanks[i].bullets[j].yPos < this.y + 60)) {
                            game.tanks[i].bullets[j] = Bullet();
                            this.lives--;
                        }
                    }
                }
            }

            // After all collision checks, update the new tank position
            this.x = xTemp;
            this.y = yTemp;

            // Move all bullets shot from this tank
            for (let i = 0; i < 3; i++) {
                this.bullets[i].xPos += this.bullets[i].xVel;
                this.bullets[i].yPos += this.bullets[i].yVel;
                if ((this.bullets[i].xPos < -10) || (this.bullets[i].yPos < -10) || (this.bullets[i].xPos > 650) || (this.bullets[i].yPos > 490)) {
                    this.bullets[i] = Bullet();
                }
            }

            // Shoot if shooting and cooldown done
            if (this.cooldown === 0) {
                if (this.control.shoot()) {
                    this.cooldown = 20;
                    const newBullet: bulletType = {
                        xPos: this.x + 30,
                        yPos: this.y + 30,
                        xVel: 0,
                        yVel: 0
                    };
                    switch (this.offset) {
                        case 0:
                            newBullet.yVel = -14;
                            break;

                        case 1:
                            newBullet.xVel = 10;
                            newBullet.yVel = -10;
                            break;

                        case 2:
                            newBullet.xVel = 14;
                            break;

                        case 3:
                            newBullet.xVel = 10;
                            newBullet.yVel = 10;
                            break;

                        case 4:
                            newBullet.yVel = 14;
                            break;

                        case 5:
                            newBullet.xVel = -10;
                            newBullet.yVel = 10;
                            break;

                        case 6:
                            newBullet.xVel = -14;
                            break;

                        case 7:
                            newBullet.xVel = -10;
                            newBullet.yVel = -10;
                            break;
                    }
                    this.bullets[this.bulletCounter] = newBullet;
                    this.bulletCounter = (this.bulletCounter + 1) % 3;
                }
            } else {
                this.cooldown--;
            }
        },

        draw: function () {
            game.context.drawImage(game.tank, this.offset * 30, this.color, 30, 30, this.x, this.y, 60, 60);
            for (let i = 0; i < 3; i++) {
                game.context.beginPath();
                game.context.arc(this.bullets[i].xPos, this.bullets[i].yPos, 5, 0, 2 * Math.PI, true);
                game.context.fill();
            }
        }
    }

    return newTank;
}

function randomNum(min: number, max: number) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// Create obstacles of random sizes at random positions.
function createObstacles() {
    const numObstacle = randomNum(6, 12);
    const obstacle = [];

    for (let i = 0; i < numObstacle; i++) {
        const size = randomNum(10, 30) * 2;
        const obby: obstacleType = {
            size,
            x: randomNum(100, 540) - Math.floor(size / 2),
            y: randomNum(0, 480) - Math.floor(size / 2)
        };
        obstacle.push(obby);
    }

    return obstacle;
}

const game: gameType = {
    startable: false,
    restartable: false,
    showControls: false,
    loaded: 0,
    canvas: null as any as HTMLCanvasElement,
    context: null as any as CanvasRenderingContext2D,
    playerOneWinScreen: null as any as HTMLImageElement,
    playerTwoWinScreen: null as any as HTMLImageElement,
    controlWindow: null as any as HTMLImageElement,
    tank: null as any as HTMLImageElement,

    wKey: false,
    aKey: false,
    sKey: false,
    dKey: false,
    eKey: false,
    leftKey: false,
    upKey: false,
    rightKey: false,
    downKey: false,
    dotKey: false,
    oneKey: false,
    twoKey: false,
    rKey: false,
    cKey: false,


    animationTimeout: 0,
    ended: false,
    animationInterval: null as any as NodeJS.Timeout,
    animationFrame: 0,
    playerOneWin: false,
    playerTwoWin: false,
    controlToggle: false,

    tanks: [],
    obstacle: [],

    init: function (ref) {
        if (ref.current === null) {
            console.log("ERROR: ref.current is null")
            return;
        }
        const context = ref.current.getContext('2d');
        if (context === null) {
            console.log("ERROR: context is null is null")
            return;
        }

        game.startable = false;
        game.restartable = false;
        game.showControls = false;
        game.loaded = 0;
        game.canvas = ref.current;
        game.context = context;
        game.playerOneWinScreen = new Image();
        game.playerOneWinScreen.onload = game.load;
        game.playerOneWinScreen.src = "PlayerOneWin.png";
        game.playerTwoWinScreen = new Image();
        game.playerTwoWinScreen.onload = game.load;
        game.playerTwoWinScreen.src = "PlayerTwoWin.png";
        game.controlWindow = new Image();
        game.controlWindow.onload = game.load;
        game.controlWindow.src = "Controls.png";
        game.tank = new Image();
        game.tank.onload = game.load;
        game.tank.src = "heavy-tank.png";
    },

    load: function () {
        game.loaded++;
        if (game.loaded === 4) {
            game.ready();
        }
    },

    ready: function () {
        game.obstacle = createObstacles();
        const playerTank = Tank(0, 0, 0, nullControls, 0, 420, 0, 580);
        const aiTank = Tank(580, 420, 30, nullControls, 0, 420, 0, 580);
        game.tanks = [playerTank, aiTank];

        game.animationTimeout = 100;
        game.ended = false;
        game.animationLoop();
        game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);
        game.animationFrame = window.requestAnimationFrame(game.animate);

        game.playerOneWin = false;
        game.playerTwoWin = false;
        game.showControls = true;
        game.startable = true;
        game.restartable = true;
    },

    restart: function () {
        game.obstacle = createObstacles();
        const playerTank = Tank(0, 0, 0, nullControls, 0, 420, 0, 580);
        const aiTank = Tank(580, 420, 30, nullControls, 0, 420, 0, 580);
        game.tanks = [playerTank, aiTank];

        game.playerOneWin = false;
        game.playerTwoWin = false;
        game.startable = true;
    },

    startPlayer: function () {
        game.restartable = false;
        game.showControls = false;
        game.tanks[0].control = wasdeControls;
        game.tanks[1].control = arrowControls;
    },

    startAi: function () {
        game.restartable = false;
        game.showControls = false;
        game.tanks[0].control = wasdeControls;
        game.tanks[1].control = aiControls;
    },

    end: function () {
        for (let i = 0; i < game.tanks.length; i++) {
            game.tanks[i].control = nullControls;
            game.tanks[i].lives = -1;
        }
        game.restartable = true;
    },

    animationLoop: function () {
        for (let i = 0; i < game.tanks.length; i++) {
            game.tanks[i].animate();
        }

        if (game.startable && game.oneKey) {
            game.startable = false;
            game.startAi();
        }
        if (game.startable && game.twoKey) {
            game.startable = false;
            game.startPlayer();
        }
        if (game.restartable && game.rKey) {
            game.restartable = false;
            game.restart();
        } else if (game.startable && !game.rKey) {
            game.restartable = true;
        }

        if (game.tanks[0].lives === 0) {
            game.playerTwoWin = true;
            game.end();
        } else if (game.tanks[1].lives === 0) {
            game.playerOneWin = true;
            game.end();
        }

        if (game.cKey && game.controlToggle) {
            game.controlToggle = false;
            if (game.showControls) {
                game.showControls = false;
            } else if (game.startable) {
                game.showControls = true;
            }
        } else if (!game.cKey) {
            game.controlToggle = true;
        }
    },

    animate: function () {
        game.canvas.width = game.canvas.width;

        for (let i = 0; i < game.tanks.length; i++) {
            game.tanks[i].draw();
        }

        for (let i = 0; i < game.obstacle.length; i++) {
            game.context.fillRect(game.obstacle[i].x, game.obstacle[i].y, game.obstacle[i].size, game.obstacle[i].size);
        }

        if (game.showControls) {
            game.context.drawImage(game.controlWindow, 0, 0, 480, 480, 80, 0, 480, 480);
        } else if (game.playerOneWin) {
            game.context.drawImage(game.playerOneWinScreen, 0, 0, 300, 120, 170, 180, 300, 120);
        } else if (game.playerTwoWin) {
            game.context.drawImage(game.playerTwoWinScreen, 0, 0, 300, 120, 170, 180, 300, 120);
        }

        if (!game.ended) {
            game.animationFrame = window.requestAnimationFrame(game.animate);
        }
    }
}

class TankWars extends React.Component {
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: {}) {
        super(props);

        this.state = {

        }

        this.keyDownEvent = this.keyDownEvent.bind(this);
        this.keyUpEvent = this.keyUpEvent.bind(this);

        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyDownEvent);
        window.addEventListener("keyup", this.keyUpEvent);

        game.init(this.canvasRef);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyDownEvent);
        window.removeEventListener("keyup", this.keyUpEvent);
    }

    keyDownEvent(e: KeyboardEvent) {
        if (e.which === 87) {
            game.wKey = true;
        }
        if (e.which === 65) {
            game.aKey = true;
        }
        if (e.which === 83) {
            game.sKey = true;
        }
        if (e.which === 68) {
            game.dKey = true;
        }
        if (e.which === 69) {
            game.eKey = true;
        }
        if (e.which === 37) {
            game.leftKey = true;
        }
        if (e.which === 38) {
            game.upKey = true;
        }
        if (e.which === 39) {
            game.rightKey = true;
        }
        if (e.which === 40) {
            game.downKey = true;
        }
        if (e.which === 190) {
            game.dotKey = true;
        }
        if (e.which === 49) {
            game.oneKey = true;
        }
        if (e.which === 50) {
            game.twoKey = true;
        }
        if (e.which === 82) {
            game.rKey = true;
        }
        if (e.which === 67) {
            game.cKey = true;
        }
    }

    keyUpEvent(e: KeyboardEvent) {
        if (e.which === 87) {
            game.wKey = false;
        }
        if (e.which === 65) {
            game.aKey = false;
        }
        if (e.which === 83) {
            game.sKey = false;
        }
        if (e.which === 68) {
            game.dKey = false;
        }
        if (e.which === 69) {
            game.eKey = false;
        }
        if (e.which === 37) {
            game.leftKey = false;
        }
        if (e.which === 38) {
            game.upKey = false;
        }
        if (e.which === 39) {
            game.rightKey = false;
        }
        if (e.which === 40) {
            game.downKey = false;
        }
        if (e.which === 190) {
            game.dotKey = false;
        }
        if (e.which === 49) {
            game.oneKey = false;
        }
        if (e.which === 50) {
            game.twoKey = false;
        }
        if (e.which === 82) {
            game.rKey = false;
        }
        if (e.which === 67) {
            game.cKey = false;
        }
    }
    render() {
        return (
            <canvas width="640" height="480" ref={this.canvasRef} style={{ border: "1px solid black" }}>
                Your browser does not support the HTML5 Canvas tag. Please shift to a newer browser
            </canvas>
        );
    }
}

export default TankWars;
