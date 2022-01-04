function creat(){

adde.classList.add("anm");


var u = document.getElementById('upto').value;
var tab = document.getElementById('tab');

let i = 0;
while (i <= 2*u-1) {
var row = tab.insertRow(i);
let j = 0;
  while (j <= u) {
    row.insertCell(j);
    j+=1;
  }
i+=1
}

  tab.rows[0].cells[0].innerHTML = 'x';
  tab.rows[0].cells[1].innerHTML = 'y';

  let k = 3;
  while (k <= u) {
    tab.rows[0].cells[2].innerHTML = '&#916';
    tab.rows[0].cells[k].innerHTML = '&#916'+'<sup>'+(k-1)+'</sup>';
    k+=1;
  }

  var tds = document.querySelectorAll('td');

  for (let i=1; i<=2*u-1; i+=2){
    tab.rows[1].cells[0].contentEditable = true;
    tab.rows[i].cells[1].contentEditable = true;
  }


}

function xvalues(){
  var cd = document.getElementById('cd').value;
  var tab = document.getElementById('tab');
  var u = document.getElementById('upto').value;


  for (let i = 1; i < u; i++){
    var firstvalue = tab.rows[1].cells[0].innerHTML;
    var nextvalue = i*cd;
    tab.rows[2*i+1].cells[0].innerHTML= firstvalue-(-nextvalue);
  }



}


function f(){

  var u = document.getElementById('upto').value;
  var cd = document.getElementById('cd').value;
  var tab = document.getElementById('tab');



  for (let c = 2; c <= u; c++){
     for (let r = c; r <= 2*u-c; r+=2){
        var a = tab.rows[r+1].cells[c-1].innerHTML;
        var b = tab.rows[r-1].cells[c-1].innerHTML;

        /*var bmod = b.replace(/[+-]/g, function($1) { return $1 === '+' ? '-' : '+' });
        document.getElementById('out').value=math.simplify(a+'-'+bmod);

        var mod = document.getElementById('out').value;
        var outm = mod.replace(/[*, ]/g, '');*/

        tab.rows[r].cells[c].innerHTML=a-b;

    
      }
  }


  const x = [];
  const y = [];
  const c = [];

  let poly = tab.rows[1].cells[1].innerHTML;



  var tds = document.querySelectorAll('td');


for (let i = 0; i <= u-1; i++){
   x[i] = tab.rows[2*i+1].cells[0].innerHTML;
   y[i] = tab.rows[2*i+1].cells[1].innerHTML;
}



function fac(x){
  let num = 1;
  for (let i = 1; i <= x; i++){
    num*=i;
  }
  return num;
}


for (let i = 0; i <= u-1; i++){
   var nmr = tab.rows[i+1].cells[i+1].innerHTML;
   var dmr = fac(i) * Math.pow(cd, i);
   c[i]=nmr/dmr;
}


for (let i = 0; i <= u-2; i++){
  poly+='+'+c[(i+1)];

  for (let j = 0; j <= i; j++){
   poly+='*(x - '+x[j]+')';

   }
  }

console.log(poly);

document.getElementById('out').value=poly;

  /*eval(poly.replace(/x/g, reqx))*/


}


function func(){

  document.getElementById("tabreqx").classList.add("anmin");
  var poly = document.getElementById('out').value;

	var reqx = document.getElementById('reqx');

  for (let i=1; i<reqx.rows.length; i++) {
    reqx.rows[i].cells[0].contentEditable=true;
  }

  for (let i=1; i<reqx.rows.length; i++) {
    var arg = reqx.rows[i].cells[0].innerHTML;
    reqx.rows[i].cells[1].innerHTML=eval(poly.replace(/x/g, arg))
  }


}


function nr(){
  var reqx = document.getElementById('reqx');

    var newrow = reqx.insertRow(reqx.rows.length);

      newrow.insertCell(0);
      newrow.insertCell(1);

    for (let i=1; i<reqx.rows.length; i++) {
    reqx.rows[i].cells[0].contentEditable=true;
    }


}
  


