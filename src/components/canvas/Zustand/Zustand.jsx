import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Plane, useAspect, useTexture } from '@react-three/drei'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'
import './materials/layerMaterial'

function Scene({ dof, props }) {
  const scaleN = useAspect(1600, 1000, 1.05)
  const scaleW = useAspect(2200, 1000, 1.05)
  const textures = useTexture(["city.png", "vapor.png", "room.png"])
  const subject = useRef()
  const vaporMouse = useRef()
  const group = useRef()
  const layersRef = useRef([])
  const [movement] = useState(() => new THREE.Vector3())
  const [temp] = useState(() => new THREE.Vector3())
  const [focus] = useState(() => new THREE.Vector3())
  const layers = [
    { texture: textures[0], z: 0, factor: 0.005, scale: scaleW },
    { texture: textures[1], z: 50, ref: vaporMouse, factor: 0.005, scale: scaleW },
    { texture: textures[2], z: 30, ref: subject, scaleFactor: 0.83, wiggle: 0.7, scale: scaleN },
  ]
  const { viewport } = useThree()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    dof.current.target = focus.lerp(subject.current.position, 0.5)
    dof.current.target = focus.lerp(vaporMouse.current.position, 0.05)
    vaporMouse.current.position.x = state.mouse.x * viewport.width / 2
    vaporMouse.current.position.y = state.mouse.y * viewport.height / 2
    subject.current.position.x = Math.sin(t * 2) * 2
    subject.current.position.y = Math.sin(t * 2) * 4
    movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 20, 0.2)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 10, 0.2)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 2, 0.2)
    layersRef.current[2].uniforms.time.value += delta
  }, 1)

  return (
    <group ref={group}>
      {layers.map(({ scale, texture, ref, factor = 0, scaleFactor = 1, wiggle = 0, z }, i) => (
        <Plane scale={scale} args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]} position-z={z} key={i} ref={ref}>
          <layerMaterial movement={movement} textr={texture} factor={factor} ref={(el) => (layersRef.current[i] = el)} wiggle={wiggle} scale={scaleFactor} />
        </Plane>
      ))}
    </group>
  )
}

const Effects = React.forwardRef((props, ref) => {
  const { viewport: { width, height } } = useThree() // prettier-ignore
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField ref={ref} bokehScale={1} focalLength={0.1} width={(width * 5) / 2} height={(height * 5) / 2} />
      <Vignette eskil={false} offset={0.05} darkness={1} />
    </EffectComposer>
  )
})

Effects.displayName = 'Effects';

export default function Zustand() {
  const dof = useRef()
  return (
    <>
      <Suspense fallback={null}>
        <Scene dof={dof} />
      </Suspense>
      <Effects ref={dof} />
    </>
  )
}
