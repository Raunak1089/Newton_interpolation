
var tab = document.createElement('table'); tab.id = 'tab';
document.getElementById('gettab').appendChild(tab);

// CREATE TABLE

function creat(){

  text1.classList.add("anm1");
  gettab.classList.add("anm1");
var u = Number(document.getElementById('upto').value);

var oldtab = document.getElementById('tab');
document.getElementById('gettab').removeChild(oldtab);

var tab = document.createElement('table'); tab.id = 'tab';
document.getElementById('gettab').appendChild(tab);
tab.onclick=function(){document.getElementById('cdtxt').style.display='inline';}

let i = 0;
while (i <= 1) {
  var row = tab.insertRow(i);
  let j = 0;
    while (j <= u) {
      row.insertCell(j);
      j+=1;
    }
i+=1
}

  tab.rows[0].cells[0].innerHTML = 'x';
  tab.rows[1].cells[0].innerHTML = 'y';


  for (let i=1; i<=u; i++){
    tab.rows[0].cells[1].contentEditable = true;
    tab.rows[1].cells[i].contentEditable = true;
  }

}

// PUT X VALUES

function xvalues(){
  var cd = document.getElementById('cd').value;
  var tab = document.getElementById('tab');
  var u = Number(document.getElementById('upto').value);


  for (let i = 2; i <= u; i++){
    var firstvalue = Number(tab.rows[0].cells[1].innerHTML);
    var nextvalue = (i-1)*cd;
    tab.rows[0].cells[i].innerHTML= firstvalue+nextvalue;
  }
}

// MAIN FUNCTION

function f(){

  viewpol.classList.add('anm8');
  viewgr.classList.add('anm9');

   // DEFINE VARIABLES AND FUNCTIONS

  var u = Number(document.getElementById('upto').value);
  var cd = Number(document.getElementById('cd').value);
  var tab = document.getElementById('tab');

  function fac(x){
    let num = 1;
	for (let i=1; i<=x; i++){
	    num*=i;
	}
    return num;
  }
  function approx(num, decplace) {
    return Math.round((10**decplace)*num)/10**decplace;
  }
	

  // FORWARD FORMULA

  let x = [];
  let y = [[]];
  let c = [];


  for (let i=0; i <= u-1; i++){
    x[i]=Number(tab.rows[0].cells[i+1].innerHTML);
    y[0][i]=Number(tab.rows[1].cells[i+1].innerHTML);
  }


  for (let i=1; i <= u-1; i++){
    y.push([]);
    for (let j=0; j <= y[i-1].length-2; j++){
        y[i][j] = y[i-1][j+1] - y[i-1][j];
    }
  }


  for (let i = 0; i <= u-1; i++){
    var nmr = y[i][0];
    var dmr = fac(i) * Math.pow(cd, i);
    c[i]=nmr/dmr;
  }

  let poly = y[0][0];

  for (let i = 0; i <= u-2; i++){
    poly+='+'+c[(i+1)];

    for (let j = 0; j <= i; j++){
    poly+='*(x - '+x[j]+')';

    }
  }

console.log(poly);
document.getElementById('out1').value=poly;


// BACKWARD FORMULA

  let xnew = x.reverse();
  let ynew = [y[0].reverse()];
  let cnew = [];


  for (let i=1; i <= u-1; i++){
    ynew.push([]);
    for (let j=0; j <= ynew[i-1].length-2; j++){
        ynew[i][j] = ynew[i-1][j+1] - ynew[i-1][j];
    }
  }


  for (let i = 0; i <= u-1; i++){
    var nmr = ynew[i][0];
    var dmr = fac(i) * Math.pow(-cd, i);
    cnew[i]=nmr/dmr;
  }

  let polynew = ynew[0][0];

  for (let i = 0; i <= u-2; i++){
    polynew+='+'+cnew[(i+1)];

    for (let j = 0; j <= i; j++){
    polynew+='*(x - '+xnew[j]+')';

    }
  }

  console.log(polynew);
  document.getElementById('out2').value=polynew;


// MAKING THE POLYMOMIALS TO DISPLAY

  var fd = document.getElementById('fd');
  var bd = document.getElementById('bd');


  fd.innerHTML=poly.replace(/[*, ]/g, '').replace("+-", "-");
  bd.innerHTML=polynew.replace(/[*, ]/g, '').replace("+-", "-");


  tabreqx1.classList.add("anm2");
  tabreqx2.classList.add("anm2");
	var reqx1 = document.getElementById('reqx1');
	var reqx2 = document.getElementById('reqx2');

  for (let i=1; i<reqx1.rows.length; i++) {
    reqx1.rows[i].cells[0].contentEditable=true;
  }


// MAKING THE GRAPH

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
function p(num){
   return eval(poly.replace(/x/g, num))
}

var textareax = document.createElement('textarea');
textareax.id= "xv"; textareax.style.display= "none";
document.body.appendChild(textareax);

var textareay = document.createElement('textarea');
textareay.id= "yv"; textareay.style.display= "none";
document.body.appendChild(textareay);


// SET ORIGIN

let originx = canvas.width/5;
let originy = canvas.height*4/5;


// X-AXIS

var xax = ctx.createImageData(2, canvas.height);

for (let i = 0; i < xax.data.length; i += 4) {
  xax.data[i+0] = 0; //Red
  xax.data[i+1] = 0; //Green
  xax.data[i+2] = 0; //Blue
  xax.data[i+3] = 255; //Opacity
}

// Y-AXIS

var yax = ctx.createImageData(canvas.width, 2);

for (let i = 0; i < yax.data.length; i += 4) {
  yax.data[i+0] = 0; //Red
  yax.data[i+1] = 0; //Green
  yax.data[i+2] = 0; //Blue
  yax.data[i+3] = 255; //Opacity
}

           ctx.putImageData(xax, originx-1, 0);
           ctx.putImageData(yax, 0, originy-1);


// MAKE DRAGGING FUNCTION FOR PC

var dragValue;

canvas.onmousedown = function(e) {
  dragValue = ctx;

let xv = e.screenX-originx;
let yv = e.screenY-originy;

document.getElementById("xv").value=xv;
document.getElementById("yv").value=yv;

}

document.onmouseup = function(){
        dragValue = null;
      }

document.onmousemove = function(ev) {
          dragValue.clearRect(0, 0, canvas.width, canvas.height);

let xv = Number(document.getElementById("xv").value);
let yv = Number(document.getElementById("yv").value);

           originx = ev.screenX - xv; 
           originy = ev.screenY - yv;
           
                      dragValue.putImageData(xax, originx-1, 0);
                      dragValue.putImageData(yax, 0, originy-1);
                      draw();

}

// MAKE DRAGGING FUNCTION FOR ANDROID

canvas.ontouchstart = function(ev) {
           var e = ev.targetTouches[0];
           
let xv = e.screenX-originx;
let yv = e.screenY-originy;

document.getElementById("xv").value=xv;
document.getElementById("yv").value=yv;

disableScroll();
}


canvas.ontouchmove = function(ev) {
           ctx.clearRect(0, 0, canvas.width, canvas.height);

let xv = Number(document.getElementById("xv").value);
let yv = Number(document.getElementById("yv").value);

           var e = ev.targetTouches[0];
           originx = e.screenX - xv;
           originy = e.screenY - yv;
           
                      ctx.putImageData(xax, originx-1, 0);
                      ctx.putImageData(yax, 0, originy-1);
                      draw();

}

document.ontouchend = function(){
enableScroll();
}

// DRAWING THE CURVE AND POINTS

draw();

function draw(){

// CURVE

ctx.lineWidth= 1;
ctx.strokeStyle='red';

ctx.beginPath();

ctx.moveTo(0,originy-p(-originx));

for (let x = -originx; x <= canvas.width-originx; x++) {
   ctx.lineTo(x+originx,originy-p(x));
}

ctx.stroke();


// POINTS

ctx.lineWidth = 5;
ctx.strokeStyle = 'blue'; 

for (let i = 0; i < x.length; i++) {
   ctx.beginPath();
   let j = Math.pow(i,2);
   ctx.arc(x[i]+originx, originy-y[0][i], 2, 0, 2 * Math.PI);
   ctx.stroke();

   ctx.font = "20px Arial";
   var pt = "("+x[i]+", "+y[0][i]+")";
   ctx.fillText(pt,x[i]+originx+10,originy-y[0][i]+20);

}

}




}

// CALCULATE Y VALUES

function func(){

  var poly = document.getElementById('out1').value;
  var polynew = document.getElementById('out2').value;

  for (let i=1; i<reqx1.rows.length; i++) {
    var arg = reqx1.rows[i].cells[0].innerHTML;
    reqx1.rows[i].cells[1].innerHTML=approx(eval(poly.replace(/x/g, arg)), 4)
  }

  for (let i=1; i<reqx2.rows.length; i++) {
    reqx2.rows[i].cells[0].contentEditable=true;
  }

  for (let i=1; i<reqx2.rows.length; i++) {
    var arg = reqx2.rows[i].cells[0].innerHTML;
    reqx2.rows[i].cells[1].innerHTML=approx(eval(polynew.replace(/x/g, arg)), 4)
  }


}

// ADD ROW TO CALCULATION TABLE

function nr1(){
  var reqx1 = document.getElementById('reqx1');

    var newrow = reqx1.insertRow(reqx1.rows.length);

      newrow.insertCell(0);
      newrow.insertCell(1);

    for (let i=1; i<reqx1.rows.length; i++) {
    reqx1.rows[i].cells[0].contentEditable=true;
    }


}
  
function nr2(){
  var reqx2 = document.getElementById('reqx2');

    var newrow = reqx2.insertRow(reqx2.rows.length);

      newrow.insertCell(0);
      newrow.insertCell(1);

    for (let i=1; i<reqx1.rows.length; i++) {
      reqx2.rows[i].cells[0].contentEditable=true;
    }


}

// TWO BUTTONS

var shwpol = false;

function ShowPolynomial(){

  var viewpol = document.getElementById('viewpol');
  var outs = document.getElementById('outs');

    if (shwpol) {
       viewpol.innerHTML='View Polynomials'
       viewpol.style.color="white";
       viewpol.style.boxShadow = "-3px 5px 5px 3px #888";
       viewpol.style.background="rgb(109, 133, 241)";
       outs.classList.remove("anm3");
       outs.classList.add("anm4");
       shwpol = false;
       setTimeout(function(){outs.classList.remove("anm4");
                             outs.style.display = 'none';}, 1000)
      }
      
    else {
       viewpol.innerHTML='Hide Polynomials'
       viewpol.style.color="black";
       viewpol.style.boxShadow = "inset -3px 5px 5px 3px #888";
       viewpol.style.background="darkgray";
       outs.style.display = 'inline';
       outs.classList.add("anm3");
       shwpol = true;
      }
     
  }



var shwgr = false;

function ShowGraph(){

var viewgr = document.getElementById('viewgr');
var graph = document.getElementById('graph');

  if (shwgr) {
      viewgr.innerHTML='View Graph'
      viewgr.style.color="white";
      viewgr.style.background="rgb(109, 133, 241)";
      viewgr.style.boxShadow = "-3px 5px 5px 3px #888";
      graph.classList.remove("anm5");
      graph.classList.add("anm6");
      shwgr = false;
      setTimeout(function(){graph.classList.remove("anm6");
                            graph.style.display = 'none';}, 1000)
    }
    
  else {
      viewgr.innerHTML='Hide Graph'
      viewgr.style.color="black";
      viewgr.style.background="darkgray";
      viewgr.style.boxShadow = "inset -3px 5px 5px 3px #888";
      graph.style.display = 'inline';
      graph.classList.add("anm5");
      shwgr = true;
    }
    
}


function copyit(x){

  // REDUCE BRIGHTNESS

x.style.filter = "brightness(50%)";

  // COPY TEXT

let text = x.innerText;
let textArea = document.createElement('textarea');
textArea.width='1px';
textArea.height='1px';
textArea.background='transparent';
textArea.value=text;
document.body.append(textArea);
textArea.select();
document.execCommand('copy');
document.body.removeChild(textArea);

  // WRITE COPIED

let span = document.createElement('div');
span.id= "copied";
span.innerHTML='Copied!';
document.body.appendChild(span);

  // REMOVE THINGS

setTimeout(function(){x.style.filter = "brightness(100%)";
                      document.body.removeChild(span);}, 1500)

}
