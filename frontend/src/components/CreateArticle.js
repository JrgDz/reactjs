import React, {Component, createRef} from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";

//Validación de formularios y alertas

class CreateArticle extends Component{
    
    titleRef = createRef()
    contentRef = createRef()
    
    state ={
        article:{},
        status: null
    }

    changeState = () => {
        this.setState({
            article:{
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        })
    }


    saveArticle = (e)=>{
        e.preventDefault()

        this.changeState()

        axios.post(Global.url + "article", this.state.article).then(
            res => {
                console.log(res.data)
                if(res.data.article){
                    this.setState({
                        article: res.data.article,
                        status :"success"
                    })
                    console.log(this.state)
                }else{
                    this.setState({
                        status:"failed"
                    })
                }
            }
        )

    }
    render(){

        if(this.state.status === "success"){
            <Redirect to={"/blog/"} />
        }

        return(
            <div className="center">
                <section id="content">
                    <h1 className="sunheader">Crear artículo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea >
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" />
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        )
    }
}

export default CreateArticle