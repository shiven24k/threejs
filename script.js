// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// const canvas = document.querySelector("#draw");
// const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize( window.innerWidth, window.innerHeight );


// function animate() {
//     window.requestAnimationFrame( animate );
// 	renderer.render( scene, camera );
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

// }
// animate();


//scene
let scene = new THREE.Scene();
//camera
let camera = new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight,0.1,100);
camera.position.z = 5;
scene.add(camera);
//mesh
//add antilias to make the edges smooth
let box = new THREE.BoxGeometry(3,1.8,2);
let material = new THREE.MeshBasicMaterial({color:0x00ff00});
let mesh = new THREE.Mesh(box,material);
scene.add(mesh);

//rotation
//Math.PI = 3.14159265358979323846 to rotate 180 degrees
//Math.PI / 4 = 45 degrees
// mesh.rotation.y = Math.PI/4;
// mesh.rotation.x = Math.PI/4;

//
//renderer
const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({canvas : canvas, antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);


//animation
let clock = new THREE.Clock();
//use Clock to set the animation same on all deveices
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    mesh.rotation.x = clock.getElapsedTime();
    mesh.rotation.y = clock.getElapsedTime();
    mesh.rotation.z = clock.getElapsedTime();
    
}
animate();
//requestAnimationFrame

