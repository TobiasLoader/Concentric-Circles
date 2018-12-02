
// Declare VAR'S up here
var s;
var gridType;
var maxM;

function setup() {
	angleMode(DEGREES);
	s = int(prompt("Number of pixels in 1 unit of length (eg: 50): "));
	if (isNaN(s)){
		s = 50;
	}
	gridType = int(prompt("The grid type (3:isometric, 4:square): "));
	maxM = int(prompt("Number of concentric circles: "));
	if (isNaN(maxM)){
		maxM = 10
	}
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
	} else {
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
};
function drawConcentric(){
    if (gridType===3){
        for (var i=0; i<maxM; i+=1){
            drawCircle(sqrt(i));
/*
            drawCircle(sqrt(4*i+1));
            drawCircle(sqrt(4*i-1));
*/
        }
    } else {
        for (var i=0; i<maxM; i+=1){
            drawCircle(sqrt(i));
/*
            drawCircle(sqrt(4*i+1));
            drawCircle(sqrt(4*i-1));
*/
        }
    }
};


window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
  W = windowWidth;
  H = windowHeight
};

/*
mouseClicked = function(){
	if (gridType === 4){
		gridType = 3;
	} else {
		gridType = 4;
	}
}
*/

// Other functions down here