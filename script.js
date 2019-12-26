
var d;

for(var i=0; i<localStorage.length; i++){
  var key=localStorage.key(i);
  var value=localStorage.getItem(key);
  if(value=="weather"){
  var input2 =$("<li>");
  input2.attr("class","list-group-item");
   $("ul").append(input2);
   input2.html(key);
}
}

$(".list-group-item").on("click",function(){
  $("#error").hide();
  $("#inputBox").val("");
   setTemperature(this.innerHTML);
})
$("#inputBox").on("click",function(){
  $("#inputBox").val("");
  $("#error").hide();
})

$("#searchButton").on("click", function(){
  var cityName="";
  event.preventDefault();
    cityName=$("#inputBox").val();
    
   setTemperature(cityName);
})


function setDataToStorage(key,value){
localStorage.setItem(key,value);
}

function setTemperature(cityName){
d = new Date();
currentDate=d.toLocaleDateString();

var currentName="";
var cityAndDate=document.querySelector("#cityDate");
var temperature=document.querySelector("#temperature");
var humidity=document.querySelector("#humidity");
var windSpeed=document.querySelector("#wind-speed");
var uvIndex=document.querySelector("#uv-index");
var weatherIcon=document.querySelector("#icon");

var queryUrlCity1Day="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";

var queryUrlCity5Days="https://api.openweathermap.org/data/2.5/forecast?cnt=5&q="+cityName+"&units=imperial&appid=7b0bd5c0c62495154f103ff6cbf437d6";

$.ajax({
  url: queryUrlCity1Day,
  method: "GET"
}).then(function(response) {
 currentName=response.name;
 cityAndDate.innerHTML=currentName+","+response.sys.country+" ("+currentDate+")";
  temperature.innerHTML="Temperature: "+response.main.temp+" °F"
  humidity.innerHTML="Humidity: "+response.main.humidity+"%";
  windSpeed.innerHTML="Wind speed: "+response.wind.speed+" MPH";
  var iconCode=response.weather[0].icon;
  weatherIcon.src="http://openweathermap.org/img/w/"+iconCode+".png";
  var queryUrlUV="https://api.openweathermap.org/data/2.5/uvi?appid=7b0bd5c0c62495154f103ff6cbf437d6&lat="+response.coord.lat+"&lon="+response.coord.lon;
  $.ajax({
    url:queryUrlUV,
    method:"GET"
  }).then(function(response){
   uvIndex.innerHTML="UV Index: "+response.value;

   if(localStorage.getItem(cityName)==null){
   var input =$("<li>");
   input.text(cityName);
    input.attr("class","list-group-item");
   $("ul").append(input);
   }
   setDataToStorage(cityName,"weather"); 
  })
}).fail(function(){
  $("#error").show();
  $("#error").css("color","red").html("The search is not a valid city name");
})

$.ajax({
  url:queryUrlCity5Days,
  method:"GET"
}).then(function(response){
 for(var i=0; i<5; i++){
 iconCode=response.list[i].weather[0].icon;
 d.setDate(d.getDate()+1);
 $(".date"+i).text(d.toLocaleDateString());
 $(".icon"+i).attr("src","http://openweathermap.org/img/w/"+iconCode+".png")
 $(".temp"+i).text("Temp: "+response.list[i].main.temp+" °F");
 $(".humidity"+i).text("Humidity: "+response.list[i].main.humidity+"%")
 }
})
 
}

