import React, { Component, createRef } from "react";
import Sidebar from "./Sidebar";

class Formulario extends Component {

    nombresRef = createRef();
    apellidosRef = createRef();
    bioRef = createRef();
    generoHombreRef = createRef();
    generoMujerRef = createRef();
    generoOtroRef = createRef();

    state = {
        user:{}
    }

    

    recibirFormulario = (e) => {
        e.preventDefault()

        var genero

        if(this.generoHombreRef.current.checked){
            genero = this.generoHombreRef.current.value
        }else if(this.generoMujerRef.current.checked){
            genero = this.generoMujerRef.current.value
        }else{
            genero = this.generoOtroRef.current.value
        }

        var user={
            nombres:this.nombresRef.current.value,
            apellidos:this.apellidosRef.current.value,
            bio:this.bioRef.current.value,
            genero: genero
        }

        this.setState({
            user:user
        })

        console.log("Formulario enviado")
        console.log(this.nombresRef.current.value)
        console.log(user)
    }

    render() {

        if(this.state.user){
            var user = this.state.user
        }

        return (
            <React.Fragment>
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1> 

                        {/* Mostrar datos del formulario */}
                        {user.nombres &&
                            <div id="user-data">
                                <p>Nombres: <strong>{user.nombres}</strong></p>
                                <p>Apellidos: <strong>{user.apellidos}</strong></p>
                                <p>Biografía: <strong>{user.bio}</strong></p>
                                <p>Género: <strong>{user.genero}</strong></p>
                            </div>
                        }

                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario} >
                            <div className="form-group">
                                <label htmlFor="nombres">Nombres</label>
                                <input type="text" name="nombres" ref={this.nombresRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografía</label>
                                <textarea name="bio" ref={this.bioRef} ></textarea>
                            </div>
                            <div className="form-group radiobuttons">
                                <input type="radio" name="genero" value="Hombre" ref={this.generoHombreRef} />Hombre
                                <input type="radio" name="genero" value="Mujer" ref={this.generoMujerRef} />Mujer
                                <input type="radio" name="genero" value="Otro" ref={this.generoOtroRef} />Otro
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Formulario