var material, mesh;

var engine = {
  scene: null,
  camera: null,
  cameraTarget: null,
  renderer: null,
  container: null,
  controls: null,
  clock: null,
  stats: null,

  init: function() { // Initialization

    // create main scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

    var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight;

    // prepare camera
    var VIEW_ANGLE = 20, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 15;
    this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set( 3, 0.15, 3 );
    this.cameraTarget = new THREE.Vector3( 0, -0.25, 0 );
    this.camera.lookAt( this.cameraTarget );
   
   
    // prepare renderer
    this.renderer = new THREE.WebGLRenderer({ antialias:true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor( this.scene.fog.color );
    this.renderer.setPixelRatio( window.devicePixelRatio ); 
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapCullFace = THREE.CullFaceBack;   

    // prepare container
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);

    // events
    THREEx.WindowResize(this.renderer, this.camera);

    // prepare controls (OrbitControls)
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.addEventListener( 'change', render );
    // this.controls.maxDistance = 3000;

    // prepare clock
    this.clock = new THREE.Clock();

    // prepare stats
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.container.appendChild( this.stats.domElement );

    this.scene.add( new THREE.AmbientLight(0x777777) );
    addShadowedLight( 1, 1, 1, 0xff0000, 1 );
    addShadowedLight( 1, 1, -1, 0xffff00, 1 );
    addShadowedLight( -1, 1, -1, 0x00ff00, 1 );
    addShadowedLight( -1, 1, 1, 0x0000ff, 1 );



    // // light
    // var dirLight = new THREE.DirectionalLight(0xffffff);
    // dirLight.position.set(200, 200, 1000).normalize();
    // this.camera.add(dirLight);
    // this.camera.add(dirLight.target);

    // add simple ground
    var plane = new THREE.PlaneBufferGeometry( 40, 40 );
    ground = new THREE.Mesh(plane, 
      new THREE.MeshPhongMaterial({color:0x999999,specular:0x101010 }));
    ground.position.y = -0.5;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);


    // load models
    this.loadModels();
  },

  loadModels: function() {

   // prepare STL loader and load the model
   var oStlLoader = new THREE.STLLoader();
   oStlLoader.load('stl/CBR1000RR.stl', function(geometry) {
     
     material = new THREE.MeshPhongMaterial({
      color:0x000000,specular:0x111111,shininess:200 });
     mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0 , 0 , 0  );
    mesh.rotation.set( 0, 0, 0);
    mesh.scale.set( 0.001, 0.001, 0.001 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    engine.scene.add(mesh);

   });

  }
};

// Animate the scene
function animate() {
  requestAnimationFrame(animate);

  // mesh.rotation.z += 0.025;
  mesh.rotation.y += 0.025;
  // mesh.rotation.x += 0.025;

  render();
  update();
}

function animate_auto() {
  requestAnimationFrame(animate);
  render();
  // rotate();
}



//Auto Rotate the sce25e
function rotate() {
  // mesh.rotation.z += 0.01;
  // mesh.rotation.z += 0.01;
}

// Update controls and stats
function update() {
  engine.controls.update();
  engine.stats.update();
}

// Render the scene
function render() {
  if (engine.renderer) {
    engine.renderer.render(engine.scene, engine.camera);
  }
}

// Initialize Engine on page load
function initializeEngine() {
   engine.init();
   animate(); 
}

// Orbit Controls Engine on event listener
function finalizeEngine() {
  engine.init();
  animate();
}


//addshadowed Light
function addShadowedLight( x, y, z, color, intensity ) {

   var directionalLight = new THREE.DirectionalLight( color, intensity );
   directionalLight.position.set( x, y, z )
   engine.scene.add( directionalLight );

   directionalLight.castShadow = true;
   // directionalLight.shadowCameraVisible = true;

   var d = 1;
   directionalLight.shadowCameraLeft = -d;
   directionalLight.shadowCameraRight = d;
   directionalLight.shadowCameraTop = d;
   directionalLight.shadowCameraBottom = -d;

   directionalLight.shadowCameraNear = 1;
   directionalLight.shadowCameraFar = 4;

   directionalLight.shadowMapWidth = 1024;
   directionalLight.shadowMapHeight = 1024;

   directionalLight.shadowBias = -0.005;
   directionalLight.shadowDarkness = 0.15;
}


if (window.addEventListener)
  window.addEventListener('load', initializeEngine, false);
else if (window.attachEvent)
  window.attachEvent('onload', initializeEngine);
else window.onload = initializeEngine;

