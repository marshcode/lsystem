class ThreeJsDisplay{
    constructor(THREE, OrbitControls, domElement) {
        this.turtles = [new Turtle()]
        this.lines = []
        this.line_vtx_idx = 0;

        this.THREE = THREE
        this.initialize(domElement, THREE, OrbitControls)

        this.createLine();
        this.renderTurtle(this.getTurtle())
    }

    getTurtle(){
        return this.turtles[this.turtles.length-1]
    }

    createLine(){
        const material = new this.THREE.LineBasicMaterial({color: 0xffffff});
        const geometry = new this.THREE.BufferGeometry();
        const positions = new Float32Array( 200 * 3 ); // 3 vertices per point
        geometry.setAttribute( 'position', new this.THREE.BufferAttribute( positions, 3 ) );

        const line = new this.THREE.Line( geometry, material );
        geometry.setDrawRange(0, 0)
        this.scene.add(line)
        this.lines.push(line)
        this.line_vtx_idx = 0;
    }

    renderTurtle(turtle){

        const line =  this.lines[this.lines.length-1]

        //TODO - check index and see if we need to create a new line
        const positions = line.geometry.attributes.position.array;
        positions[this.line_vtx_idx++] = turtle.x;
        positions[this.line_vtx_idx++] = turtle.y;
        positions[this.line_vtx_idx++] = turtle.z;

        var count = line.geometry.drawRange.count

        line.geometry.setDrawRange(0, count+1);
        line.geometry.attributes.position.needsUpdate = true;
        line.geometry.computeBoundingBox();
        line.geometry.computeBoundingSphere();
        this.update();
    }

    forwardXY(by){
        const turtle = this.getTurtle();
        turtle.forwardXY(by);
        this.renderTurtle(turtle)

    }

    turnXY(angle){
        const turtle = this.getTurtle();
        turtle.turnAngleXY(angle)
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
    }

    update(){
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }


}