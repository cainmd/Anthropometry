var stringer;
var alertme = function () {
    if (parseInt(flinput.value >= dataTable.meanGA[1])){
        stringer = "Your foot length is bigger than" + String(dataTable.meanGA[1]);
    }
    else {stringer = "smaller than"}
    alert(stringer);
    //alert(parseInt(flinput.value) + parseInt(crinput.value) );
}


var confirm = document.getElementById("confirm");
var flinput = document.getElementById("flInput");
var crinput = document.getElementById("crInput");

var dataTable = {
“meanGA”: [12,   9,    7.4,	9.8,	7.1,	N,	N,	29.6,	4.8,	4.8,	4.8,	1.5,	1.4,	1.3,	0.6,	0.9,	0.9,	0.1,	0.1,	0.1,	0.03,	N,	N,	0.01,	N,	N,	0.25,	0.19,	0.19,	0.04,	0.11,	0.11],

“stdGA”: [3,	1.1,	1.7,	1.1,	N,	N,	14.9,	1.4,	1.4,	1.4,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	0.14,	0.14,	0.14,	0.06,	N,	N,	0.02,	N,	N,	0.15,	0.15,	0.15,	0.18,	0.18,	0.18]
}


confirm.onclick = alertme;

