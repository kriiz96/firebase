import React, {useEffect, useState} from 'react'
import app from '../credenciales'
import {getFirestore,collection, addDoc, getDocs, doc, deleteDoc, getDoc} from 'firebase/firestore'

const db = getFirestore(app) //inicializa la base de datos


const Auto = () => {

    const auto = { //objeto auto para guardar los datos
        marca: '',
        modelo: '',
        color: '',
        placa: '',
        precio: ''
    }


    const [carro, setCarro] = useState(auto) //guarda los datos del objeto persona
    const [lista, setLista] = useState([]) //guarda los datos del objeto persona en una lista


  // -------- captura los datos del formulario y los guarda en el objeto persona ------------
  const capturarDatos = (e) => {
    const {name, value} = e.target
    setCarro({...carro, [name]: value})
  }

  // --------- guarda los datos del objeto persona en la base de datos  ------------
  const guardarDatos = async (e) => {
    e.preventDefault() // evita que se recargue la pagina
    
    //if(user.id===''){ //si el id esta vacio es porque es un nuevo documento
      try {
        const docRef = await addDoc(collection(db, "carros"), carro); //guarda los datos en la base de datos
        console.log("Document written with ID: ", docRef.id); //muestra el id del documento
        setCarro(auto) //limpia el objeto persona
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

      const datos = await getDocs(collection(db, "carros")) //obtiene los datos de la base de datos
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
      await deleteDoc(doc(db, "carros", id)) //elimina el documento de la base de datos
      obtenerDatos() //actualiza la lista
    }catch(e){
      console.log(e)
    }
  }

  // ------------- captura los datos del documento de usuario a editar y los envia al formulario  --------

  const updateUser = async (id) => { //id del documento a editar
    try{
      const docRef = doc(db, "carros", id) //obtiene el documento a editar
      const docSnap = await getDoc(docRef) //obtiene los datos del documento

      if(docSnap.exists()){ //si el documento existe
        setCarro({...docSnap.data()}) //enviamos los datos del documento al formulario
      }else{
        console.log('El documento no existe')
      }
    }catch(e){
      console.log(e)
    }
  }
   
  return (
    <div className='container'>    

        <form onSubmit={guardarDatos}>
          <div className="card card-body">
              <input 
                type="text" 
                placeholder="Ingrese la marca" 
                className="form-control mb-2" 
                name='marca'
                required
                value={carro.marca}
                onChange = {capturarDatos}
                />

              <input 
                type="number" 
                placeholder="Ingrese el modelo" 
                className="form-control mb-2" 
                name='modelo'
                required
                value={carro.modelo}
                onChange = {capturarDatos}
                />
              <input 
                type="text"
                placeholder="Ingrese el color" 
                className="form-control mb-2" 
                name='color'
                required
                value={carro.color}
                onChange = {capturarDatos}
                />
              <input 
                type="text" 
                placeholder="Ingrese la placa" 
                className="form-control mb-2"
                name='placa'
                required
                value={carro.placa}
                onChange = {capturarDatos}
                />
                <input 
                type="text" 
                placeholder="Ingrese el precio" 
                className="form-control mb-2"
                name='precio'
                required
                value={carro.precio}
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
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Placa</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
              {
               lista.map((item, index)=>(
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.marca}</td>
                  <td>{item.modelo}</td>
                  <td>{item.color}</td>
                  <td>{item.placa}</td>
                  <td>{item.precio}</td>
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

export default Auto