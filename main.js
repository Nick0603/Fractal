let firstLayer = 1;
var mirrorY = 1080*0.9;
var startX = 100;
var endX = 1920-100;
var startY = mirrorY;
var endY = mirrorY;

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(startX,startY);

function getMirrorY(y,mirrorY){
    return startY - (y- startY);
}

function moveAndDrawLine(pos,isDrawMirror){
    if(isDrawMirror){
        ctx.lineTo(pos.x, getMirrorY(pos.y , mirrorY) );
    }else{
        ctx.lineTo(pos.x,            pos.y );
    }
    ctx.stroke();
}


function draw(x1,y1,x2,y2,layer,finalLayer,sideShapeN){
    if(layer > finalLayer)return;

    var len = Math.sqrt( (x2-x1)**2 + (y2-y1)**2 )/3;
    var initAngle = Math.atan2(y2-y1,x2-x1);;
    var tempAngle = Math.PI + initAngle;
    var angleStop = Math.PI*2/sideShapeN;

    var directionSaves = [];
    directionSaves.push( initAngle );
    for(var i=0 ; i<sideShapeN-1 ; i++){
        tempAngle -= angleStop;
        directionSaves.push(tempAngle);
    }
    directionSaves.push( initAngle );

    var posSaves = [{x:x1,y:y1}];
    directionSaves.forEach(function( direction ){
        var lastPos = posSaves[posSaves.length-1];
        var newPos = {
            x: lastPos.x + len * Math.cos(direction),
            y: lastPos.y + len * Math.sin(direction)
        }
        posSaves.push(newPos);
        draw(lastPos.x,lastPos.y,newPos.x,newPos.y,layer+1,finalLayer,sideShapeN);
        moveAndDrawLine(newPos,true);
    });

}


swal.setDefaults({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    animation: false,
    progressSteps: ['1', '2']
})
  
var steps = [
    '輸入多邊形的邊數 ( 建議六以內 )',
    '輸入繪製的層數   ( 建議四以內 )',
]
  
swal.queue(steps).then(function (result) {
        swal.resetDefaults()
        var sideShapeN = parseInt(result[0]);
        var finalLayer = parseInt(result[1]);
        draw(startX,startY,endX,endY,firstLayer,finalLayer,sideShapeN);
    }, function () {
        swal.resetDefaults()
    }
);


