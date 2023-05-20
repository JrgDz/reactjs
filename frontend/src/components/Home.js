import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";


class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Slider 
                    title="Bienvenido a la práctica de REACT con Jorge Díaz"
                    classCss="slider-big"
                    btn="true"
                />
                <div className="center">
                    <div id="content">
                        <h1>Últimos artículos</h1>
                        <Articles 
                            home="true"
                        />
                    </div>
                    <Sidebar />
                </div>
            </React.Fragment>

        )
    }
}

export default Home