import * as THREE from "three";

/** Scale and position a GLB so it fills the landing viewport like the original portfolio rig. */
export function fitCharacterToScene(
  root: THREE.Object3D,
  targetHeight = 14
): void {
  root.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());

  if (size.y < 0.001) return;

  const scale = targetHeight / size.y;
  root.scale.setScalar(scale);

  root.updateMatrixWorld(true);
  const fitted = new THREE.Box3().setFromObject(root);
  const center = fitted.getCenter(new THREE.Vector3());

  root.position.x = -center.x;
  root.position.z = -center.z;
  root.position.y = -fitted.min.y;
}
