import './App.css';
import GoogleLogin from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, Profiler, useState } from "react";
import { useFirestoreDocData, useFirestore, useFirestoreCollectionData, useAuth, useUser, useFirebaseApp } from 'reactfire';

function App() {
  const respGoogle = (resp) => {
    console.log(resp);
    console.log(resp, Profiler);
  }

  const [boton, setBoton] = useState(false);

  const [cont, setCont] = React.useState("");
  const [etiquetas, setEtiquetas] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [cant_likes, setCant_like] = React.useState(0);
  const [cant_dislikes, setCantDislike] = React.useState(0);
  const [emailin, setEmailin] = React.useState("");
  const [passin, setPassin] = React.useState("");

  var fecha1 = new Date();
  console.log(fecha1);

  const contCollection = useFirestore().collection('apuntes');

  const {
    status: statusPost,
    data: dataPost
  } = useFirestoreCollectionData
      (contCollection);

  console.log(statusPost, dataPost);

  function guardar() {
    console.log(cont, etiquetas, fecha, cant_likes, cant_dislikes);
    contCollection.add({
      cont,
      etiquetas,
      fecha1,
      cant_likes: parseInt(cant_likes),
      cant_dislikes: parseInt(cant_dislikes)
    });
  }

  function Form() {
    function handleSubmit(e) {
      e.preventDefault();
      console.log('You clicked submit.');
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  }

  function salir() {
    auth.signOut();
    setBoton(false);
  }

  const auth = useAuth();
  const { data: user } = useUser();

  function registrar() {
    auth.createUserWithEmailAndPassword(emailin, passin);
    setBoton(true);
  }

  function ing() {
    auth.signInWithEmailAndPassword(emailin, passin);
    setBoton(true);
  }


  let cadena = "Este era un gato con los pies de trapo";
  // esta es la palabra a buscar
  let termino = "gato";
  // para buscar la palabra hacemos
  let posicion = cadena.indexOf(termino);
  if (posicion !== -1)
    console.log("La palabra está en la posición " + posicion);
  else
    console.log("No encontré lo que estás buscando");

  //posts con etiqueta
  const postsEtiqueta = useFirestore()
    .collection('apuntes')
    .where('estado', '==', "l");

  const {
    status: statusPostEtiqueta,
    data: dataPostEtiqueta
  } = useFirestoreCollectionData
      (postsEtiqueta);

  return (

    <div className="App">
      <br /><br /><br /><br /><br /><br />
      {/*<GoogleLogin
        clientId="937887351779-5cebj9p5ubk1npn2qhr5bsjmf3im4pt8.apps.googleusercontent.com"
        buttonText="Ingresar"
        onSuccess={respGoogle}
        onFailure={respGoogle}
        cookiePolicy={'single_host_origin'}
      />*/}

      <div class="nuevo">
        <div class="encabezado">
          <div>
            <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <form class="d-flex">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-outline-success" type="submit"  disabled={!boton}>Search</button>
                  <button class="btn btn-outline-info" type="submit" id="btn_nav" onClick={salir} disabled={!boton}>Cerrar Sesión</button>

                </form>
              </div>
            </nav>

          </div>
        </div>
        <br />

        <div class="ingresar">
          <br /><br /><br /><br />
          {user ? `Usuario ingresado: ${user.email}` : 'Inicie sesion a continuacion'}

          <div class="card w-50" id="ingreso">
            <div class="card-body">
              <h5 class="card-title">Ingresar con Correo</h5>
              <p>
                <div class="mb-3">
                  <h3>Email</h3>
                  <textarea class="form-control" id="Email" rows="1" placeholder="Email" value={emailin} onChange={e => setEmailin(e.target.value)} />
                </div>
                <div class="mb-3">
                  <h3>Password</h3>
                  <input type="password" class="form-control" id="Pass" rows="1" placeholder="Password" value={passin} onChange={e => setPassin(e.target.value)} />
                </div>
              </p>
              <a href="#" class="btn btn-primary" id="ingresar" onClick={ing}  >Ingresar</a>
              <br /><br />
              <a href="#" class="btn btn-secondary" id="ingresar">Cancelar</a>
              <br /><br />
              <button type="button" class="btn btn-outline-light" id="ingresar" onClick={registrar}>Registrar</button>
            </div>
          </div>
          <br /><br />
        </div>

        <div class="card w-75">
          <div class="card-body">
            <h5 class="card-title">Nuevo Apunte</h5>
            <p>
              <div class="mb-3">
                <textarea class="form-control" id="contenido" rows="4" placeholder="Apunte" value={cont} onChange={e => setCont(e.target.value)} />
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="etiqueta" rows="1" placeholder="Etiquetas" value={etiquetas} onChange={e => setEtiquetas(e.target.value)} />
              </div>
            </p>
            <button type="button" class="btn btn-primary" id="public" onClick={guardar} disabled={!boton}>Publicar</button>
          </div>
        </div>
        <br />
      </div>
      <br />
      <div class="contenido">
        <br />
        {statusPost === 'success' &&
          <div>
            {dataPost.map(post => (
              <div key={post.NO_ID_FIELD}>
                <div class="card w-75">
                  <div class="card-body">
                    <h5 class="card-title">{post.cont}</h5>
                    <br />
                    <p class="card-text"> {post.etiquetas}</p>
                    <button type="button" class="btn btn-primary" id="like" disabled={!boton}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                    </svg> Like</button>
                    <button type="button" class="btn btn-primary" id="dislike" disabled={!boton}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                    </svg> Dislike</button>
                  </div>
                </div>
                <br /><br />
              </div>
            ))}
          </div>
        }
      </div>



    </div>
  );
}

export default App;
