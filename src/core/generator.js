var create_frame = function(symbol, level){
    return {
        symbol:symbol,
        level:level
    };
}

class Generator {
    constructor(rules, axiom, target_level) {
        this.rules = rules;
        this.stack = [];
        this.target_level = target_level;

        for(const symbol of axiom.split("")){
            this.stack.push(create_frame(symbol, 0));
        }
    }

    hasNext(){
        return this.stack.length > 0
    }

    step(){
        if(!this.hasNext()){
            return null;
        }

        var frame = this.stack.shift(); //this may also not be efficient at longer
        var is_rule = frame.symbol in this.rules;

        if(!is_rule){
            return frame.symbol;
        }

        if(frame.level === this.target_level){
            return frame.symbol;
        }

        var production = this.rules[frame.symbol];
        var prod_frames = production.split("").map(x=>create_frame(x, frame.level+1));
        this.stack = prod_frames.concat(this.stack); //this may not be efficient
        return null;
    }
}