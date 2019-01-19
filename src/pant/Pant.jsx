import React, { Component } from "react";

class Pant extends Component {
  constructor() {
    super();
    this.state = {
      isCollected: false
    };
    this.handleCollectPant = this.handleCollectPant.bind(this);
    this.handleRegretCollect = this.handleRegretCollect.bind(this);
  }

  handleCollectPant(id) {
    this.props.collectPant(id);
    this.setState(prevState => ({
      isCollected: !prevState.isCollected
    }));
  }

  handleRegretCollect(id) {
    this.props.unCollectPant(id);
    this.setState(prevState => ({
      isCollected: !prevState.isCollected
    }));
  }

  render() {
    const { pant, isSchoolclass } = this.props;
    const { isCollected } = this.state;

    return (
        <div className="pantItem">
          <div className="pantInfo">
            <p>Uppskattat värde: {pant.value}</p>
            <p>Adress: {pant.address}</p>
          </div>

          {isSchoolclass && !isCollected && (
            <button
              className="pantButton btn btn-success"
              onClick={() => {
                this.handleCollectPant(pant.pantId);
              }}
            >
              Hämta
            </button>
          )}

          {isSchoolclass && isCollected && (
            <button
              className="pantButton btn btn-secondary"
              onClick={() => {
                this.handleRegretCollect(pant.pantId);
              }}
            >
              Ångra
            </button>
          )}
        </div>
    );
  }
}

export default Pant;
