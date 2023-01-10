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
    doBottomLeds2(false, false, false, true)
})
StateMachine.onStateInit(StateKind.right, function (oldState) {
    doMotor(1, -1)
    doBottomLeds2(false, true, false, true)
})
function doMotorLeft (num: number) {
    if (motoron) {
        if (num == 0) {
            maqueen.motorStop(maqueen.Motors.M1)
        } else if (num == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        } else if (num == -1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        }
    }
}
function doInit () {
    maqueen.motorStop(maqueen.Motors.All)
    bottomLeds = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    StateMachine.setState(StateKind.off)
    RadioGameController.enable(123, RadioGameController.Mode.SLAVE)
    motoron = false
}
StateMachine.onStateInit(StateKind.forward, function (oldState) {
    doMotor(1, 1)
    doBottomLeds2(true, true, false, false)
})
function doBottomLeds (color: number) {
    bottomLeds.showColor(color)
}
maqueen.ltEvent(maqueen.Patrol1.PatrolRight, maqueen.Voltage.Low, function () {
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
})
maqueen.ltEvent(maqueen.Patrol1.PatrolRight, maqueen.Voltage.High, function () {
    if (!(StateMachine.isStateCurrent(StateKind.off))) {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    }
})
function doMotor (left: number, right: number) {
    doMotorLeft(left)
    doMotorRight(right)
}
StateMachine.onStateInit(StateKind.idle, function (oldState) {
    doBottomLeds(neopixel.colors(NeoPixelColors.Green))
    doMotor(0, 0)
})
StateMachine.onStateInit(StateKind.leftforward, function (oldState) {
    doMotor(0, 1)
    doBottomLeds2(true, false, false, false)
})
maqueen.ltEvent(maqueen.Patrol1.PatrolLeft, maqueen.Voltage.High, function () {
    if (!(StateMachine.isStateCurrent(StateKind.off))) {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    }
})
function doMotorRight (num: number) {
    if (motoron) {
        if (num == 0) {
            maqueen.motorStop(maqueen.Motors.M2)
        } else if (num == 1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        } else if (num == -1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        }
    }
}
StateMachine.onStateInit(StateKind.rightforward, function (oldState) {
    doMotor(1, 0)
    doBottomLeds2(false, true, false, false)
})
function doUpdateLeds () {
	
}
maqueen.ltEvent(maqueen.Patrol1.PatrolLeft, maqueen.Voltage.Low, function () {
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
})
StateMachine.onStateInit(StateKind.off, function (oldState) {
    doBottomLeds(neopixel.colors(NeoPixelColors.Black))
    doMotor(0, 0)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
})
StateMachine.onStateInit(StateKind.left, function (oldState) {
    doMotor(-1, 1)
    doBottomLeds2(true, false, true, false)
})
function doBottomLeds2 (leftfront: boolean, rightfront: boolean, leftback: boolean, rightback: boolean) {
    for (let index = 0; index <= 3; index++) {
        bottomLeds.setPixelColor(index, neopixel.colors(NeoPixelColors.Black))
    }
    if (leftfront) {
        bottomLeds.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    }
    if (rightfront) {
        bottomLeds.setPixelColor(3, neopixel.colors(NeoPixelColors.Red))
    }
    if (leftback) {
        bottomLeds.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
    }
    if (rightback) {
        bottomLeds.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
    }
    bottomLeds.show()
}
StateMachine.onStateInit(StateKind.backwards, function (oldState) {
    doMotor(-1, -1)
    doBottomLeds2(false, false, true, true)
})
StateMachine.onStateInit(StateKind.leftbackwards, function (oldState) {
    doMotor(0, -1)
    doBottomLeds2(false, false, true, false)
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
let bottomLeds: neopixel.Strip = null
let motoron = false
doInit()
loops.everyInterval(100, function () {
    doUpdateState()
})
