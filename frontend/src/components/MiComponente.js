import React, {Component} from "react"; 

class MiComponente extends Component{
  render(){
    
    //Variables
    let receta = {
      nombre:'Pizza',
      ingredientes:['tomate', 'queso', 'jamón'],
      calorias: 400
    };


    return(
      <React.Fragment>
        <div id="content">
        <h1>Soy el componente llamado: MiComponente</h1>
        <h2>Estoy haciendo pruebas!!!</h2>
        <hr/>
        <h1>{"Receta: " + receta.nombre}</h1>
        <h3>{"Calorías: " + receta.calorias}</h3>
        <h3>{"Calorías: " + receta.ingredientes}</h3>
        <ol>
        {
            receta.ingredientes.map((ingrediente, i)=>{
              return(
                <li key={i}>{ingrediente}</li>
              )
            })
          }
        </ol>
        <hr/>
        </div>
      </React.Fragment>
      
    )
  }
}

export default MiComponente