var temperature = document.getElementById("Temperature")
var roomList = document.getElementById("RoomName")

function getTemperatureStatus(){
    var roomName =roomList.value
    var url = window.location.href.replace(/\/$/, "") + "/Thermometar/"+roomName;
    $.ajax({
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        url: url,
        data: "{}",
        success: function(data) {
            temperature.innerHTML = data.Temperature
        },
    });
}

function getAirCondtionerSetatus(){
    var roomName =roomList.value
    var url = window.location.href.replace(/\/$/, "") + "/Airconditioner/"+roomName;
    $.ajax({
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        url: url,
        data: "{}",
        success: function(data) {
            var powerOn = document.getElementById("AirConditionerPowerOn");
            var heatingMode = document.getElementById("AirConditionerHeatingMode");
            var power = document.getElementById("AirConditionerPower");
            powerOn.innerHTML = "Power On: " + data.powerOn
            heatingMode.innerHTML = "Heating mode: " + data.HeatingMode;
            power.innerHTML = "Power: "+data.Power; 
        },
    });
}

function setAirCondtionerStatus(){
    var roomName =roomList.value
    var url = window.location.href.replace(/\/$/, "") + "/SetAirconditioner/"+roomName;
    var powerOn = document.getElementById("PowerOn").checked
    var heatingOn = document.getElementById("HeatingMode").checked
    var power = parseInt(document.getElementById("Power").value)
    var autoTemperature = document.getElementById("AutoTemp").checked
    var desiredtemp = document.getElementById("DesiredTemp").value
    if(isNaN(power)){
        power = 0
    }
    if (isNaN(desiredtemp)){
        desiredtemp = 0
    }
    $.ajax({
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        url: url,
        data: JSON.stringify({
            PowerOn: powerOn,
            heatingOn: heatingOn,
            Power: power,
            AutoTemperature: autoTemperature,
            DesiredTemp: desiredtemp,
        }),
        success: function(res) {
            getAirCondtionerSetatus();
        },
    });
}

function getRooms(){
    var roomName = roomList.value
    var url = window.location.href.replace(/\/$/, "") + "/GetRooms";
    $.ajax({
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        url: url,
        data: "{}",
        success: function(resp) {
            roomList.innerHTML =""
            if(resp!=null){
                for (index = 0; index < resp.length; index++){
                    roomList.innerHTML += "<option value=\""+resp[index]+"\">"+resp[index]+"</option>"
                }
            }
            
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function refreshPreview(){
    getTemperatureStatus();
    getAirCondtionerSetatus();
}

roomList.onchange = refreshPreview;
getRooms();
refreshPreview();