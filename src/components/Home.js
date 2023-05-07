import React,{useEffect, useState} from 'react'

import app from '../credenciales'
import {getFirestore,collection, addDoc, getDocs, doc, deleteDoc, getDoc} from 'firebase/firestore'

const db = getFirestore(app) //inicializa la base de datos

const Home = () => {

  const persona = { //objeto persona para guardar los datos 
    nombre: '',
    apellido: '',
    correo: '',
    telefono: ''
  }

  const [user, setUser] = useState(persona) //guarda los datos del objeto persona
  const [lista, setLista] = useState([]) //guarda los datos del objeto persona en una lista


  // -------- captura los datos del formulario y los guarda en el objeto persona ------------
  const capturarDatos = (e) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  // --------- guarda los datos del objeto persona en la base de datos  ------------
  const guardarDatos = async (e) => {
    e.preventDefault() // evita que se recargue la pagina
    
    //if(user.id===''){ //si el id esta vacio es porque es un nuevo documento
      try {
        const docRef = await addDoc(collection(db, "usuarios"), user); //guarda los datos en la base de datos
        console.log("Document written with ID: ", docRef.id); //muestra el id del documento
        setUser(persona) //limpia el objeto persona
        obtenerDatos() //actualiza la lista
      } catch (e) {
        console.error("Error adding document: ", e); //muestra el error
      }
    //}
    // else{ //si el id no esta vacio es porque es un documento existente
    //   try{
    //     await setDoc(doc(db, "usuarios", user.id),{ //actualiza los datos del documento
    //       ...user})
    //       // limpiar el id del documento
    //       setUser({...user, id: ''})
    //       setUser(persona) //limpia el formulario
    //     obtenerDatos() //actualiza la lista
    //   }catch(e){
    //     console.log(e)
    //   }
    // }
  }

  // -------- obtiene los datos de la base de datos y los guarda en la lista  ------------

  const obtenerDatos = async () => {
    try{

      const datos = await getDocs(collection(db, "usuarios")) //obtiene los datos de la base de datos
      const arrayDatos = datos.docs.map(doc => ({id: doc.id, ...doc.data()})) //guarda los datos en un array
      setLista(arrayDatos) //guarda los datos en la lista
    }catch(e){
      console.log(e)
    }
  }
   
  //-------- renderiza la lista de datos de la base de datos en la collection ---------
  useEffect(() => {
    obtenerDatos()
  }, []) // cada vez que se actualice la lista se ejecuta la funcion obtenerDatos

  // -------------- elimina un documento de la base de datos  ----------------

  const deleteUser = async (id) => { //recibe el id del documento a eliminar
    try{
      await deleteDoc(doc(db, "usuarios", id)) //elimina el documento de la base de datos
      obtenerDatos() //actualiza la lista
    }catch(e){
      console.log(e)
    }
  }

  // ------------- captura los datos del documento de usuario a editar y los envia al formulario  --------

  const updateUser = async (id) => { //id del documento a editar
    try{
      const docRef = doc(db, "usuarios", id) //obtiene el documento a editar
      const docSnap = await getDoc(docRef) //obtiene los datos del documento

      if(docSnap.exists()){ //si el documento existe
        setUser({...docSnap.data()}) //enviamos los datos del documento al formulario
      }else{
        console.log('El documento no existe')
      }
    }catch(e){
      console.log(e)
    }
  }

  // -------------- actualiza los datos del documento de usuario  ----------------





  return (
      <div className='container'>    
        <form onSubmit={guardarDatos}>
          <div className="card card-body">
              <input 
                type="text" 
                placeholder="Ingrese su nombre" 
                className="form-control mb-2" 
                name='nombre'
                required
                value={user.nombre}
                onChange = {capturarDatos}
                />

              <input 
                type="text" 
                placeholder="Ingrese su apellido" 
                className="form-control mb-2" 
                name='apellido'
                required
                value={user.apellido}
                onChange = {capturarDatos}
                />
              <input 
                type="email"
                placeholder="Ingrese su correo" 
                className="form-control mb-2" 
                name='correo'
                required
                value={user.correo}
                onChange = {capturarDatos}
                />
              <input 
                type="text" 
                placeholder="Ingrese su telefono" 
                className="form-control mb-2"
                name='telefono'
                required
                value={user.telefono}
                onChange = {capturarDatos}
                />
             
          </div>

          <button className="btn btn-primary btn-block mt-2" type='submit'> Guardar
            {/* {
              user.id ==='' ? 'Guardar' : 'Actualizar'
            } */}
          </button>

        </form>

         <hr/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
              {
               lista.map((item, index)=>(
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.correo}</td>
                  <td>{item.telefono}</td>
                  <td>
                    <button className="btn btn-danger btn-sm mx-2" onClick={()=>deleteUser(item.id)} >Eliminar</button>
                    <button className="btn btn-warning btn-sm mx-2" onClick={()=>updateUser(item.id)}>Editar</button>
                  </td>
              </tr>
              ))
              }
            </tbody>
              </table> 
    </div>
  )
}

export default Home