import * as THREE from "three";
import gsap from "gsap";
import { findHeadBone } from "../Character/utils/boneUtils";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  if (!character || window.innerWidth <= 1024) {
    if (character) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      }).to(".what-box-in", { display: "flex", duration: 0.1 }, 0);
    }
    return;
  }

  let intensity = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const modelRefs: { screenLight: THREE.Mesh | null; monitor: THREE.Mesh | null } = {
    screenLight: null,
    monitor: null,
  };

  character.traverse((object) => {
    if (object.name === "Plane004") {
      object.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && !Array.isArray(mesh.material)) {
          mesh.material.transparent = true;
          (mesh.material as THREE.Material).opacity = 0;
          if ((mesh.material as THREE.Material).name === "Material.027") {
            modelRefs.monitor = mesh;
            (mesh.material as THREE.MeshStandardMaterial).color?.set("#FFFFFF");
          }
        }
      });
    }
    if (object.name === "screenlight" && (object as THREE.Mesh).isMesh) {
      const lit = object as THREE.Mesh;
      const mat = lit.material as THREE.MeshStandardMaterial;
      modelRefs.screenLight = lit;
      mat.transparent = true;
      mat.opacity = 0;
      mat.emissive?.set("#0d9488");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(mat, {
        emissiveIntensity: () => intensity * 6,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
    }
  });

  const neckBone =
    character.getObjectByName("spine005") ?? findHeadBone(character);

  tl1
    .fromTo(character.rotation, { y: 0 }, { y: 0.5, duration: 1 }, 0)
    .to(camera.position, { z: 20, y: 6, duration: 1 }, 0)
    .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
    .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
    .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
    .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

  tl2
    .to(camera.position, { z: 40, y: 5, duration: 6, delay: 1, ease: "power3.inOut" }, 0)
    .to(".about-section", { y: "30%", duration: 6 }, 0)
    .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
    .fromTo(
      ".character-model",
      { pointerEvents: "inherit" },
      { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
      0
    )
    .to(character.rotation, { y: 0.4, x: 0.08, delay: 2, duration: 3 }, 0);

  if (neckBone) {
    tl2.to(neckBone.rotation, { x: 0.35, delay: 2, duration: 3 }, 0);
  }

  const { monitor, screenLight } = modelRefs;

  if (monitor?.material && !Array.isArray(monitor.material)) {
    tl2
      .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
      .fromTo(monitor.position, { y: -10, z: 2 }, { y: 0, z: 0, delay: 1.5, duration: 3 }, 0);
  }

  if (screenLight?.material && !Array.isArray(screenLight.material)) {
    tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4 }, 0);
  }

  tl2
    .fromTo(".what-box-in", { display: "none" }, { display: "flex", duration: 0.1, delay: 5 }, 0)
    .fromTo(
      ".character-rim",
      { opacity: 1, scaleX: 1.4 },
      { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
      0.3
    );

  tl3
    .fromTo(".character-model", { y: "0%" }, { y: "-80%", duration: 4, ease: "none", delay: 1 }, 0)
    .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
    .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 50%",
      end: "bottom 30%",
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(".career-timeline", { maxHeight: "0%" }, { maxHeight: "100%", duration: 1, ease: "none" }, 0)
    .fromTo(".career-timeline", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)
    .fromTo(".career-info-box", { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 0.5 }, 0)
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      { animationIterationCount: "1", delay: 0.3, duration: 0.1 },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(".career-section", { y: 0 }, { y: "20%", duration: 0.5, delay: 0.2 }, 0);
  }
}
