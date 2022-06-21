class CurveStorage{

    constructor() {
        this.curves = {}
    }

    addCurve(name, display, rules, axiom, depth, angle, step, forwardXY){
        this.curves[name] = {
            display:display,
            rules:rules,
            axiom:axiom,
            depth:depth,
            step:step,
            angle:angle,
            forwardXY:forwardXY,
            turnXYcw:"-",
            turnXYccw:"+",
            turnXZcw:"<",
            turnXZccw:">",
            push: '[',
            pop: ']'
        }
    }

    getCurve(name){
        return this.curves[name]
    }

    getCurveNames(){
        return Object.keys(this.curves)
    }
}

