import React, { Component } from "react";
import { getAllPant, collectPant } from "../util/APIUtils";
import Pant from "./Pant";
import SimpleMap from "../map/SimpleMap";
import { unCollectPant } from "../util/APIUtils";
import "./checkboxStyle.css";

class PantLista extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isSchool: false,
      pantList: [],
      viewAsMap: true,
      coords: {
        lat: 59.33,
        lng: 18.07
      }
    };
    this.loadPant = this.loadPant.bind(this);
    this.collectPant = this.collectPant.bind(this);
    this.unCollectPant = this.unCollectPant.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    this.loadPant();
  }

  componentWillUnmount() {
    this.setState({ pantList: null });
  }

  getPosition(position) {
    this.setState({
      coords: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  }

  toggleMap() {
    this.setState((prevState) => ({
      viewAsMap: !prevState.viewAsMap
    }));
  }

  loadPant() {
    getAllPant()
      .then(response => {
        this.setState({
          pantList: response
        });
      })
      .then(() => {
        if (this.props.currentUser.schoolclass) {
          this.setState({ isLoading: false, isSchool: true });
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false
        });
      });
  }

  collectPant(id) {
    collectPant(id)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  unCollectPant(id) {
    unCollectPant(id)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const allPant = this.state.pantList.map((pant, index) => {
      return (
        <Pant
          pant={pant}
          unCollectPant={this.unCollectPant}
          collectPant={this.collectPant}
          isSchoolclass={this.state.isSchool}
          key={index}
        />
      );
    });

    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <React.Fragment>

        <div className="cntr">
          <div className="row press">
            <p>Karta</p>
            <input type="checkbox" onClick={this.toggleMap} id="unchecked" className="cbx hidden" />
            <label htmlFor="unchecked" className="lbl"></label>
            <p>Lista</p>
          </div>
        </div>

        {this.state.viewAsMap ?
          <div className="google-map">
            <SimpleMap
              coords={this.state.coords}
              unCollectPant={this.unCollectPant}
              collectPant={this.collectPant}
              pantLista={this.state.pantList}
              isSchoolclass={this.state.isSchool} />
          </div>
          :
          <div className="mainContent">
            <h1>Pantlista</h1>
            {allPant}
          </div>
        }
      </React.Fragment>
    );
  }
}

export default PantLista;
