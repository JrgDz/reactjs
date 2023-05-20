import React, {Component} from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

//Importar componentes
//import MiComponente from "./components/MiComponente";
//import Peliculas from "./components/Peliculas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MiComponente from "./components/MiComponente"
import Error from "./components/Error";
import Peliculas from "./components/Peliculas"

import Home from "./components/Home";
import Blog from "./components/Blog";
import Formulario from "./components/Formulario";
import Search from "./components/Search";
import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";

class Router extends Component{

    render(){

        return(
            <BrowserRouter>
                <Header />
                
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/article/:id" component={Article} />
                    <Route exact path="/blog/create" component={CreateArticle} />
                    <Route exact path="/blog/busqueda/:search" component={Search} />
                    <Route exact path="/redirect/:search" render={(props)=>{
                        var search = props.match.params.search;
                        return (<Redirect to={"/blog/busqueda/"+search} />)
                    }
                    } />
                    <Route exact path="/formulario" component={Formulario} />
                    

                    <Route exact path="/mi-componente" component={MiComponente} />
                    <Route exact path="/peliculas" component={Peliculas} />
                    <Route exact path="/prueba/:nombres/:apellidos?" render={(props)=>{
                        var nombres = props.match.params.nombres
                        var apellidos = props.match.params.apellidos
                        return(
                        <div id="content">
                            <h1 className="subheader">Página de prueba</h1>
                            <h2>
                                {nombres && !apellidos &&
                                    <span>{nombres}</span>
                                }
                                {nombres && apellidos &&
                                    <span>{nombres} {apellidos}</span>
                                }
                            </h2>
                        </div>
                        )
                    }} />
                    <Route exact path="*" component={Error} />
                </Switch>
                
                <div className="clearfix"></div>
                <Footer/>
            </BrowserRouter>
        )
    }
}

export default Router