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
THREEx.WindowResize(this.renderer, this.camera);
