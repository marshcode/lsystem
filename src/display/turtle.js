// shamelessly stolen from https://openhome.cc/eGossip/OpenSCAD/3DTurtleGraphics.html

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

X = 0
Y = 1
Z = 2

var ptPlus = function (p1, p2){
    return [p1[X] + p2[X], p1[Y] + p2[Y], p1[Z] + p2[Z] ]
}

var mult = function (p1, n){
    return [p1[X] * n, p1[Y]*n, p1[Z] *n]
}

var neg = function(pt){
    return mult(pt, -1)
}

class Turtle {
    constructor() {
        this.point = [0,0,0]
        this.axes = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1] 
        ]
    }

    clone(){
        const turtle =  new Turtle();
        turtle.point = this.point;
        turtle.axes = this.axes;
        return turtle;
    }

    peekX(by){
        const vec = this.axes[X];
        return ptPlus(this.point, mult(vec, by))
    }

    moveX(by){
        this.point = this.peekX(by)
    }
    
    turnX(angleDeg){
        const angleRad = toRadians(angleDeg);
        this.axes = [
            this.axes[X],
            ptPlus(mult(this.axes[Y], Math.cos(angleRad)), mult(this.axes[Z], Math.sin(angleRad))),
            ptPlus(mult(neg(this.axes[Y]), Math.sin(angleRad)), mult(this.axes[Z], Math.cos(angleRad)))
        ]
    }

    turnY(angleDeg) {
        const angleRad = toRadians(angleDeg);
        this.axes = [
            ptPlus(mult(this.axes[X], Math.cos(angleRad)), mult(neg(this.axes[Z]), Math.sin(angleRad))),
            this.axes[Y],
            ptPlus(mult(this.axes[X], Math.sin(angleRad)), mult(this.axes[Z], Math.cos(angleRad)))
        ]
    }

    turnZ(angleDeg){
        const angleRad = toRadians(angleDeg);
        this.axes = [
            ptPlus(mult(this.axes[X], Math.cos(angleRad)), mult(this.axes[Y], Math.sin(angleRad))),
            ptPlus(mult(neg(this.axes[X]), Math.sin(angleRad)), mult(this.axes[Y], Math.cos(angleRad))),
            this.axes[Z]
        ]
    }
}








