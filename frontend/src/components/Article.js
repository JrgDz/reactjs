import React, { Component } from "react";
// import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import Sidebar from "./Sidebar";
import Moment from "react-moment";
import "moment/locale/es"
import ImageDefault from "../assets/images/default.png"

class Article extends Component {

    url = Global.url
    idArticle = this.props.match.params.id
    

    state ={
        article: {},
        status: null,
        image: null
    }

    componentDidMount(){
        this.getArticle(this.idArticle)
    }

    getArticle = (id) => {
        axios.get(this.url + "article/" + id).then(
            res => {
                this.setState({
                    article: res.data.article,
                    status: res.data.status
                })
            }   
               
        )
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="center">
                    <section id="content">

                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {this.state.article.image !== null && this.state.article.image !== undefined ? (
                                    <img src={this.url+"get-image/"+this.state.article.image} alt={this.state.article.title} />
                                ):(
                                    <img src={ImageDefault} alt={this.state.article.title} />
                                )}
                                
                            </div>
                            <h1 className="subheader">{this.state.article.title}</h1>
                            <span className="date"><Moment fromNow>{this.state.article.date}</Moment></span>
                            <p>{this.state.article.content}</p>

                            <a href="#" className="btn btn-danger">Eliminar</a>
                            <a href="#" className="btn btn-warning">Editar</a>

                            <div className="clearfix"></div>
                        </article>

                    </section>
                    <Sidebar />

                </div>
            </React.Fragment>
        )
    }
}

export default Article