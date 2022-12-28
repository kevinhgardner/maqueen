function doMoveLeft (direction: number) {
    if (direction == 1) {
        if (motorStateLeft != 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            motorStateLeft = 1
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        }
    } else if (direction == -1) {
        if (motorStateLeft != -1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
            motorStateLeft = -1
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        }
    } else if (direction == 0) {
        if (motorStateLeft != 0) {
            maqueen.motorStop(maqueen.Motors.M1)
            motorStateLeft = 0
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        }
    }
}
function doOff () {
    if (State != 0) {
        State = 0
        led.unplot(2, 2)
        strip.clear()
        strip.show()
    }
}
input.onButtonPressed(Button.A, function () {
    doOn()
})
IR.IR_callbackUser(function (message) {
    Lastmessage = message
})
function doD () {
    if (State == 1) {
        doMove(-1, -1)
    }
}
function doHandleMessage () {
    if (Busy == 0 && Lastmessage != 0) {
        Busy = 1
        led.plot(4, 0)
        if (Lastmessage == 64) {
            Action = "A"
        } else if (Lastmessage == 9) {
            Action = "C"
        } else if (Lastmessage == 7) {
            Action = "B"
        } else if (Lastmessage == 25) {
            Action = "D"
        } else if (Lastmessage == 69) {
            Action = "On"
        } else if (Lastmessage == 71) {
            Action = "Off"
        } else if (Lastmessage == 12) {
            Action = "Bu"
        } else if (Lastmessage == 94) {
            Action = "Bd"
        }
        Button2 = 0
        Busy = 0
        Lastmessage = 0
    }
}
function doB () {
    if (State == 1) {
        doMove(0, 1)
    }
}
function doMove (left: number, right: number) {
    doMoveLeft(left)
    doMoveRight(right)
}
function doOn () {
    if (State != 1) {
        State = 1
        led.plot(2, 2)
        strip.showRainbow(1, 360)
    }
}
function doBd () {
	
}
input.onButtonPressed(Button.B, function () {
    doOff()
})
function doMoveRight (direction: number) {
    if (direction == 1) {
        if (motorStateRight != 1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
            motorStateRight = 1
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        }
    } else if (direction == -1) {
        if (motorStateRight != -1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
            motorStateRight = -1
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        }
    } else if (direction == 0) {
        if (motorStateRight != 0) {
            maqueen.motorStop(maqueen.Motors.M2)
            motorStateRight = 0
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        }
    }
}
function doA () {
    if (State == 1) {
        if (distance > alertdistance && distance != 0) {
            doMove(1, 1)
        }
    }
}
function doBu () {
	
}
function doC () {
    if (State == 1) {
        doMove(1, 0)
    }
}
let distance = 0
let Button2 = 0
let alertdistance = 0
let motorStateRight = 0
let motorStateLeft = 0
let State = 0
let Action = ""
let Lastmessage = 0
let Busy = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
strip.clear()
strip.show()
Busy = 0
Lastmessage = 0
Action = "."
State = 0
motorStateLeft = 0
motorStateRight = 0
alertdistance = 10
maqueen.motorStop(maqueen.Motors.All)
led.unplot(2, 2)
basic.forever(function () {
    doHandleMessage()
})
loops.everyInterval(100, function () {
    if (Action != ".") {
        strip.rotate(1)
        strip.show()
        if (Action == "On") {
            doOn()
        } else if (Action == "Off") {
            doOff()
        } else if (Action == "A") {
            doA()
        } else if (Action == "B") {
            doB()
        } else if (Action == "C") {
            doC()
        } else if (Action == "D") {
            doD()
        } else if (Action == "Bu") {
            doBu()
        } else if (Action == "Bd") {
            doBd()
        }
        Action = "."
        led.unplot(4, 0)
    } else {
        doMove(0, 0)
    }
})
loops.everyInterval(100, function () {
    distance = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (distance <= alertdistance && distance != 0) {
        if (motorStateLeft == 1) {
            doMoveLeft(0)
        }
        if (motorStateRight == 1) {
            doMoveRight(0)
        }
    }
})
