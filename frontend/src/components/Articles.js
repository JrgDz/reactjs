import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Global from "../Global";
import DefaultImage from "../assets/images/default.png"
import Moment from 'react-moment'
import 'moment/locale/es'


class Articles extends Component {

    url = Global.url
    home = this.props.home;
    search = this.props.search

    state = {
        articles: [],
        status: null
    }

    componentDidMount() {

        if (this.home === "true") {
            this.getLastArticles()
        } else if (this.search && this.search != null && this.search !== undefined) {
            this.getSearchArticle(this.search)
        } else {
            this.getArticles()
        }
    }

    getArticles = () => {
        axios.get(this.url + "articles").then(
            res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            }
        )
    }

    getLastArticles = () => {
        axios.get(this.url + "articles/5").then(
            res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            }
        )
    }

    getSearchArticle = (searched) => {
        axios.get(this.url + "search/" + searched)
            .then(res => {
                if (res.data.articles) {
                    this.setState({
                        articles: res.data.articles,
                        status: 'success'
                    });
                    
                }
            })
            .catch(err => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            })
    }

    render() {

        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map((article, key) => {
                return (
                    <article className="article-item" id="article-template" key={key}>
                        <div className="image-wrap">
                            {article.image !== null ?
                                (<img src={this.url + "get-image/" + article.image} alt={article.title} />) :
                                (<img src={DefaultImage} alt={article.title} />)
                            }

                        </div>
                        <h2>{article.title}</h2>
                        <span className="date"><Moment locale="es" fromNow>{article.date}</Moment></span>
                        <Link to={"/blog/article/" + article._id}>Leer más</Link>
                        <div className="clearfix"></div>
                    </article>
                )
            })

            return (
                <div id="articles">
                    {this.home !== "true" && <h1>Listado de artículos!!!</h1>}
                    {listArticles}
                </div>
            )
        } else if (this.state.articles < 1 && this.state.status === "success") {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay artículos para mostrar</h2>
                    <p>Todavía no hay contenido en esta sección</p>
                </div>
            )
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            )
        }



    }
}

export default Articles