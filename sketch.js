
// Declare VAR'S up here
var s;
var gridType;
var maxM;
var c;
var d;
var cursorType;
var hoverType;
var cC;

function setup() {
	angleMode(DEGREES);
	s = int(prompt("Number of pixels in 1 unit of length (eg: 50): "));
	if (isNaN(s)){
		s = 50;
	}
	gridType = int(prompt("The grid type (3:isometric, 4:square): "));
	if (isNaN(gridType) || gridType<3 || gridType>4){
		gridType = 4;
	}
	maxM = abs(int(prompt("Number of concentric circles: ")));
	if (isNaN(maxM)){
		maxM = 20;
	}
	c = [];
	d = [0,0];
	initCircles();
  W = window.innerWidth;
	H = window.innerHeight;
  canvas = createCanvas(W, H);
}

function draw() {
	textAlign(CENTER,CENTER);
	translate(W/2,H/2);
	background(247,247,247);
	if (gridType===3){
	    isoGrid();    
	} else if (gridType===4) {
	    squareGrid();
	}

	stroke(154, 166, 214);
	strokeWeight(6);
	drawPoint(0,0);
	
	strokeWeight(1);
	drawConcentric();	
	
	printButton();
	cursorSetup();
}
function hoverConditions(){
	if (mouseX>20 && mouseX<80 && mouseY>20 && mouseY<80){
		return ["button","print"];
	}
	return [""];
}
function cursorConditions(hoverType){
	if (hoverType === "button"){
		cursorType = "pointer";
	} else {
		cursorType = "grab";
	}
}
function clickConditions(hoverType){
	if (hoverType === "print"){
		alert("The first "+maxM+" m's:\n"+c);
	}
}
function cursorSetup(){
	cursorConditions(hoverConditions()[0]);
	cursor(cursorType);
}
function printButton(){
	fill(255,255,255);
	stroke(130);
	rect(-W/2+20,-H/2+20,60,60);
	textSize(45);
	fill(80);
	text("𝒊",-W/2+50,-H/2+50);
}

function drawPoint(x,y){
    point(x*s + d[0],y*s + d[1]);  
}
function drawCircle(r){
    noFill();
    ellipse(d[0],d[1],2*r*s,2*r*s);    
}
function squareGrid(){
    strokeWeight(1);
    stroke(156,156,156,100);
    for (var x=d[0]+s; x<W/2; x+=s){
        line(x,-H/2,x,H/2);
    }
    for (var x=d[0]; x>-W/2; x-=s){
        line(x,-H/2,x,H/2);
    }
    for (var y=d[1]+s; y<H/2; y+=s){
        line(-W/2,y,W/2,y);
    }
    for (var y=d[1]; y>-H/2; y-=s){
        line(-W/2,y,W/2,y);
    }
}
function isoGrid(){
		var trigEqu = [s*cos(30),W*sin(60),d[0]*tan(60),(H+W)/2];
    strokeWeight(1);
    stroke(156,156,156,100);
    for (var y=d[1]; y<H/2; y+=trigEqu[0]){
        line(-W/2,y,W/2,y);
    }
    for (var y=d[1]-trigEqu[0]; y>-H/2; y-=trigEqu[0]){
        line(-W/2,y,W/2,y);
    }
    for (var y=d[1]-2*trigEqu[0]; y>-trigEqu[3]/2-trigEqu[3]*sqrt(2); y-=2*trigEqu[0]){
        line(-W/2,y-trigEqu[1]-trigEqu[2],W/2,y+trigEqu[1]-trigEqu[2]);
        line(-W/2,y+trigEqu[1]+trigEqu[2],W/2,y-trigEqu[1]+trigEqu[2]);
    }
    for (var y=d[1]; y<trigEqu[3]/2+trigEqu[3]*sqrt(2); y+=2*trigEqu[0]){
        line(-W/2,y-trigEqu[1]-trigEqu[2],W/2,y+trigEqu[1]-trigEqu[2]);
        line(-W/2,y+trigEqu[1]+trigEqu[2],W/2,y-trigEqu[1]+trigEqu[2]);
    }
}

function primeFactorisation(n){
	var i = 2;
	var factors = [];
	while (i*i <= n){
		if (n%i){
			i+=1;
		} else {
			n = Math.floor(n/i);
			factors.push(i);
		}
	}
	if (n>1){
		factors.push(n);
	}
	return factors;
}
function prime_factors_powers(factors){
    var new_factors = [];
    var fNum = 0;
    while (fNum < factors.length){
        var current = factors[fNum];
        var n = 0;
        var elem = 0;
        while (elem < factors.length){
            if (factors[elem] === current){
                n += 1;
            }
            elem += 1;
        }
        new_factors.push([current, n]);
        elem = 0;
        while (elem < factors.length){
            if (factors[elem] === current){
                factors.splice(elem,1);
            } else {
                elem += 1;
            }
        }
    }
    return new_factors;
}
function parse_Q_primes_odd_exponent(prime_powers){
  for (var i=0; i<prime_powers.length; i+=1){
      if (((prime_powers[i][0]+1) % gridType)===0){
          if (prime_powers[i][1] % 2){
              return false;
          }
      }
  }
  return true;
}

function initCircles(){
	for (var m=0; c.length<maxM; m+=1){
		if (parse_Q_primes_odd_exponent(prime_factors_powers(primeFactorisation(m)))){
			c.push(m);
		}
	}
	print(c);
}
function drawConcentric(){
    for (var i=0; i<maxM; i+=1){
        drawCircle(sqrt(c[i]));
    }	
}

mouseDragged = function(){
	d[0] += mouseX-pmouseX;
	d[1] += mouseY-pmouseY;
	cursorType = "Grabbing";
}
window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  W = windowWidth;
  H = windowHeight
}

mouseClicked = function(){
	clickConditions(hoverConditions()[1]);
}

// Other functions down here