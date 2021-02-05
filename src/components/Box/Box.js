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
  const mesh = useRef()  
  const [side, setSide]=useState(true);//устанавливаем сторону N

  useEffect(() => {
      if(startFlip){//если первый поворот
        setStop(false)
      }
      if(fliping!==wasFlip){setStop(false)}
  },[fliping])


    useFrame(() => { 
      if (fliping>=wasFlip&&fliping!==0){//Повороты не законченны
        var f//промежуточное значение
        if(stop!==true){// если не оставноленно врашение
          mesh.current.rotation.x=mesh.current.rotation.x+0.09;
        }
          if(mesh.current.rotation.x>(2*Math.PI)){//поворот на 360
                mesh.current.rotation.x=0;            
                f=wasFlip+1
                setFlip(f)//добавляем поворот
                setSide(true)//выбироем сторону
                setStart(false)  //Не первый запуск
          }
          if(mesh.current.rotation.x>Math.PI&&mesh.current.rotation.x<3.16){//поворот на 180
            f=wasFlip+1
            setFlip(f)//добавляем поворот
            setSide(false)//выбироем сторону
            setStart(false) //Не первый запуск 
          }          
      } else {//Повороты закончились
        if (side){ //сторона n
          if (!(mesh.current.rotation.x>=1.5&&mesh.current.rotation.x<1.7)) { //поворачивать до стороны n
            mesh.current.rotation.x+=0.05;
          }else{//если дошли до стороны N
            if (startFlip){//не первй запуск
            mesh.current.rotation.x=1.5//остановить анимацию
          }else{//при первом запуске
            setStop(true)//остановить анимацию
            setFlip(0)//обнуляем повороты
            mesh.current.rotation.x=1.5 //остановить анимацию
            window.alert("Вам попалась сторона N")            
          }
          }
        }else{//сторона y
          if (!(mesh.current.rotation.x>=4.4&&mesh.current.rotation.x<4.6)) { //поворачивать до стороны y
            mesh.current.rotation.x=mesh.current.rotation.x+0.05;
          }else{
            if (startFlip){
            mesh.current.rotation.x=4.6
          }else{
            setStop(true)
            setFlip(0)
            mesh.current.rotation.x=4.6
            window.alert("Вам попалась сторона Y")             
          }
          }
        }
      }
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