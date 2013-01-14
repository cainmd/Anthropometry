//Notes: need to div CC and AC SD by 2! Different paper. Done for this but not in excel
//Can check values too
   
if (window.hasOwnProperty('jQuery') === false) {
     // NOTE: It also needs to be version 1.7.2. I have had trouble getting it
     // to work with "newer" versions of jQuery, and I'm not sure why yet ...
        throw new Error('jQuery is missing.');
    }

 // Declarations



 // Definitions

var $ = window.jQuery;

//used to determine values in maceration columns
var step;

var stringer;
//keep adding text
var textString = "";

var expectedRange=[];
var correctedRange=[];
var trimmedExpected =[];
var trimmedCorrected=[];
var trimmedCorrectedSD=[];
var trimmedExpectedSD=[];
//need to know if working on expected or corrected
var iterations;
var useDet;
var detEntry;
var rangeMeas;
var form1 = document.getElementById("form1");
var gaM;
var gaSD;
var GAA;
var currentRange;

var submit = document.getElementById("submit");

//var test = alert("here");


//add GA to document
var GA = document.getElementById("GA");
//GA = parseInt(GA.value);

var FL = document.getElementById("FL");
var CR = document.getElementById("CR");
var CH = document.getElementById("CH");
var HC = document.getElementById("HC");
var CC = document.getElementById("CC");
var AC = document.getElementById("AC");
var bodyWeight = document.getElementById("bodyWeight");
var BW = document.getElementById("BW");
var LVW = document.getElementById("LVW");
var LUW = document.getElementById("LUW");
var HW = document.getElementById("HW");
var TW = document.getElementById("TW");
var SW = document.getElementById("SW");
var KW = document.getElementById("KW");
var AW = document.getElementById("AW");


var s = document.getElementById('detAge');
var detAge = s.options[s.selectedIndex].value;

var t = document.getElementById('maceration');
var maceration = t.options[t.selectedIndex].value;

var labels = ["Foot Length (mm)", "Crown Rump Length (cm)", "Crown Heel Length (cm)", "Head Circumference (cm)", "Chest Circumference (cm)", "Abdominal Circumference (cm)", "Body Weight (g)", "Brain Weight (g)", 
"Liver Weight (g)", "Lung Weight (g)", "Heart Weight (g)", "Thymus Weight (g)", "Spleen Weight (g)", "Kidney Weight (g)", "Adrenal Weight (g)"];

var actualRange;



//var dataTable = {
//'12': [12,   9,    7.4,    9.8,    7.1,    NaN,	NaN,	29.6,	4.8,	4.8,	4.8,	1.5,	1.4,	1.3,	0.6,	0.9,	0.9,	0.1,	0.1,	0.1,	0.03,	NaN,	NaN,	0.01,	NaN,	NaN,	0.25,	0.19,	0.19,	0.04,	0.11,	0.11],

//'12SD': [3,	1.1,	1.7,	1.1,	NaN,	NaN,	14.9,	1.4,	1.4,	1.4,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	0.14,	0.14,	0.14,	0.06,	NaN,	NaN,	0.02,	NaN,	NaN,	0.15,	0.15,	0.15,	0.18,	0.18,	0.18]
//}
//var dataTable = {
//a2 : 5
//}

var dataTable = {

//	 0 FL	1CR	2CH	3HC	4CC	5AC	6BW	7bra	8bra	8bra	9liv	10liv	11liv	12lun	13lun	14lu	15ht	16ht	17ht	18thy	19thym	20thym	21sple	22sple	23spl	24kid	24kd	25kd	26ad	27ad	28ad
M12:	[9,	7.4,	9.8,	7.1,	NaN,	NaN,	29.6,	4.8,	4.8,	4.8,	1.5,	1.4,	1.3,	0.6,	0.9,	0.9,	0.1,	0.1,	0.1,	0.03,	NaN,	NaN,	0.01,	NaN,	NaN,	0.25,	0.19,	0.19,	0.04,	0.11,	0.11],
SD12:	[3,	1.1,	1.7,	1.1,	NaN,	NaN,	14.9,	1.4,	1.4,	1.4,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	0.14,	0.14,	0.14,	0.06,	NaN,	NaN,	0.02,	NaN,	NaN,	0.15,	0.15,	0.15,	0.18,	0.18,	0.18],
M13:	[12,	8.7,	11.8,	8.5,	NaN,	NaN,	37.4,	6.5,	6.5,	6.5,	2,	1.7,	1.7,	1.2,	1.2,	1.2,	0.2,	0.2,	0.2,	0.04,	NaN,	NaN,	0.02,	0.08,	0.08,	0.3,	0.2,	0.2,	0.17,	0.17,	0.17],
SD13:	[3,	1.2,	1.8,	1.2,	NaN,	NaN,	14.9,	1.4,	1.4,	1.4,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	0.14,	0.14,	0.14,	0.06,	NaN,	NaN,	0.03,	0.03,	0.03,	0.1,	0.1,	0.1,	0.18,	0.18,	0.18],
M14:	[15,	9.9,	13.7,	9.8,	NaN,	NaN,	53,	9.1,	9.1,	9.1,	2.9,	2.4,	2.3,	2,	1.5,	1.5,	0.3,	0.3,	0.3,	0.05,	0.07,	0.05,	0.04,	0.14,	0.14,	0.4,	0.3,	0.3,	0.3,	0.2,	0.2],
SD14:	[3,	1.2,	1.8,	1.2,	NaN,	NaN,	14.9,	2.5,	2.5,	2.5,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	0.1,	0.1,	0.1,	0.06,	0.06,	0.06,	0.04,	0.04,	0.04,	0.1,	0.1,	0.1,	0.2,	0.2,	0.2],
M15:	[18,	11.1,	15.6,	11.1,	NaN,	NaN,	76.5,	12.7,	12.7,	12.7,	4.2,	3.3,	3.2,	2.9,	2.1,	2.1,	0.5,	0.5,	0.5,	0.07,	0.08,	0.06,	0.06,	0.17,	0.17,	0.6,	0.5,	0.5,	0.5,	0.3,	0.3],
SD15:	[3,	1.2,	1.8,	1.2,	NaN,	NaN,	18.5,	3.9,	3.9,	3.9,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	0.1,	0.1,	0.1,	0.06,	0.06,	0.06,	0.06,	0.06,	0.06,	0.3,	0.3,	0.3,	0.2,	0.2,	0.2],
M16:	[21,	12.4,	17.5,	12.4,	NaN,	NaN,	108,	17.3,	17.3,	17.3,	5.9,	4.5,	4.2,	3.9,	2.7,	2.7,	0.8,	0.8,	0.8,	0.11,	0.12,	0.09,	0.09,	0.17,	0.17,	0.9,	0.8,	0.8,	0.6,	0.4,	0.4],
SD16:	[3,	1.3,	1.8,	1.3,	NaN,	NaN,	41,	5.4,	5.4,	5.4,	1.5,	1.5,	1.5,	1.2,	1.2,	1.2,	0.2,	0.2,	0.2,	0.06,	0.06,	0.06,	0.08,	0.08,	0.08,	0.4,	0.4,	0.4,	0.3,	0.3,	0.3],
M17:	[24,	13.5,	19.3,	13.6,	NaN,	NaN,	147,	22.9,	22.9,	22.9,	8.1,	6.1,	5.4,	5.1,	3.5,	3.5,	1,	1,	1,	0.18,	0.18,	0.12,	0.13,	0.16,	0.16,	1.3,	1.1,	1.1,	0.8,	0.5,	0.5],
SD17:	[3,	1.3,	1.9,	1.3,	NaN,	NaN,	53,	6.9,	6.9,	6.9,	3,	3,	3,	1.7,	1.7,	1.7,	0.4,	0.4,	0.4,	0.06,	0.06,	0.06,	0.12,	0.12,	0.12,	0.6,	0.6,	0.6,	0.4,	0.4,	0.4],
M18:	[27,	14.7,	21.1,	14.8,	NaN,	NaN,	194,	29.4,	29.4,	29.4,	10.7,	7.9,	6.8,	6.4,	4.4,	4.4,	1.4,	1.4,	1.4,	0.3,	0.3,	0.2,	0.19,	0.15,	0.15,	1.8,	1.5,	1.5,	1,	0.7,	0.7],
SD18:	[3,	1.3,	1.9,	1.3,	NaN,	NaN,	65,	8.4,	8.4,	8.4,	4.5,	4.5,	4.5,	2.3,	2.3,	2.3,	0.5,	0.5,	0.5,	0.2,	0.2,	0.2,	0.17,	0.17,	0.17,	0.8,	0.8,	0.8,	0.4,	0.4,	0.4],
M19:	[30,	15.9,	22.9,	16,	NaN,	NaN,	249,	37,	37,	37,	13.8,	10.1,	8.4,	7.9,	5.4,	5.4,	1.7,	1.7,	1.7,	0.4,	0.4,	0.3,	0.3,	0.15,	0.15,	2.4,	2,	2,	1.2,	0.8,	0.8],
SD19:	[3,	1.3,	1.9,	1.3,	NaN,	NaN,	78,	9.8,	9.8,	9.8,	6,	6,	6,	2.8,	2.8,	2.8,	0.7,	0.7,	0.7,	0.3,	0.3,	0.3,	0.2,	0.22,	0.22,	1,	1,	1,	0.5,	0.5,	0.5],
M20:	[33,	17,	24.6,	17.2,	15.1,	12.6,	312,	45.5,	45.5,	45.5,	17.2,	12.5,	10.2,	9.5,	6.5,	6.5,	2.1,	2.1,	2.1,	0.6,	0.5,	0.3,	0.4,	0.17,	0.17,	3,	2.5,	2.5,	1.4,	1,	1],
SD20:	[3,	1.4,	1.9,	1.4,	1.25,	1.7,	92,	11.3,	11.3,	11.3,	7.5,	7.5,	7.5,	3.4,	3.4,	3.4,	0.8,	0.8,	0.8,	0.4,	0.4,	0.4,	0.3,	0.29,	0.29,	1.2,	1.2,	1.2,	0.6,	0.6,	0.6],
M21:	[36,	18.2,	26.3,	18.3,	15.1,	12.6,	382,	55,	55,	55,	21.1,	15.2,	12.3,	11.2,	7.8,	7.8,	2.6,	2.6,	2.6,	0.8,	0.7,	0.4,	0.5,	0.22,	0.22,	3.8,	3.1,	3.1,	1.7,	1.2,	1.2],
SD21:	[3,	1.4,	2,	1.4,	1.25,	1.7,	107,	12.8,	12.8,	12.8,	9,	9,	9,	4,	4,	4,	1,	1,	1,	0.5,	0.5,	0.5,	0.4,	0.36,	0.36,	1.4,	1.4,	1.4,	0.7,	0.7,	0.7],
M22:	[39,	19.3,	28,	19.4,	16.7,	14.4,	461,	65.4,	65.4,	65.4,	25.5,	18.2,	14.5,	13.1,	9.2,	9.2,	3.1,	3.1,	3.1,	1,	0.9,	0.6,	0.7,	0.3,	0.3,	4.6,	3.8,	3.8,	1.9,	1.4,	1.4],
SD22:	[3,	1.4,	2,	1.4,	0.95,	1.45,	122,	14.3,	14.3,	14.3,	10.4,	10.4,	10.4,	4.6,	4.6,	4.6,	1.1,	1.1,	1.1,	0.6,	0.6,	0.6,	0.4,	0.4,	0.4,	1.6,	1.6,	1.6,	0.8,	0.8,	0.8],
M23:	[41,	20.4,	29.6,	20.5,	16.7,	14.4,	547,	76.9,	76.9,	76.9,	30.2,	21.6,	16.9,	15.1,	10.7,	10.7,	3.6,	3.6,	3.6,	1.3,	1.1,	0.7,	0.9,	0.4,	0.4,	5.5,	4.6,	4.6,	2.2,	1.6,	1.6],
SD23:	[4,	1.5,	2,	1.4,	0.95,	1.45,	122,	15.8,	15.8,	15.8,	11.9,	11.9,	11.9,	5.3,	5.3,	5.3,	1.3,	1.3,	1.3,	0.8,	0.8,	0.8,	0.5,	0.5,	0.5,	1.9,	1.9,	1.9,	0.8,	0.8,	0.8],
M24:	[44,	21.5,	31.2,	21.6,	17.7,	15.6,	641,	89.3,	89.3,	89.3,	35.4,	25.2,	19.5,	17.3,	12.4,	12.4,	4.2,	4.2,	4.2,	1.6,	1.3,	0.8,	1.1,	0.6,	0.6,	6.5,	5.5,	5.5,	2.5,	1.8,	1.8],
SD24:	[4,	1.5,	2,	1.5,	1.35,	1.45,	137,	17.2,	17.2,	17.2,	13.4,	13.4,	13.4,	5.9,	5.9,	5.9,	1.4,	1.4,	1.4,	0.9,	0.9,	0.9,	0.6,	0.6,	0.6,	2.1,	2.1,	2.1,	0.9,	0.9,	0.9],
M25:	[47,	22.6,	32.8,	22.6,	17.7,	15.6,	743,	103,	103,	103,	41.1,	29.1,	22.3,	19.6,	14.1,	14.1,	4.9,	4.9,	4.9,	1.9,	1.6,	1,	1.4,	0.8,	0.8,	7.6,	6.4,	6.4,	2.8,	2,	2],
SD25:	[4,	1.5,	2.1,	1.5,	1.35,	1.45,	154,	19,	19,	19,	14.9,	14.9,	14.9,	6.6,	6.6,	6.6,	1.6,	1.6,	1.6,	1.1,	1.1,	1.1,	0.7,	0.7,	0.7,	2.4,	2.4,	2.4,	1,	1,	1],
M26:	[50,	23.6,	34.3,	23.6,	20,	NaN,	853,	117,	117,	117,	47.1,	33.4,	25.3,	22,	16,	16,	5.6,	5.6,	5.6,	2.3,	1.9,	1.2,	1.7,	1.1,	1.1,	8.8,	7.4,	7.4,	3.1,	2.3,	2.3],
SD26:	[4,	1.5,	2.1,	1.5,	2.2,	NaN,	171,	20,	20,	20,	16.4,	16.4,	16.4,	7.3,	7.3,	7.3,	1.7,	1.7,	1.7,	1.2,	1.2,	1.2,	0.9,	0.9,	0.9,	2.7,	2.7,	2.7,	1.1,	1.1,	1.1],
M27:	[52,	24.7,	35.8,	24.5,	20,	NaN,	971,	133,	133,	133,	53.6,	37.9,	28.6,	24.6,	18,	18,	6.3,	6.3,	6.3,	2.6,	2.2,	1.4,	2.1,	1.4,	1.4,	10.1,	8.4,	8.4,	3.4,	2.5,	2.5],
SD27:	[4,	1.6,	2.1,	1.5,	2.2,	NaN,	188,	22,	22,	22,	17.9,	17.9,	17.9,	8,	8,	8,	1.8,	1.8,	1.8,	1.4,	1.4,	1.4,	1,	1,	1,	3,	3,	3,	1.2,	1.2,	1.2],
M28:	[55,	25.7,	37.3,	25.5,	NaN,	NaN,	1096,	149,	149,	149,	60.6,	42.7,	32,	27.4,	20.2,	20.2,	7.1,	7.1,	7.1,	3.1,	2.5,	1.6,	2.5,	1.8,	1.8,	11.4,	9.6,	9.6,	3.7,	2.8,	2.8],
SD28:	[4,	1.6,	2.2,	1.6,	NaN,	NaN,	206,	23,	23,	23,	19.3,	19.3,	19.3,	8.7,	8.7,	8.7,	2,	2,	2,	1.6,	1.6,	1.6,	1.1,	1.1,	1.1,	3.3,	3.3,	3.3,	1.3,	1.3,	1.3],
M29:	[57,	26.7,	38.7,	26.4,	NaN,	NaN,	1230,	166,	166,	166,	67.9,	47.8,	35.6,	30.2,	22.5,	22.5,	7.9,	7.9,	7.9,	3.5,	2.9,	1.8,	3,	2.2,	2.2,	12.9,	10.8,	10.8,	4.1,	3.1,	3.1],
SD29:	[4,	1.6,	2.2,	1.6,	NaN,	NaN,	225,	25,	25,	25,	20.8,	20.8,	20.8,	9.5,	9.5,	9.5,	2.1,	2.1,	2.1,	1.8,	1.8,	1.8,	1.3,	1.3,	1.3,	3.6,	3.6,	3.6,	1.4,	1.4,	1.4],
M30:	[60,	27.7,	40.1,	27.2,	NaN,	NaN,	1371,	185,	185,	185,	75.7,	53.3,	39.4,	33.2,	24.9,	24.9,	8.7,	8.7,	8.7,	4,	3.3,	2.1,	3.6,	2.7,	2.7,	14.4,	12.1,	12.1,	4.5,	3.4,	3.4],
SD30:	[4,	1.6,	2.2,	1.6,	NaN,	NaN,	244,	26,	26,	26,	22.3,	22.3,	22.3,	10.2,	10.2,	10.2,	2.3,	2.3,	2.3,	2.1,	2.1,	2.1,	1.4,	1.4,	1.4,	3.9,	3.9,	3.9,	1.4,	1.4,	1.4],
M31:	[62,	28.7,	41.4,	28.1,	NaN,	NaN,	1520,	204,	204,	204,	83.9,	59,	43.4,	36.3,	27.4,	27.4,	9.6,	9.6,	9.6,	4.5,	3.7,	2.3,	4.2,	3.3,	3.3,	16,	13.4,	13.4,	4.8,	3.8,	3.8],
SD31:	[4,	1.7,	2.2,	1.7,	NaN,	NaN,	264,	28,	28,	28,	23.8,	23.8,	23.8,	11,	11,	11,	2.4,	2.4,	2.4,	2.3,	2.3,	2.3,	1.6,	1.6,	1.6,	4.3,	4.3,	4.3,	1.5,	1.5,	1.5],
M32:	[64,	29.7,	42.8,	28.9,	26.7,	NaN,	1677,	224,	224,	224,	92.6,	65,	47.6,	39.6,	30,	30,	10.6,	10.6,	10.6,	5,	4.2,	2.6,	4.8,	3.9,	3.9,	17.7,	14.9,	14.9,	5.2,	4.1,	4.1],
SD32:	[4,	1.7,	2.3,	1.7,	0.55,	NaN,	285,	29,	29,	29,	25.3,	25.3,	25.3,	11.8,	11.8,	11.8,	2.6,	2.6,	2.6,	2.5,	2.5,	2.5,	1.8,	1.8,	1.8,	4.6,	4.6,	4.6,	1.6,	1.6,	1.6],
M33:	[67,	30.6,	44,	29.7,	26.7,	NaN,	1842,	245,	245,	245,	102,	71.3,	52.1,	43,	32.8,	32.8,	11.6,	11.6,	11.6,	5.6,	4.6,	2.9,	5.5,	4.5,	4.5,	19.5,	16.4,	16.4,	5.6,	4.5,	4.5],
SD33:	[4,	1.7,	2.3,	1.7,	0.55,	NaN,	306,	31,	31,	31,	27,	26.7,	26.7,	12.6,	12.6,	12.6,	2.7,	2.7,	2.7,	2.8,	2.8,	2.8,	1.9,	1.9,	1.9,	5,	5,	5,	1.7,	1.7,	1.7],
M34:	[69,	31.6,	45.3,	30.5,	28.7,	NaN,	2015,	268,	268,	268,	111,	77.9,	56.7,	46.6,	35.7,	35.7,	12.6,	12.6,	12.6,	6.2,	5.1,	3.2,	6.3,	5.2,	5.2,	21.4,	18,	18,	6,	4.8,	4.8],
SD34:	[4,	1.8,	2.3,	1.7,	1.5,	NaN,	328,	32,	32,	32,	28,	28.2,	28.2,	13.5,	13.5,	13.5,	2.9,	2.9,	2.9,	3.1,	3.1,	3.1,	2.1,	2.1,	2.1,	5.4,	5.4,	5.4,	1.8,	1.8,	1.8],
M35:	[71,	32.5,	46.5,	31.2,	28.7,	NaN,	2195,	291,	291,	291,	121,	84.8,	61.5,	50.3,	38.7,	38.7,	13.7,	13.7,	13.7,	6.9,	5.7,	3.5,	7.2,	6,	6,	23.3,	19.6,	19.6,	6.5,	5.2,	5.2],
SD35:	[5,	1.8,	2.3,	1.8,	1.5,	NaN,	350,	33,	33,	33,	30,	29.7,	29.7,	14.3,	14.3,	14.3,	3,	3,	3,	3.3,	3.3,	3.3,	2.3,	2.3,	2.3,	5.8,	5.8,	5.8,	1.9,	1.9,	1.9],
M36:	[73,	33.4,	47.7,	31.9,	30.7,	NaN,	2383,	315,	315,	315,	132,	92.1,	66.5,	54.1,	41.9,	41.9,	14.8,	14.8,	14.8,	7.5,	6.2,	3.8,	8.1,	6.7,	6.7,	25.4,	21.4,	21.4,	6.9,	5.6,	5.6],
SD36:	[5,	1.8,	2.4,	1.8,	1.35,	NaN,	373,	35,	35,	35,	31,	31.2,	31.2,	15.2,	15.2,	15.2,	3.2,	3.2,	3.2,	3.6,	3.6,	3.6,	2.5,	2.5,	2.5,	6.2,	6.2,	6.2,	2,	2,	2],
M37:	[76,	34.3,	48.9,	32.6,	30.7,	NaN,	2580,	340,	340,	340,	142,	100,	71.7,	58.1,	45.1,	45.1,	16,	16,	16,	8.2,	6.8,	4.2,	9.1,	7.5,	7.5,	27.5,	23.2,	23.2,	7.4,	6,	6],
SD37:	[5,	1.8,	2.4,	1.8,	1.35,	NaN,	397,	36,	36,	36,	33,	33,	32.7,	16.1,	16.1,	16.1,	3.3,	3.3,	3.3,	3.9,	3.9,	3.9,	2.7,	2.7,	2.7,	6.6,	6.6,	6.6,	2.1,	2.1,	2.1],
M38:	[78,	35.2,	50,	33.2,	32.1,	NaN,	2784,	366,	366,	366,	154,	107,	77.2,	62.2,	48.5,	48.5,	17.2,	17.2,	17.2,	8.9,	7.4,	3.9,	10.1,	8.3,	8.3,	29.8,	25,	25,	7.8,	6.5,	6.5],
SD38:	[5,	1.9,	2.4,	1.8,	1.3,	NaN,	421,	38,	38,	38,	34,	34,	34.2,	17,	17,	17,	3.4,	3.4,	3.4,	4.2,	4.2,	4.2,	3,	3,	3,	7.1,	7.1,	7.1,	2.2,	2.2,	2.2],
M39:	[80,	36.1,	51.1,	33.8,	32.1,	NaN,	2996,	394,	394,	394,	165,	116,	82.8,	66.5,	52.1,	52.1,	18.5,	18.5,	18.5,	9.7,	8,	5,	11.2,	9.1,	9.1,	32.1,	27,	27,	8.3,	6.9,	6.9],
SD39:	[5,	1.9,	2.4,	1.9,	1.3,	NaN,	446,	39,	39,	39,	36,	36,	35.6,	18,	18,	18,	3.6,	3.6,	3.6,	4.6,	4.6,	4.6,	3.2,	3.2,	3.2,	7.5,	7.5,	7.5,	2.3,	2.3,	2.3],
M40:	[82,	37,	52.1,	34.4,	33,	30.9,	3215,	422,	422,	422,	177,	124,	88.6,	70.9,	55.7,	55.7,	19.8,	19.8,	19.8,	10.5,	8.6,	5.4,	12.4,	9.9,	9.9,	34.5,	29,	29,	8.8,	7.4,	7.4],
SD40:	[5,	1.9,	2.5,	1.9,	1.3,	7.5,	471,	41,	41,	41,	37,	37,	37.1,	18.9,	18.9,	18.9,	3.7,	3.7,	3.7,	4.9,	4.9,	4.9,	3.4,	3.4,	3.4,	8,	8,	8,	2.4,	2.4,	2.4],
M41:	[84,	37.8,	53.1,	35,	33,	30.9,	3443,	451,	451,	451,	190,	133,	94.6,	75.4,	59.5,	59.5,	21.2,	21.2,	21.2,	11.3,	9.3,	5.8,	13.7,	10.7,	10.7,	37,	31.1,	31.1,	9.3,	7.9,	7.9],
SD41:	[5,	1.9,	2.5,	1.9,	1.3,	7.5,	497,	42,	42,	42,	39,	39,	38.6,	19.9,	19.9,	19.9,	3.9,	3.9,	3.9,	5.3,	5.3,	5.3,	3.7,	3.7,	3.7,	8.4,	8.4,	8.4,	2.5,	2.5,	2.5],
M42:	[86,	38.6,	54.1,	35.5,	33.4,	NaN,	3678,	481,	481,	481,	203,	142,	101,	80.1,	63.4,	63.4,	22.5,	22.5,	22.5,	12.2,	10,	6.2,	15,	11.5,	11.5,	39.6,	33.3,	33.3,	9.9,	8.4,	8.4],
SD42:	[5,	2,	2.5,	2,	1.4,	NaN,	524,	44,	44,	44,	40,	40,	40,	20.9,	20.9,	20.9,	4,	4,	4,	5.6,	5.6,	5.6,	4,	4,	4,	8.9,	8.9,	8.9,	2.6,	2.6,	2.6],
M43:	[88,	39.4,	55,	36,	33.4,	NaN,	3922,	512,	512,	512,	216,	151,	107,	84.9,	67.4,	67.4,	24,	24,	24,	13.1,	10.7,	6.6,	16.4,	12.2,	12.2,	42.2,	35.5,	35.5,	10.4,	8.9,	8.9],
SD43:	[5,	2,	2.5,	2,	1.4,	NaN,	551,	45,	45,	45,	42,	42,	42,	21.9,	21.9,	21.9,	4.2,	4.2,	4.2,	6,	6,	6,	4.2,	4.2,	4.2,	9.4,	9.4,	9.4,	2.7,	2.7,	2.7]

}

//alert (dataTable.meanGA[0]);


submit.onclick = function(){resetUse ()};
//resetUse()

//use det takes input to use and will need to have index in table. After found, go to output function




var alertme = function () {
    
alert (useDet);
//alert(detEntry);   


}





var useGA = function (valGA) {

    //first convert input in terms of table ... add an M and search
    //alert(detEntry);
    //ex: GA 35 so use M35 values, if out of range because larger, then use ++ and add M

    //initially assume using foot length

    //debating on global for current mean or limit scope; make sure body weight entry too
    //will need to include body weight...
    if (parseInt(bodyWeight.value) > 0 && parseInt(FL.value) > 0) {
        //change to global gaM and gaSD

        gaM = "M" + valGA;
        gaSD = "SD" + valGA;
        //.value;

        //alert (GA);
        if (iterations > 43) { stop() };


        if (iterations === 0) {
            // store my initial guess at GA
            actualRange = [FL.value, CR.value, CH.value, HC.value, CC.value, AC.value, bodyWeight.value, BW.value, LVW.value, LUW.value, HW.value, TW.value, SW.value, KW.value, AW.value];
            //for (var i = 0; i < actualRange.length ; i++) { alert(actualRange[i]) };
            //for (var i = 0; i < 4; i++) { alert(actualRange[i]) };
            //alert(GA.value)
            expectedRange = [dataTable["M"+ GA.value], dataTable["SD" + GA.value]];
            rangeMeas = calcTwoSD(gaM, gaSD, 0);
            detInRange(rangeMeas);
        }
        else {

            rangeMeas = calcTwoSD(gaM, gaSD, 0);
            detInRange(rangeMeas);
        }
    }

}

var calcTwoSD = function (gaM, gaSD, index) {

//alert(dataTable[gaSD][0]);
//below is trouble line... can't subtract????
//will need to rewrite to take in current location...

var mini = dataTable[gaM][index] - dataTable[gaSD][index] * 2;
var maxi = dataTable[gaM][index] + dataTable[gaSD][index] * 2; 
//alert(mini);
return [mini, maxi];
}


var detInRange = function (rangeMeas) {
//choose either FL or body weight with an additional variable...
//will add each time to GA until found, call useGA each time.
//alert(detEntry);

	if (detEntry > rangeMeas[1]){
		alert("Greater than GA");
			GAA++;
		useGA(GAA)
		}	
	else if (detEntry < rangeMeas[0]){		
		alert("Smaller than GA");
		GAA--;
		useGA(GAA);
	}	
	else {		
	    
		if (iterations > 0){
            //alert (iterations)
		correctedRange = [dataTable[gaM], dataTable[gaSD]];
        
		}
        correctedRange = [dataTable[gaM], dataTable[gaSD]];
        generate_report();
	}
iterations++;

}



var resetUse = function () {
	if(detAge === "Foot Length"){

	useDet = 0;
	detEntry = FL.value;

	}
	else {
	useDet = 6;
	detEntry = parseInt(bodyWeight.value);
	}
	GAA = GA.value;

	iterations = 0;
//stop evil negatives!!
	
	checkValues();

	useGA(GAA);
	
    document.getElementById('report-output').style.display = 'block';
	
	
}

var stop = function () { };



 $(document.body).keyup(function (evt) {
//alert("help");        
 // This function adds hotkeys so that the user doesn't have to scroll
         // all the way to the top and click the button in order to inspect a
         // freshly generated report. I will add support for touch gestures in
         // the near future when I can obtain a tablet to test with.
            if ((evt.which === 13) && ($('textarea:visible').length === 0)) {
             // The user pressed "Enter".
                //evt.preventDefault();
                //$('#generate-report').click();
            } 
		else if (evt.which === 27) {
             // The user pressed "Escape".
		document.getElementById('report-output').style.display = 'none';
                //it reaches here but doesn't close display!!!
               
            }
            return
 });





 var checkValues = function () {

     for (var i = 0; i < labels.length; i++) {

         //if (actualRange[i] === undefined  || actualRange[i] <= 0) {
           //actualRange[i] = "No Entry";
         //}
        // alert(actualRange[i]);
     }
 }

 generate_report = function () {
     // This function joins the output from each section's own generating
     // function as text and puts that text into the designated textarea.
     // I will define a generic sentence and append each line with unit and (expected range = x)

     //if ($('#report-output:visible').length === 0) {
     // If the textarea is hidden, we don't need to generate the report.
     //   return;
     //}
     generate_expected();
     if (GAA != GA.value) {
         generate_corrected();
     }
     $('#report-output').text("The expected measurements for:" + " " + GA.value + " " + "weeks" + "\r\n" + textString);
     //will use ex: body weight = 4000 (expected range for GA is 3000 - 3500 grams)

 };


 var generate_expected = function () {
     //alert(expectedRange[0].length)
     //alert (expectedRange[0].length);
     
     trimmedExpected = trimmer(expectedRange[0]);
     
     trimmedExpectedSD = trimmer(expectedRange[1]);
     
     for (var i = 0; i < labels.length; i++) {
         //store new range for actual values and text	
         //trimmedExpected, trimmedCorrected
         //alert(trimmedExpected[i]);

         // alert(trimmedExpected.length + " " + labels.length )
         
         //$('#report-output').(expectedRange[0][i]);
         // \n for new paragraph and append
         //currentRange = calcTwoSD("M" + GA.value, "SD" + GA.value, i);
         textString = textString + "\r\n" + labels[i] + " " + actualRange[i] + " " + "(Mean:" + " " + trimmedExpected[i] + " with 95% range of" + " " + Math.round([trimmedExpected[i] - trimmedExpectedSD[i] * 2] * 10) / 10 + " - " + Math.round([trimmedExpected[i] + trimmedExpectedSD[i] * 2] * 10) / 10 + ")";

     }

 }

      var generate_corrected = function () {
         //alert(expectedRange[0].length)
         //alert (expectedRange[0].length);
         //alert("before correct")
         trimmedCorrected = trimmer(correctedRange[0]);
         //alert("after")
         trimmedCorrectedSD = trimmer(correctedRange[1]);
         
         textString = textString + "\r\n" + "\r\n" + "The expected measurements for :" + " " + GAA + "weeks" +"\r\n"
         for (var i = 0; i < labels.length; i++) {
             //store new range for actual values and text	
             //trimmedExpected, trimmedCorrected

             //alert(trimmedCorrected.length + " " + labels.length )
             //alert(trimmedExpected[i]);
             //$('#report-output').(expectedRange[0][i]);
             // \n for new paragraph and append
             //currentRange = calcTwoSD("M" + GA.value, "SD" + GA.value, i);
             textString = textString + "\r\n" + labels[i] + " " + actualRange[i] + " " + "(Mean:" + " " + trimmedCorrected[i] + " with 95% range of" + " " + Math.round([trimmedCorrected[i] - trimmedCorrectedSD[i] * 2] * 10) / 10 + " - " + Math.round([trimmedCorrected[i] + trimmedCorrectedSD[i] * 2] * 10) / 10 + ")";

         }

     }
     var trimmer = function (longArray) {
         //alert(maceration)
         var count = 0;
         var trimmedReturn = [];
         var step = 1;
         for (var i = 0; i < longArray.length; i += step) {
             //after >=7
             if (i < 7) {
                 trimmedReturn[count] = longArray[i];
                 //alert(i)
                 //alert(trimmedReturn[0]);
             }
             else if (i == 7) {
                 step = 3

                 if (maceration == "None to mild") {
                     trimmedReturn[count] = longArray[i];

                 }
                 else if (maceration == "Moderate") {
                     i = i + 1;
                     trimmedReturn[count] = longArray[i];
                 }
                 else {
                     i = i + 2;
                     trimmedReturn[count] = longArray[i];
                 }
             }
             else {

                 //alert(step)
                 trimmedReturn[count] = longArray[i];
                 //alert(trimmedReturn[i]);
             }
             count++;
         }
         return trimmedReturn;

     }
 
