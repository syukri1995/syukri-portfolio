import * as THREE from "three";
import { GLTF } from "three-stdlib";

const IDLE_CLIP_PATTERNS = [/idle/i, /standing/i, /breath/i];

function findIdleClip(clips: THREE.AnimationClip[]): THREE.AnimationClip | null {
  for (const pattern of IDLE_CLIP_PATTERNS) {
    const match = clips.find((c) => pattern.test(c.name));
    if (match) return match;
  }
  return clips[0] ?? null;
}

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);
  const clips = gltf.animations ?? [];

  let idleAction: THREE.AnimationAction | null = null;

  if (clips.length > 0) {
    const idleClip = findIdleClip(clips);
    if (idleClip) {
      idleAction = mixer.clipAction(idleClip);
      idleAction.setLoop(THREE.LoopRepeat, Infinity);
      idleAction.play();
    }
  }

  function startIntro() {
    if (idleAction) {
      idleAction.reset().fadeIn(0.5).play();
    }
  }

  function hover(_gltf: GLTF, hoverDiv: HTMLDivElement) {
    const waveClip = clips.find((c) => /wave|greet|salute/i.test(c.name));
    let waveAction: THREE.AnimationAction | null = null;
    let isHovering = false;

    if (waveClip) {
      waveAction = mixer.clipAction(waveClip);
      waveAction.setLoop(THREE.LoopOnce, 1);
      waveAction.clampWhenFinished = true;
    }

    const onHoverFace = () => {
      if (waveAction && !isHovering) {
        isHovering = true;
        waveAction.reset().fadeIn(0.3).play();
      }
    };

    const onLeaveFace = () => {
      isHovering = false;
      if (waveAction) waveAction.fadeOut(0.3);
      if (idleAction) idleAction.reset().fadeIn(0.3).play();
    };

    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);

    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

export default setAnimations;
