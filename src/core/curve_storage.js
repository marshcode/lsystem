class CurveStorage{

    constructor() {
        this.curves = {}
    }

    addCurve(name, display){
        this.curves[name] = {
            display:display
        }
    }

    getCurve(name){
        return this.curves[name]
    }

    getCurveNames(){
        return Object.keys(this.curves)
    }
}

