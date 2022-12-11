import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {useState} from 'react';



export default function Home() {
  const [name, setName] = useState('');
  const [lati, setLati] = useState('');
  const [longi, setLongi] = useState('');


  const handleSubmit = (event : any) => {
      event.preventDefault(); // 👈️ prevent page refresh


      fetch("https://rgb-led-app.herokuapp.com/api/hello", {  // Enter your IP address here

      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({name: name, latitude: lati, longitude:longi})


    })

    setName("");
    setLati("");
    setLongi("");


    };

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          RGB Weather Cube
        </h1>

        <p className={styles.description}>
          Get started by telling us the location you want to get your weather from.
        </p>



        <div>

   <form onSubmit={handleSubmit}>
     <input
       id="first_name"
       name="first_name"
       type="text"
       onChange={event => setName(event.target.value)}
       value={name}
     />

     <input
       id="latitude"
       name="latitude"
       type="text"
       pattern="^-?[0-9]\d*(\.\d+)?$"
       onChange={event => setLati(event.target.value)}
       value={lati}
     />

     <input
       id="longitude"
       name="longitude"
       type="text"
       pattern="^-?[0-9]\d*(\.\d+)?$"
       onChange={event => setLongi(event.target.value)}
       value={longi}
     />


     <button type="submit">Submit form</button>
   </form>
 </div>

      </main>

    </div>
  )
}
