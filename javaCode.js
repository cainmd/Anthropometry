var stringer;
var alertme = function () {
    
    alert (parseInt(FL.value) + 2);
    if (parseInt(FL.value) >= dataTable.meanGA[1]){
        stringer = "Your foot length is bigger than"; 
     
    }
    else {stringer = "smaller than"}
    alert(stringer);
}

var form1 = document.getElementById("form1");


var submit = document.getElementById("submit");


var FL = document.getElementById("FL");
var CR = document.getElementById("CR");
var CH = document.getElementById("CH");
var HC = document.getElementById("HC");
var CC = document.getElementById("CC");
var AC = document.getElementById("AC");
var bodyWeight = document.getElementById("BodyWeight");
var BW = document.getElementById("BW");
var LVW = document.getElementById("LVW");
var LUW = document.getElementById("LUW");
var HW = document.getElementById("HW");
var TW = document.getElementById("TW");
var SW = document.getElementById("SW");
var KW = document.getElementById("KE");
var AW = document.getElementById("AW");






submit.onclick = alert("Here");


