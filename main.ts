IR.IR_callbackUser(function (message) {
    Lastmessage = message
})
let Button2 = 0
let Lastmessage = 0
let Busy = 0
Lastmessage = 0
let Action = "."
let State = 0
led.unplot(0, 0)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
loops.everyInterval(100, function () {
    if (Action == "On") {
        State = 1
    } else if (Action == "Off") {
        State = 0
    }
    if (true) {
    	
    }
})
loops.everyInterval(100, function () {
    if (State == 1) {
        led.plot(0, 0)
        strip.showRainbow(1, 360)
    } else {
        led.unplot(0, 0)
        strip.clear()
        strip.show()
    }
})
loops.everyInterval(100, function () {
    if (Busy == 0 && Lastmessage != 0) {
        Busy = 1
        led.plot(4, 0)
        music.playTone(262, music.beat(BeatFraction.Whole))
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
    } else {
        led.unplot(4, 0)
    }
})
