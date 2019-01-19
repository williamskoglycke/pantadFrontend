import React, { Component } from 'react';
import { getSchoolPant, unCollectPant, deletePant, getUserPant, doneCollecting } from "../../util/APIUtils";
import ProfilePant from "../../pant/ProfilePant";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            pantList: []
        }
        this.loadPant = this.loadPant.bind(this);
        this.handleUnCollected = this.handleUnCollected.bind(this);
        this.handleDeletePant = this.handleDeletePant.bind(this);
    }

    componentDidMount() {
        this.loadPant();
    }

    loadPant() {
        this.setState({
            isLoading: true
        })
        if (this.props.currentUser.schoolclass) {
            getSchoolPant()
                .then(response => {
                    this.setState({
                        pantList: response,
                        isLoading: false
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        isLoading: false
                    });
                });
        } else {
            getUserPant()
                .then(response => {
                    this.setState({
                        pantList: response,
                        isLoading: false
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        isLoading: false
                    });
                });
        }
    }

    handleUnCollected(id) {
        this.setState({
            isLoading: true
        });
        unCollectPant(id)
            .then(response => {
                console.log(response);
                this.setState({
                    isLoading: false
                });
            })
            .then(() => {
                this.loadPant();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            });
    }

    handleDeletePant(id) {
        this.setState({
            isLoading: true
        });
        deletePant(id)
            .then(response => {
                console.log(response);
                this.setState({
                    isLoading: false
                });
            })
            .then(() => {
                this.loadPant();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            });
    }

    handleDoneCollection(id) {
        this.setState({
            isLoading: true
        });
        doneCollecting(id)
            .then(response => {
                console.log(response);
                this.setState({
                    isLoading: false
                });
            })
            .then(() => {
                this.loadPant();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            });
    }

    render() {
        const { isLoading, pantList } = this.state;

        const allPant = pantList.map((pant, index) => {
            return (
                <ProfilePant
                    pant={pant}
                    unCollectPant={this.handleUnCollected}
                    deletePant={this.handleDeletePant}
                    isSchoolclass={this.props.currentUser.schoolclass}
                    key={index}
                />
            );
        });

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="container">
                {this.props.currentUser.schoolclass ?
                    <h1>Pant att hämta</h1>
                    :
                    <h1>Min upplagda pant</h1>
                }
                {allPant}
            </div>
        );
    }
}

export default Profile;