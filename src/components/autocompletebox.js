import React, { Component } from "react";
//import axios from "axios";

class AutocompleteBox extends Component {
  state = {
    suggested_items: [],
  };

  handleChange = (e) => {
    const val = e.target.value;
    console.log(val);
    const url =
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
      val +
      "&key=AIzaSyCkZDgllKqSOzAbYWBsJ2DK3ILxTpaxx0U";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let temp_data = data.predictions.map((d) => {
          return d.description;
        });
        this.setState({ suggested_items: temp_data });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.state.suggested_items);

    this.setState({ value: e.target.value });
  };

  handleKeyDown = (e) => {};

  render() {
    const inputstyle = {
      //height: "60px",
      width: "700px",
      fontSize: "36px",
    };

    const inputstyle2 = {
      //height: "60px",
      width: "700px",
      margin: "0px",
      fontSize: "36px",
      border: "1px solid gray",
    };

    const divstyle = {
      margin: "200px",
      /*textAlign: "center",*/
    };

    return (
      <div style={divstyle}>
        <input
          style={inputstyle}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div>
          {this.state.suggested_items.map((item) => {
            return (
              <div style={inputstyle2} onKeyDown={this.handleKeyDown}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AutocompleteBox;
