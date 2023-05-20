import React, { Component } from "react";
import Pelicula from "./Pelicula";

class Peliculas extends Component {
  state = {};

  cambiarTitulo = () => {
    var { peliculas } = this.state;
    peliculas[0].title = "Batman Begins";
    this.setState({
      peliculas: peliculas,
    });
  };

  favorita = (pelicula) => {
    console.log("Favorita marcada!!!");
    console.log(pelicula.title);
    this.setState({
      favorita: pelicula,
    });
  };

  componentWillMount(){
    //alert("Se va a montar el componente")
    this.setState({
      peliculas: [
        {
          title: "Batman vs Superman",
          image:
            "https://www.smashradio.com.mx/wp-content/uploads/Poster_Batman_Vs_Superman.jpg",
        },
        {
          title: "Avenger",
          image:
            "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/13/82/20182449.jpg",
        },
        {
          title: "Saw",
          image:
            "https://es.web.img3.acsta.net/c_310_420/pictures/21/05/11/13/32/5298328.jpg",
        },
      ],
      nombre: "Jorge Díaz",
      favorita: {},
  
    })
  };

  // componentDidMount(){
  //   alert("Ya se ha montado el componente")
  // }

  // componentWillUnmount(){
  //   alert("Me voy a desmontar")
  // }

  render() {

    var pStyle = {
      background:"green",
      color:"white",
      padding:"10px"
    }

    var pStyle2 = {
      background:"orange",
      color:"white",
      padding:"10px"
    }

    var favorita;
    if (this.state.favorita.title){
      favorita = (
        <p className="favorita" style={pStyle}>
          <strong>La película favorita es: </strong>
          <span>{this.state.favorita.title}</span>
        </p>
      )
    }else{
      favorita = (
        <p className="favorita" style={pStyle2}>
          <strong>No hay película favorita</strong>
        </p>
      )
    }

    return (
      <div id="content" className="peliculas">
        <h2 className="subheader">Películas</h2>
        <p>Selección de películas de {this.state.nombre}</p>
        <div>
          <button onClick={this.cambiarTitulo}>Cambiar Titulo</button>
        </div>
        
        {/*this.state.favorita.title ? (
          <p className="favorita" style={pStyle}>
            <strong>La película favorita es: </strong>
            <span>{this.state.favorita.title}</span>
          </p>
        ) : (
          <p className="favorita" style={pStyle2}>
            <strong>No hay película favorita</strong>
          </p>
        )*/}
        
        {favorita}

        {this.state.peliculas.map((pelicula, i) => {
          return (
            <Pelicula
              key={i}
              pelicula={pelicula}
              marcarFavorita={this.favorita}
            />
          );
        })}
      </div>
    );
  }
}

export default Peliculas;
