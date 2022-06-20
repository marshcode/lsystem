class CurveInterface{

    constructor(
        domAxiom,
        domRules,
        domAngle,
        domDepth,
        domStep,
        domForwardXY,
        domTurnXYcw,
        domTurnXYccw,
    ) {
        this.domAxiom = domAxiom;
        this.domRules = domRules;
        this.domAngle = domAngle
        this.domDepth = domDepth;
        this.domStep = domStep;
        this.domForwardXY = domForwardXY
        this.domTurnXYcw = domTurnXYcw
        this.domTurnXYccw = domTurnXYccw
    }

    populate(curve_info){
        this.domAxiom.value = curve_info.axiom;
        this.domRules.value = Object.keys(curve_info.rules).map(key=>
            key+":"+curve_info.rules[key]
        )
        this.domAngle.value = curve_info.angle;
        this.domDepth.value = curve_info.depth;
        this.domStep.value = curve_info.step;
        this.domForwardXY.value = curve_info.forwardXY;
        this.domTurnXYcw.value = curve_info.turnXYcw;
        this.domTurnXYccw.value = curve_info.turnXYccw;
    }


    getInfo(){

        const rules = {}
        const ruleText = this.domRules.value;
        const ruleLines = ruleText.split('\n');
        ruleLines.forEach(line=>{
            const keyRule = line.split(":")
            rules[keyRule[0]] = keyRule[1]
        })

        return {
            rules: rules,
            axiom: this.domAxiom.value,
            angle: Number(this.domAngle.value),
            depth: Number(this.domDepth.value),
            step: Number(this.domStep.value),
            forwardXY: this.domForwardXY.value,
            turnXYcw: this.domTurnXYcw.value,
            turnXYccw: this.domTurnXYccw.value
        }
    }
}