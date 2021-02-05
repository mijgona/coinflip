import React, { useRef, useState, useMemo, useEffect } from 'react'
import {  useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import yside from './assets/y-side.png'
import nside from './assets/n-side.png'

function Box(props) {
  const {fliping}=props;//Считываем случайное число
  const [stop,setStop]=useState(true);
  const [startFlip,setStart]=useState(true);
  const [wasFlip, setFlip]=useState(0);//По умолчанию выбираем один поворот   
  const [side, setSide]=useState(true);//устанавливаем сторону N
  
  const mesh = useRef() 

  useEffect(() => {
      if(startFlip){//если первый поворот
        setStop(false)
      }
      if(fliping!==wasFlip){setStop(false)}
  },[fliping])


    useFrame(() => { 
      mesh.current.rotation.x+=0.05
    });        
  const textureNside=useMemo(()=> new THREE.TextureLoader().load(nside),[]);
  const textureYside=useMemo(()=> new THREE.TextureLoader().load(yside),[]);
  
  return (
    <>
    <mesh
    {...props}
    ref={mesh}>
    <cylinderBufferGeometry args={[1,1,0.15,100,true]}
     receiveShadow>
        </cylinderBufferGeometry>
    <meshPhongMaterial color="#CE9E1E" attachArray="material">
    </meshPhongMaterial>
    <meshToonMaterial color="#CE9E1E" attachArray="material" transparent>
            <primitive attach="map" object={textureNside} />
    </meshToonMaterial>
    <meshToonMaterial color="#CE9E1E" attachArray="material" transparent>
            <primitive attach="map" object={textureYside} />
    </meshToonMaterial>
  </mesh>      
    </>
  )
}

export default Box