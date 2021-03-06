import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Canvas } from 'react-three-fiber'
import Box from './components/Box/Box'



function App() {
  var [flip, setFlip]=useState(0);
  const handleStart=((ev)=>{    
    ev.preventDefault();    
    let rand = 1 + Math.random() * (9);
     setFlip(Math.floor(rand));
     })

  return (
    <> 
    <center>
      <div className='col-6 shadow-lg box m-5' >
        <center>
        <div className='col-8 m-5 box'>        
        <div>
          <Canvas  style={{ width:'100%', height:'100%' }}camera={{ position: [-1, 0.5, 2.5], fov: 90 }}
              >            
              <pointLight position={[-20, -20, 50]} />            
              <spotLight position={[-2, 10, 0]} />
              <Box  position={[0, 0, 1]} fliping={flip} />
        </Canvas> 
        
        <button className="bton m-5 shadow" onClick={handleStart}>Бросить монету</button>
        </div>
          </div>
          </center>
          </div>
          </center>
    </>
  );
}

export default App
