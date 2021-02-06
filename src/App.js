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
    <div className="col-6 shadow header-box shadow-lg m-4"> <b> F L I P  C O I N</b></div>
      <div className='col-6 shadow-lg shadow box m-5' >
        
        <div className='col-8 box'>
             <div className="container">  
                <Canvas   style={{ width:'300px', height:'300px' }}camera={{ position: [-1, 0.5, 2.5], fov: 90 }}>            
                  <pointLight position={[-20, -20, 50]} />            
                  <spotLight position={[-2, 10, 0]} />
                
                <Box position={[0, 0, 1]} fliping={flip} />
              </Canvas> 
        <button className="bton shadow  m-5 shadow-lg" onClick={handleStart}>Бросить монету</button>
          </div>
          </div>
          </div>
          <div className="col-6 shadow footer-box shadow-lg m-4 p-2"><b> Copyright Mijgona Azizzoda</b></div>
          </center>
    </>
  );
}

export default App
