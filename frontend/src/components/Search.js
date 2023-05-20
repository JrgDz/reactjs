import React, { Component } from "react";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";

class Search extends Component{

    searched = this.props.match.params.search;

    render(){
        return(
            <React.Fragment>
                <Slider 
                    title={"Busqueda: " + this.searched}
                    classCss="slider-small"
                />
                <div className="center">
                    <div id="content">
                        <Articles 
                            search = {this.searched}
                        />

                    </div>
                    <Sidebar 
                        blog="true"
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Search