
// Declare VAR'S up here
var s;
var gridType;
var maxM;
var c;

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
	initCircles();
  W = window.innerWidth;
	H = window.innerHeight;
  canvas = createCanvas(W, H);
}


function draw() {
	// draw in here
	translate(W/2,H/2);
	background(250,250,250);
	if (gridType===3){
	    isoGrid();    
	} else if (gridType===4) {
	    squareGrid();
	}

	stroke(154, 166, 214);
	strokeWeight(6);
	drawPoint(0,0);
	
	strokeWeight(2);
	drawConcentric();
}



function drawPoint(x,y){
    point(x*s,y*s);  
};
function drawCircle(r){
    noFill();
    ellipse(0,0,2*r*s,2*r*s);    
};
function squareGrid(){
    strokeWeight(1);
    stroke(156,156,156,100);
    for (var x=s; x<W/2; x+=s){
        line(x,-H/2,x,H/2);
    }
    for (var x=0; x>-W/2; x-=s){
        line(x,-H/2,x,H/2);
    }
    for (var y=s; y<H/2; y+=s){
        line(-W/2,y,W/2,y);
    }
    for (var y=0; y>-H/2; y-=s){
        line(-W/2,y,W/2,y);
    }
};
function isoGrid(){
    strokeWeight(1);
    stroke(156,156,156,100);
    for (var y=0; y<H/2; y+=s*cos(30)){
        line(-W/2,y,W/2,y);
    }
    for (var y=0; y>-H/2; y-=s*cos(30)){
        line(-W/2,y,W/2,y);
    }
    for (var y=0; y>-(H+W)/4-(H+W)/2*sqrt(2); y-=(s*2)*cos(30)){
        line(-W/2,y-W*sin(60),W/2,y+W*sin(60));
        line(-W/2,y+W*sin(60),W/2,y-W*sin(60));
    }
    for (var y=0; y<(H+W)/4+(H+W)/2*sqrt(2); y+=(s*2)*cos(30)){
        line(-W/2,y-W*sin(60),W/2,y+W*sin(60));
        line(-W/2,y+W*sin(60),W/2,y-W*sin(60));
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
};


window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  W = windowWidth;
  H = windowHeight
};

mouseClicked = function(){
	alert(c);
}

// Other functions down here