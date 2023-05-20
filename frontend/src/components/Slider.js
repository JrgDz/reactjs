import React, { Component } from "react";

class Slider extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="slider" className={this.props.classCss}>
          <h1>{this.props.title}</h1>
          {this.props.btn &&
            <a href="www.google.com" className="btn-white">Ir a Google</a>
          }
        </div>
      </React.Fragment>

    )
  }
}

export default Slider