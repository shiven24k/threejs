// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.position.z = 5;

// const canvas = document.querySelector('canvas');
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize( window.innerWidth, window.innerHeight );
// window.addEventListener('resize', () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;

//   camera.updateProjectionMatrix();
// } ); 
 
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );



// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;
// // controls.autoRotate = true;
// //controls.autoRotateSpeed = 0.5;
// // controls.enableZoom = false;
// controls.dampingFactor = 0.01;

// function animate() {
// 	renderer.render( scene, camera );
//   // cube.rotation.x += 0.01;
//   // cube.rotation.y += 0.01;
//   controls.update();

// }
// renderer.setAnimationLoop( animate );


//geometry
import * as lil from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

let light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(2,2 ,2);
scene.add(light2);



let helper = new THREE.DirectionalLightHelper(light2,2);
scene.add(helper);

let pointLight = new THREE.PointLight(0xffffff, 1, 10, 2);
pointLight.position.set(.3,-1,2);
scene.add(pointLight);

let pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);


let loader = new THREE.TextureLoader();
let color = loader.load('./src/tiles_0125_color_1k.jpg');
let rougnness = loader.load('./src/tiles_0125_roughness_1k.jpg');
let normal = loader.load('./src/tiles_0125_normal_directx_1k.png');
let height = loader.load('./src/tiles_0125_height_1k.png');


const geometry = new THREE.BoxGeometry(3,1.8,2,100,100); // Create a sphere with radius 1 and 32 segments
const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: rougnness, normalMap: normal  }); // Create a standard material with a color and a wireframe
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// lil-gui setup
const gui = new lil.GUI();
//create a light controls
const lightFolder = gui.addFolder('Light');
lightFolder.add(light2.position, 'x', -5, 5).name('Light X');


//directional light controls 
const directionalLightFolder = gui.addFolder('Directional Light');
directionalLightFolder.add(light2, 'intensity', 0, 1).name('Intensity');
directionalLightFolder.add(light2.position, 'x', -5, 5).name('Light X');
directionalLightFolder.add(light2.position, 'y', -5, 5).name('Light Y');
directionalLightFolder.add(light2.position, 'z', -5, 5).name('Light Z');

//point light controls
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 1).name('Intensity');
pointLightFolder.add(pointLight.position, 'x', -5, 5).name('Light X');
pointLightFolder.add(pointLight.position, 'y', -5, 5).name('Light Y');
pointLightFolder.add(pointLight.position, 'z', -5, 5).name('Light Z');


const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1).name('Roughness');
materialFolder.add(material, 'metalness', 0, 1).name('Metalness');
materialFolder.addColor(material, 'color').name('Color');
materialFolder.add(material, 'wireframe').name('Wireframe');

const meshFolder = gui.addFolder('Mesh');
meshFolder.add(sphere.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
meshFolder.add(sphere.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
meshFolder.add(sphere.rotation, 'z', 0, Math.PI * 2).name('Rotation Z');
meshFolder.add(sphere.position, 'x', -5, 5).name('Position X');
meshFolder.add(sphere.position, 'y', -5, 5).name('Position Y');
meshFolder.add(sphere.position, 'z', -5, 5).name('Position Z');


const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// //add a directional light with high density
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 10, 7.5);
// scene.add(directionalLight);

// //create an ambient light to provide a base level of illumination
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// //create a point light to simulate light coming from the front
// const pointLight = new THREE.PointLight(0xffffff, 1,100);
// pointLight.position.set(0, 0, 5);
// scene.add(pointLight);

// //add studio lighting
// const light = new THREE.DirectionalLight(0xffffff,1);
// light.position.set(0, 0, 1);
// scene.add(light);

// //Add all the light helpers for all the lights


// //create a helper for the directional light
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(directionalLightHelper);


// //create a helper for the point light
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
// scene.add(pointLightHelper);




camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate();