import React, { Component } from "react";
//import axios from "axios";

class AutocompleteBox extends Component {
  state = {
    suggested_items: [],
    cursor:0,
    backgroundValue:"white",
  };

  handleChange = (e) => {
    console.log(process.env.REACT_APP_GOOGLE_API_KEY);
    const val = e.target.value;
    console.log(val);
    const url =
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
      val +"&key="+
      process.env.REACT_APP_GOOGLE_API_KEY;

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

  /*handleKeyDown = (e) => {
    if (e.keyCode === 40){
      if (this.state.cursor <= this.state.suggested_items.length){
    this.setState({ value: this.state.suggested_items[this.state.cursor]});
    this.setState({cursor : this.state.cursor + 1});
      }
    }
  };*/

  handleKeyUp = (e) => {
    if (e.keyCode === 38 && this.state.cursor >= 0){
      if (this.state.cursor <= this.state.suggested_items.length && this.state.cursor >= 0){
    this.setState({ value: this.state.suggested_items[this.state.cursor]});
    this.setState({cursor : this.state.cursor - 1});
    this.setState({backgroundValue:"grey"});
      }
    }

    if (e.keyCode === 38 && this.state.cursor <= 0){
      this.setState({cursor:0});
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 40 && this.state.cursor <= this.state.suggested_items.length){
    this.setState({ value: this.state.suggested_items[this.state.cursor] });
    this.setState({cursor: this.state.cursor + 1});
    this.setState({backgroundValue:"grey"});
    }

    if (e.keyCode === 40 && this.state.cursor >= this.state.suggested_items.length){
      this.setState({cursor: this.state.suggested_items.length - 1 })
    }
  };


  handleClick = (item) => {
    this.setState({ value: item });
  };

  render() {
    const inputstyle = {
      width: "700px",
      fontSize: "36px",
    };

    const inputstyle2 = {
      width: "700px",
      margin: "0px",
      fontSize: "36px",
      border: "1px solid gray",
    };

    const divstyle = {
      margin: "200px",
    };

  
    return (
      <div style={divstyle}>
        <input
          style={inputstyle}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
        <div>
          {this.state.suggested_items.map((item) => {
            return (
              <div style={inputstyle2} onClick={(event) => this.handleClick(item)}>
                <div style={{background:this.state.backgroundValue}}>{item}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AutocompleteBox;
