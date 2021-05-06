import React, { useState, useEffect } from "react";
import { store } from "./firebaseconfig";

const App = () => {
  const [modoEdicion, setModoEdicion] = useState(null);
  const [idUsuario, setIdUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [usuarioAgenda, setUsuarioAgenda] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuarioAgenda(nuevoArray);
    };
    getUsuarios();
  }, []);

  const setUpdate = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El campo del nombre esta vacío");
    }
    if (!phone.trim()) {
      setError("El campo del telefono esta vacío");
    }

    const userUpdate = {
      nombre: nombre,
      telefono: phone,
    };
    try {
      const data = await store
        .collection("agenda")
        .doc(idUsuario)
        .set(userUpdate);
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuarioAgenda(nuevoArray);

      alert("Se realizo una actualización");
    } catch (e) {
      console.log("error " + e);
    }

    setNombre("");
    setPhone("");
    setIdUsuario("");
    setModoEdicion(false);
  };

  const setUsuarios = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El campo del nombre esta vacío");
    }
    if (!phone.trim()) {
      setError("El campo del telefono esta vacío");
    }
    const usuario = {
      nombre: nombre,
      telefono: phone,
    };
    try {
      const data = await store.collection("agenda").add(usuario);
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuarioAgenda(nuevoArray);
      alert("Se añadio un nuevo usuario");
    } catch (e) {
      console.log("error " + e);
    }

    setNombre("");
    setPhone("");
  };

  const BorrarUsuario = async (id) => {
    try {
      await store.collection("agenda").doc(id).delete();
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuarioAgenda(nuevoArray);
    } catch (e) {
      console.log(e);
    }
  };

  const pulsarActualizar = async (id) => {
    try {
      const data = await store.collection("agenda").doc(id).get();
      const { nombre, telefono } = data.data();
      setNombre(nombre);
      setPhone(telefono);
      setIdUsuario(id);
      setModoEdicion(true);
      console.log(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de usuarios</h2>
          <form
            onSubmit={modoEdicion ? setUpdate : setUsuarios}
            className="form-group"
          >
            <input
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              className="form-control mt-3"
              placeholder="Introduce el nombre"
              type="text"
            />
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="form-control mt-3"
              placeholder="Introduce el número"
              type="text"
            />
            {modoEdicion ? (
              <input
                className="btn btn-dark btn-block mt-3"
                value="EDITAR"
                type="submit"
              />
            ) : (
              <input
                className="btn btn-dark btn-block mt-3"
                value="REGISTRAR"
                type="submit"
              />
            )}
          </form>
          {error ? (
            <div>
              <p>{error}</p>
            </div>
          ) : (
            <span></span>
          )}
        </div>
        <div className="col">
          <h2>Lista de tu Agenda</h2>
          <ul className="list-group">
            {usuarioAgenda.length !== 0 ? (
              usuarioAgenda.map((item) => (
                <li className="list-group-item" key={item.id}>
                  {item.nombre} -- {item.telefono}
                  <button
                    onClick={(id) => {
                      BorrarUsuario(item.id);
                    }}
                    className="btn btn-danger float-right"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={(id) => {
                      pulsarActualizar(item.id);
                    }}
                    className="btn btn-info mr-3  float-right"
                  >
                    Actualizar
                  </button>
                </li>
              ))
            ) : (
              <span>Lo siento, no hay contactos en tu agenda</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
