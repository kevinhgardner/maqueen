function doOff () {
    if (State != 0) {
        State = 0
        led.unplot(0, 0)
        strip.clear()
        strip.show()
    }
}
IR.IR_callbackUser(function (message) {
    Lastmessage = message
})
function doD () {
    if (State == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
    }
}
function doB () {
    if (State == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    }
}
function doOn () {
    if (State != 1) {
        State = 1
        led.plot(0, 0)
        strip.showRainbow(1, 360)
    }
}
function doA () {
    if (State == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    }
}
function doC () {
    if (State == 1) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
    }
}
let Button2 = 0
let strip: neopixel.Strip = null
let State = 0
let Lastmessage = 0
let Busy = 0
Lastmessage = 0
let Action = "."
State = 0
led.unplot(0, 0)
strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
strip.clear()
strip.show()
loops.everyInterval(100, function () {
    if (Action != ".") {
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
        }
        Action = "."
        led.unplot(4, 0)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
loops.everyInterval(100, function () {
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
})
