class ThreeJsDisplay{
    constructor(THREE, OrbitControls, domElement) {
        this.THREE = THREE
        this.initialize(domElement, THREE, OrbitControls)
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
        const points = [];
        points.push( new THREE.Vector3( - 10, 0, 0 ) );
        points.push( new THREE.Vector3( 0, -10, 0 ) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );

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