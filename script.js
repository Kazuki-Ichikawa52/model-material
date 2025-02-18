import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import { GLTFLoader } from "./loaders/GLTFLoader.js";

// ** シーンの作成 **
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// ** カメラ **
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(3, 3, 3);
scene.add(camera);

// ** 光源 **
const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true; // 影を落とす
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
pointLight.shadow.radius = 10; // 影を柔らかく
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xdcdcdc, 0.6);
scene.add(ambientLight);

// ** レンダラー **
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// ** カメラコントロール（マウス操作）**
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ** モデルをロード（グローバル変数に rock を用意）**
let rock;
const loader = new GLTFLoader();
loader.setPath("./models/");
loader.load("boulder_01.gltf", (gltf) => {
  rock = gltf.scene;
  scene.add(rock);

  rock.scale.set(2, 2, 2);
  rock.position.set(0, 0, 0);
  rock.castShadow = true;
  renderer.render(scene, camera);
});

// ** アニメーションループ**
function animate() {
  requestAnimationFrame(animate);

  if (rock) {
    rock.rotation.y += 0.001;
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();
