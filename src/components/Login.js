import React, {useState} from 'react'
import Swal from 'sweetalert2';
import img1 from '../img/1.png'
import img2 from '../img/2.png'
import img3 from '../img/3.png'
import img4 from '../img/4.png'
import img5 from '../img/5.png'

import app from '../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(app);

const Login = () => {

    const [registro, setRegistro] = useState(false)

    const hadlerSumit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(registro){ //si es true
            //await createUserWithEmailAndPassword(auth, email, password) //crea un usuario

            try {
                const user = await createUserWithEmailAndPassword(auth, email, password) //crea un usuario
                console.log(user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Inicio",
                    showConfirmButton: false,
                    timer: 1500,
                  });
            } catch (error) {
                console.log(error)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Inicio",
                    showConfirmButton: false,
                    timer: 1500,
                  });
            }
        }else{
            //await signInWithEmailAndPassword(auth, email, password) //inicia sesion
            try {
                const user = await signInWithEmailAndPassword(auth, email, password) //inicia sesion
                console.log(user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Inicio exitoso",
                    showConfirmButton: false,
                    timer: 1500,
                  });
            } catch (error) {
                console.log(error)

                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Datos incorrectos",
                    showConfirmButton: false,
                    timer: 1500,
                  });
            }
        }
    }

  return (
    <div className='row'>

    {/* carrusel de imagenes  */}
    <div className='col-md-8'>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img1} className="size-imagen" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img2} className="size-imagen" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={img3} className="size-imagen" alt="..." />
                </div>
                <div className='carousel-item'>
                    <img src={img4} className="size-imagen" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    </div>

    {/* formulario de login */}

    <div className='col-md-4'>
        <div className='container mt-5'>
            <h1 className='text-center'>{registro ? 'Registrate' : 'Iniciar Sesión'}</h1>
            <form className='mt-4' onSubmit={hadlerSumit} >
                <div className="mb-3">
                    <label className='form-label'>Dirección</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder='Ingrese su correo'
                        name='email'
                        id='email'
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className='form-label'>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder='Ingrese su password'
                        name='password'
                        id='password'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='btn btn-primary mt-4 form-control'
                >{registro ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </form>

            <div className='form-group '>
                <button className='btn btn-secondary mt-4 form-control' onClick={() => setRegistro(!registro)}>
                    {registro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta ? Registrate'}
                </button>
            </div>

        </div>

    </div>

</div>
  );
}

export default Login