var stringer;
var alertme = function () {
    //alert(parseInt(FL.value) + parseInt(CR.value) );
    //alert("help");
    alert (parseInt(FL.value) + 2);
    if (parseInt(FL.value) >= dataTable.meanGA[1]){
        stringer = "Your foot length is bigger than"; 
        //+ String(dataTable.meanGA[1]);
    }
    else {stringer = "smaller than"}
    alert(stringer);
}

var form1 = document.getElementById("form1");

//function whenLoaded() {   

    //
    
    //submit.addEventListener("click", alert("here"), false);   
  //  }   

//document.addEventListener("DOMContentLoaded", whenLoaded(), false);
var submit = document.getElementById("submit");
submit.onclick = alert("here works");

//var flinput = document.getElementById("flInput");
//var crinput = document.getElementById("crInput");
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



var dataTable = {
meanGA: [12,   9,    7.4,    9.8,	7.1,	N,	N,	29.6,	4.8,	4.8,	4.8,	1.5,	1.4,	1.3,	0.6,	0.9,	0.9,	0.1,	0.1,	0.1,	0.03,	N,	N,	0.01,	N,	N,	0.25,	0.19,	0.19,	0.04,	0.11,	0.11],

stdGA: [3,	1.1,	1.7,	1.1,	N,	N,	14.9,	1.4,	1.4,	1.4,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	0.14,	0.14,	0.14,	0.06,	N,	N,	0.02,	N,	N,	0.15,	0.15,	0.15,	0.18,	0.18,	0.18]
}





