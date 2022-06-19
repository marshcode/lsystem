var run_generator = function(generator){

    var final = [];
    while(generator.hasNext()){
        let next = generator.step();
        if(next){
            final.push(next);
        }
    }
    return final.join("")
}