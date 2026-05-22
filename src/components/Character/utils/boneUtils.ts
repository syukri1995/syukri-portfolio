import * as THREE from "three";

const HEAD_BONE_NAMES = [
  "mixamorigHead",
  "mixamorig:Head",
  "Head",
  "head",
  "spine006",
  "neck",
  "Neck",
];

export function findHeadBone(root: THREE.Object3D): THREE.Object3D | null {
  for (const name of HEAD_BONE_NAMES) {
    const bone = root.getObjectByName(name);
    if (bone) return bone;
  }

  let found: THREE.Object3D | null = null;
  root.traverse((child) => {
    if (found) return;
    if (child instanceof THREE.Bone && /head/i.test(child.name)) {
      found = child;
    }
  });
  return found;
}

export function findScreenLight(root: THREE.Object3D): THREE.Object3D | null {
  return root.getObjectByName("screenlight") ?? null;
}
