//import logo from "./assets/images/logo.svg";
import "./assets/css/App.css";
import Router from "./Router"

// function holaMundo(nombre, edad) {
//   var presentacion = (
//     <div>
//       <h2>
//         Página en React hecha por {nombre} a los {edad} años
//       </h2>
//     </div>
//   );
//   return presentacion;
// }

function App() {
  //var nombre = "Jorge Díaz";
  return (
    <div className="App">
        <Router />
        {
          /*<Peliculas />*/
        } 
    </div>
  );
}

export default App;
