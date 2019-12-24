
var cityName="";

var num=1;
$("#searchButton").on("click", function(){
  event.preventDefault();
    cityName=$("#inputBox").val();
    
  // setDataToStorage("value_"+num, cityName);
   num++;
   var input =$("<li>");
   input.text(cityName);
   console.log(input.text());

input.attr("class","list-group-item");
   $("ul").append(input);
   setTemperature();
})



function setTemperature(){
var d = new Date();
var currentDate=d.toString();
console.log(currentDate);
var currentTime=currentDate.slice(15,25);
currentDate=currentDate.slice(0,3)+", "+currentDate.slice(4,10);
var cityAndDate=document.querySelector("#cityDate");
var temperature=document.querySelector("#temperature");
var humidity=document.querySelector("#humidity");
var windSpeed=document.querySelector("#wind-speed");
var uvIndex=document.querySelector("#uv-index");


//$("#city&date").text(response.name);

//var queryUrl="https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";

// “https://api.openweathermap.org/data/2.5/uvi?appid=7b0bd5c0c62495154f103ff6cbf437d6&lat=”+position.coords.latitude+“&lon=“+position.coords.longitude;
//var queryUrl5Days="https://api.openweathermap.org/data/2.5/forecast?cnt=5&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6&lat="+position.coords.latitude+"&lon="+position.coords.longitude;
var queryUrlCity1Day="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";
//var queryUrlUV="https://api.openweathermap.org/data/2.5/uvi?appid=7b0bd5c0c62495154f103ff6cbf437d6&lat="+response.coord.lat+"&lon="+response.coord.lon;
var queryUrlCity5Days="https://api.openweathermap.org/data/2.5/forecast?cnt=5&q="+cityName+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";

$.ajax({
  url: queryUrlCity1Day,
  method: "GET"
}).then(function(response) {
  cityAndDate.innerHTML=response.name+" ("+currentDate+currentTime+")";
  temperature.innerHTML="Temperature: "+response.main.temp+" F"
  humidity.innerHTML="Humidity: "+response.main.humidity+"%";
  windSpeed.innerHTML="Wind speed: "+response.wind.speed+" MPH";
  //uvIndex.innerHTML="UV Index: "+response.
  console.log(response);

})
}

