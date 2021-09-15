export const timestampconvert=(timestamp)=>{
var date = new Date(timestamp * 1000);
var resultdate =  date.toLocaleDateString("en-US");
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var ampm = hours <= 12? "am":"pm";
var formattedTime = resultdate+" "+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)+" "+ampm ;
return formattedTime
}
