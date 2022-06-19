class ThreeJsDisplay{
    constructor(THREE, OrbitControls, domElement) {
        this.turtles = [new Turtle()]
        this.THREE = THREE
        this.initialize(domElement, THREE, OrbitControls)
    }

    getTurtle(){
        return this.turtles[this.turtles.length-1]
    }

    vector3FromTurtle(turtle){
        return new this.THREE.Vector3(
            turtle.x,
            turtle.y,
            turtle.z
        )
    }

    initialize(domElement, THREE, OrbitControls){
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
        domElement.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera( 45, domElement.offsetWidth / domElement.offsetHeight, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        const scene = new THREE.Scene();

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0.5, 0 );
        controls.update();
        controls.enablePan = true;
        controls.enableDamping = true;

        this.renderer = renderer;
        this.scene = scene;
        this.controls = controls;
        this.camera = camera

        /////////TEMPORARY///////////////
        const turtle = this.getTurtle()
        const points = [];
        points.push( this.vector3FromTurtle(turtle) );

        turtle.forwardXY(10)
        points.push( this.vector3FromTurtle(turtle) );

        turtle.turnAngleXY(45)
        turtle.forwardXY(10)
        points.push( this.vector3FromTurtle(turtle) );

        const material = new THREE.LineBasicMaterial({color: 0xffffff});
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        this.scene.add(line)

    }

    update(){
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }


}