namespace StateKind {
    export const idle = StateKind.create()
    export const off = StateKind.create()
    export const forward = StateKind.create()
    export const backwards = StateKind.create()
    export const left = StateKind.create()
    export const right = StateKind.create()
    export const leftforward = StateKind.create()
    export const rightforward = StateKind.create()
    export const leftbackwards = StateKind.create()
    export const rightbackwards = StateKind.create()
}
RadioGameController.onButtonPress(RadioGameController.ButtonPins.ButtonA, RadioGameController.ButtonEvents.Down, function () {
    if (StateMachine.getState() == StateKind.off) {
        StateMachine.setState(StateKind.idle)
    } else {
        StateMachine.setState(StateKind.off)
    }
})
StateMachine.onStateInit(StateKind.rightbackwards, function (oldState) {
    doMotor(-1, 0)
    doBottomLeds2()
})
RadioGameController.onButtonPress(RadioGameController.ButtonPins.Fire2, RadioGameController.ButtonEvents.Down, function () {
    doBlue()
    StateMachine.setState(StateMachine.getState(), true)
})
StateMachine.onStateInit(StateKind.right, function (oldState) {
    doMotor(1, -1)
    doBottomLeds2()
})
function doMotorLeft (num: number) {
    if (motoron) {
        if (num == 0) {
            maqueen.motorStop(maqueen.Motors.M1)
        } else if (num == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
        } else if (num == -1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, speed)
        }
    }
}
function doInit () {
    maqueen.motorStop(maqueen.Motors.All)
    bottomLeds = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    RadioGameController.enable(123, RadioGameController.Mode.SLAVE)
    motoron = true
    StateMachine.setState(StateKind.off)
}
StateMachine.onStateInit(StateKind.forward, function (oldState) {
    doMotor(1, 1)
    doBottomLeds2()
})
function doBottomLeds (color: number) {
    bottomLeds.showColor(color)
}
RadioGameController.onButtonPress(RadioGameController.ButtonPins.Fire1, RadioGameController.ButtonEvents.Down, function () {
    doRed()
    StateMachine.setState(StateMachine.getState(), true)
})
function doMotor (left: number, right: number) {
    doMotorLeft(left)
    doMotorRight(right)
}
function doGreen () {
    speed = 150
    speedcolor = neopixel.colors(NeoPixelColors.Green)
    doBottomLeds2()
}
RadioGameController.onButtonPress(RadioGameController.ButtonPins.Fire2, RadioGameController.ButtonEvents.Up, function () {
    doGreen()
    StateMachine.setState(StateMachine.getState(), true)
})
StateMachine.onStateInit(StateKind.idle, function (oldState) {
    if (oldState == StateKind.off) {
        doGreen()
    }
    doMotor(0, 0)
    doBottomLeds2()
})
StateMachine.onStateInit(StateKind.leftforward, function (oldState) {
    doMotor(0, 1)
    doBottomLeds2()
})
function doMotorRight (num: number) {
    if (motoron) {
        if (num == 0) {
            maqueen.motorStop(maqueen.Motors.M2)
        } else if (num == 1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
        } else if (num == -1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, speed)
        }
    }
}
StateMachine.onStateInit(StateKind.rightforward, function (oldState) {
    doMotor(1, 0)
    doBottomLeds2()
})
StateMachine.onStateInit(StateKind.off, function (oldState) {
    doMotor(0, 0)
    doBottomLeds(neopixel.colors(NeoPixelColors.Black))
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
})
StateMachine.onStateInit(StateKind.left, function (oldState) {
    doMotor(-1, 1)
    doBottomLeds2()
})
function doBottomLeds2 () {
    bottomLeds.showColor(speedcolor)
}
StateMachine.onStateInit(StateKind.backwards, function (oldState) {
    doMotor(-1, -1)
    doBottomLeds2()
})
function doRed () {
    speed = 255
    speedcolor = neopixel.colors(NeoPixelColors.Red)
    doBottomLeds2()
}
function doBlue () {
    speed = 50
    speedcolor = neopixel.colors(NeoPixelColors.Blue)
    doBottomLeds2()
}
RadioGameController.onButtonPress(RadioGameController.ButtonPins.Fire1, RadioGameController.ButtonEvents.Up, function () {
    doGreen()
    StateMachine.setState(StateMachine.getState(), true)
})
StateMachine.onStateInit(StateKind.leftbackwards, function (oldState) {
    doMotor(0, -1)
    doBottomLeds2()
})
function doUpdateState () {
    if (StateMachine.getState() != StateKind.off) {
        if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Up)) {
            if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Left)) {
                StateMachine.setState(StateKind.leftforward)
            } else if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Right)) {
                StateMachine.setState(StateKind.rightforward)
            } else {
                StateMachine.setState(StateKind.forward)
            }
        } else if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Down)) {
            if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Left)) {
                StateMachine.setState(StateKind.leftbackwards)
            } else if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Right)) {
                StateMachine.setState(StateKind.rightbackwards)
            } else {
                StateMachine.setState(StateKind.backwards)
            }
        } else if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Left)) {
            StateMachine.setState(StateKind.left)
        } else if (RadioGameController.buttonIsPressed(RadioGameController.ButtonPins.Right)) {
            StateMachine.setState(StateKind.right)
        } else {
            StateMachine.setState(StateKind.idle)
        }
    }
}
let speedcolor = 0
let bottomLeds: neopixel.Strip = null
let speed = 0
let motoron = false
doInit()
loops.everyInterval(100, function () {
    doUpdateState()
})
