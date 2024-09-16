let currentBuffer = 0
serial.redirectToUSB()
let analogBufferIndex = 0
let analog_variable = 0
let analogBuffer0 = pins.createBuffer(128* 2);
let analogBuffer1 = pins.createBuffer(128 * 2);
basic.forever(function () {
    if (currentBuffer == 0) {
        currentBuffer = 1
        analogBufferIndex = 0
        serial.writeBuffer(analogBuffer0)
    } else {
        currentBuffer = 0
        analogBufferIndex = 0
        serial.writeBuffer(analogBuffer1)
    }
})
control.inBackground(function () {
    while (true) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        if (currentBuffer == 0) {
            analogBuffer0.setNumber(NumberFormat.UInt16LE, analogBufferIndex, pins.analogReadPin(AnalogPin.P0))
        } else {
            analogBuffer1.setNumber(NumberFormat.UInt16LE, analogBufferIndex, pins.analogReadPin(AnalogPin.P0))
        }
        analogBufferIndex += 1
        if (analogBufferIndex >= 128) {
            analogBufferIndex = 0
        }
        pins.digitalWritePin(DigitalPin.P1, 0)
        control.waitMicros(1000)
    }
})
