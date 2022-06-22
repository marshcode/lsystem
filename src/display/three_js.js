class ThreeJsDisplay{
    constructor(THREE, domElement) {
        this.turtles = []
        this.turtle = new Turtle();
        this.lines = []
        this.line_vtx_idx = 0;
        this.color = 0xffffff;

        this.THREE = THREE
        this.initialize(domElement, THREE)

        this.createLine();
        this.renderTurtle(this.getTurtle())
    }

    setColor(color){
        this.color = color;
        this.createLine(color);
        this.renderTurtle(this.getTurtle());
    }

    pushTurtle(){
        this.turtles.push(this.getTurtle().clone());
    }

    popTurtle(){
        this.turtle = this.turtles.pop();
        this.createLine();
        this.renderTurtle(this.getTurtle())
    }

    getTurtle(){
        return this.turtle
    }

    clear(){
        this.lines = [];
        this.line_vtx_idx = 0;
        this.turtles = []
        this.turtle = new Turtle();

        this.scene.clear();
        this.createLine();
        this.draw_turtle()
        this.renderTurtle(this.getTurtle())
        this.draw_helpers()


    }

    createLine(){
        const material = new this.THREE.LineBasicMaterial({color: this.color});
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
        positions[this.line_vtx_idx++] = turtle.point[0];
        positions[this.line_vtx_idx++] = turtle.point[1];
        positions[this.line_vtx_idx++] = turtle.point[2];

        var count = line.geometry.drawRange.count

        line.geometry.setDrawRange(0, count+1);
        line.geometry.attributes.position.needsUpdate = true;
        line.geometry.computeBoundingBox();
        line.geometry.computeBoundingSphere();

        this.turtle_mesh.position.x = this.turtle.point[0]
        this.turtle_mesh.position.y = this.turtle.point[1]
        this.turtle_mesh.position.z = this.turtle.point[2]

        this.update();
    }

    forwardXY(by){
        const turtle = this.getTurtle();
        turtle.moveX(by);
        this.renderTurtle(turtle)
    }

    turnXY(angle){
        const turtle = this.getTurtle();
        turtle.turnZ(angle)
        this.rotate_turtle();
    }

    turnXZ(angle){
        const turtle = this.getTurtle();
        turtle.turnY(angle)
        this.rotate_turtle()
    }

    initialize(domElement, THREE){
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );

        const camera = new THREE.PerspectiveCamera( 45, domElement.offsetWidth / domElement.offsetHeight, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        const scene = new THREE.Scene();

        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera

        this.draw_helpers()
        this.draw_turtle()
    }

    draw_helpers(){
        const geometry = new this.THREE.SphereGeometry( 1, 32, 16 );
        const material = new this.THREE.MeshBasicMaterial( { color: 0x00ffff } );
        const sphere = new this.THREE.Mesh( geometry, material );
        this.rotation_point = sphere;
        this.scene.add( sphere );

        const axesHelper = new this.THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
    }

    rotate_turtle(){
        const point = this.turtle.peekX(1)
        this.turtle_mesh.lookAt(point[0], point[1], point[2])
    }

    draw_turtle(){
        const geometry = new this.THREE.ConeGeometry( 1, 3, 32  );
        const material = new this.THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const turtle_mesh = new this.THREE.Mesh( geometry, material );
        this.turtle_mesh = turtle_mesh;
        this.turtle_mesh.geometry.rotateX(Math.PI * 0.5);
        this.rotate_turtle()

        this.scene.add( turtle_mesh );
    }

    setRotationCenter(x,y,z){
        this.rotation_point.position.x = x
        this.rotation_point.position.y = y
        this.rotation_point.position.z = z
    }

    update(){


        this.renderer.render( this.scene, this.camera );
    }


}