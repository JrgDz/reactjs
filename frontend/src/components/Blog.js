import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";

class Blog extends Component{

    render(){
        return(
            <React.Fragment>
                <Slider 
                    title="Blog"
                    classCss="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/* Listado de artículos*/}
                        <Articles />

                    </div>
                    <Sidebar 
                        blog="true"
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Blog