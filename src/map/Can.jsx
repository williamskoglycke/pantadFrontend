import React from "react";

class Can extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleInfo: false,
      isCollected: false
    };
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.handleCollectPant = this.handleCollectPant.bind(this);
    this.handleRegretCollect = this.handleRegretCollect.bind(this);
  }

  toggleMoreInfo() {
    this.setState(prevState => ({
      toggleInfo: !prevState.toggleInfo
    }));
  }

  handleCollectPant(id) {
    this.props.collectPant(id);
    this.setState((prevState) => ({
      isCollected: !prevState.isCollected,
      toggleInfo: !prevState.toggleInfo
    }));
  }

  handleRegretCollect(id) {
    this.props.unCollectPant(id);
    this.setState((prevState) => ({
      isCollected: !prevState.isCollected,
      toggleInfo: !prevState.toggleInfo
    }));
  }

  render() {
    return (
      <div key={this.props.pant.pantId}>
        <button
          className="btn btn-link"
          onClick={this.toggleMoreInfo}
        >
          <i className={(this.props.isSchoolclass && !this.state.isCollected) ? "fas fa-map-marker-alt recycle-icon" : "fas fa-check recycle-icon"}></i>
        </button>
        {this.state.toggleInfo && (
          <div className="moreInfoField">
            <p>{`Ca värde: ${this.props.pant.value}`}</p>
            <p>{`Adress: ${this.props.pant.address}`}</p>
            <p>{`Hämttid: ${this.props.pant.collectTimeFrame}`}</p>

            {(this.props.isSchoolclass && !this.state.isCollected) &&
              <button className="pantButton btn btn-success" onClick={() => {
                this.handleCollectPant(this.props.pant.pantId)
              }}>Hämta</button>}

            {(this.props.isSchoolclass && this.state.isCollected) &&
              <button className="pantButton btn btn-secondary" onClick={() => {
                this.handleRegretCollect(this.props.pant.pantId)
              }}>Ångra</button>}

            <button onClick={this.toggleMoreInfo} className="pantButton btn btn-danger">Stäng</button>
          </div>
        )}
      </div>
    );
  }
}

export default Can;
