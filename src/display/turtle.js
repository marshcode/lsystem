function toRadians (angle) {
    return angle * (Math.PI / 180);
}

class Turtle{

    constructor(x=0, y=0, z=0, angleXY=0) {
        this.x=x;
        this.y=y;
        this.z=z;
        this.angleXY = angleXY;
    }

    turnAngleXY(angle){
        this.angleXY = (this.angleXY + angle) % 360;
    }

    forwardXY(by){
        // effectively translate the coordinate system origin to the reference point by only using
        // the 'by' as the polar radius.  This creates offsets that we apply to the original points.
        // otherwise, changes in orientation swing us wildly from quadrant to quadrant

        const c_angle = toRadians(this.angleXY)
        this.x += by * Math.cos(c_angle)
        this.y += by * Math.sin(c_angle)
    }

}