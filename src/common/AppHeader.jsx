import React from 'react';
import { withRouter } from "react-router-dom";

class AppHeader extends React.Component {
    constructor() {
        super();
        this.goToStartPage = this.goToStartPage.bind(this);
    }

    goToStartPage() {
        this.props.history.push("/");
    }



    render() {
        return (
            <div className="header">
                <div className="company-logo">
                    <img onClick={this.goToStartPage} className="happy-can-logo" src="../img/happy_can_black_white.png" alt="happy can" />
                    <h1 onClick={this.goToStartPage}> Happy Can</h1>
                </div>
                <i onClick={this.props.toggleMenu} className="fas fa-bars"></i>
            </div>
        );
    }
}

export default withRouter(AppHeader);