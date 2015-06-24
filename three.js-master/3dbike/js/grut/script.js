var engine = {
   scene: null,
   camera: null,
   renderer: null,
   container: null,
   controls: null,
   clock: null,
   stats: null,

   init: function() { 
   }
};

// Animate the scene
function animate() {
   requestAnimationFrame(animate);
   render();
   update();
}

// Update controls and stats
function update() {
   engine.controls.update(engine.clock.getDelta());
   engine.stats.update();
}

// Render the scene
function render() {
   if (engine.renderer) {
       engine.renderer.render(engine.scene, engine.camera);
   }
}

// Initialize lesson on page load
function initializeEngine() {
   engine.init();
   animate();
}

if (window.addEventListener)
   window.addEventListener('load', initializeLesson, false);
else if (window.attachEvent)
   window.attachEvent('onload', initializeLesson);
else window.onload = initializeLesson;



// create main scene
this.scene = new THREE.Scene();
this.scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;

// prepare camera
var VIEW_ANGLE = 35, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 15;
this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
this.scene.add(this.camera);
this.camera.position.set(-1000, 1000, 0);
this.camera.lookAt(new THREE.Vector3(0,0,0));

// prepare renderer
this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: false});
this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
this.renderer.setClearColor(0xffffff);

this.renderer.shadowMapEnabled = true;
this.renderer.shadowMapSoft = true;

// prepare container
this.container = document.createElement('div');
document.body.appendChild(this.container);
this.container.appendChild(this.renderer.domElement);

// events
// THREEx.WindowResize(this.renderer, this.camera);


// prepare controls (OrbitControls)
this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
this.controls.target = new THREE.Vector3(0, 0, 0);

// prepare clock
this.clock = new THREE.Clock();

// prepare stats
this.stats = new Stats();
this.stats.domElement.style.position = 'absolute';
this.stats.domElement.style.bottom = '0px';
this.stats.domElement.style.zIndex = 10;
this.container.appendChild( this.stats.domElement );


// add directional light
var dLight = new THREE.DirectionalLight(0xffffff);
dLight.position.set(1, 1000, 1);
dLight.castShadow = true;
dLight.shadowCameraVisible = true;
dLight.shadowDarkness = 0.2;
dLight.shadowMapWidth = dLight.shadowMapHeight = 1000;
this.scene.add(dLight);

// add particle of light
particleLight = new THREE.Mesh( new THREE.SphereGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x44ff44 }));
particleLight.position = dLight.position;
this.scene.add(particleLight);

// add simple ground
var groundGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
ground = new THREE.Mesh(groundGeometry, new THREE.MeshLambertMaterial({
    color: this.getRandColor()
}));
ground.position.y = 0;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
this.scene.add(ground);

// prepare STL loader and load the model
var oStlLoader = new THREE.STLLoader();
oStlLoader.load('models/piano.stl', function(geometry) {

  var material = new THREE.MeshNormalMaterial();
  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set( - Math.PI / 2, 0, Math.PI / 2);
  mesh.position.set(-10, 0, 10);
  mesh.scale.set(2, 2, 2);
  lesson7.scene.add(mesh);
});
