import * as THREE from "three";
import { GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { fitCharacterToScene } from "./fitModel";

const MODEL_PATH = "/models/character.glb";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        MODEL_PATH,
        async (gltf) => {
          const character = gltf.scene;
          fitCharacterToScene(character, 14);

          await renderer.compileAsync(character, camera, scene);
          character.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = false;
              mesh.receiveShadow = false;
              mesh.frustumCulled = true;
            }
          });

          setCharTimeline(character, camera);
          setAllTimeline();
          resolve(gltf);
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
