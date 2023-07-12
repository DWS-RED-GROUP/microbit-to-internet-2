function log_it_all () {
    datalogger.log(
    datalogger.createCV("Raw", rawData),
    datalogger.createCV("Soil", randint(5, 15)),
    datalogger.createCV("rain", parseFloat(rain)),
    datalogger.createCV("temp", parseFloat(temp)),
    datalogger.createCV("humidity", parseFloat(humidity)),
    datalogger.createCV("windS", parseFloat(windSpeed)),
    datalogger.createCV("windD", parseFloat(windDirection)),
    datalogger.createCV("airP", parseFloat(airPressure))
    )
}
radio.onReceivedString(function (receivedString) {
    rawData = receivedString
    windDirection = rawData.substr(7, 3)
    windSpeed = rawData.substr(11, 4)
    temp = rawData.substr(57, 3)
    humidity = rawData.substr(61, 2)
    airPressure = rawData.substr(65, 5)
    rain = rawData.substr(31, 4)
})
let airPressure = ""
let windDirection = ""
let windSpeed = ""
let humidity = ""
let temp = ""
let rain = ""
let rawData = ""
basic.showIcon(IconNames.Heart)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("DHM_TG", "dhm8422546")
basic.showIcon(IconNames.Yes)
ESP8266_IoT.connectThingSpeak()
basic.showIcon(IconNames.Happy)
radio.setGroup(142)
datalogger.setColumnTitles(
"Raw",
"Soil",
"rain",
"temp",
"humidity",
"windS",
"windD",
"airP"
)
loops.everyInterval(60000, function () {
    ESP8266_IoT.connectThingSpeak()
    if (ESP8266_IoT.wifiState(true)) {
        ESP8266_IoT.setData(
        "V14SZBBV5O8RCRS7",
        randint(5, 15),
        parseFloat(rain),
        parseFloat(temp),
        parseFloat(humidity),
        parseFloat(windSpeed),
        parseFloat(windDirection),
        parseFloat(airPressure)
        )
        ESP8266_IoT.uploadData()
        log_it_all()
    }
})
basic.forever(function () {
	
})
