import React, { Component } from 'react';
import { newPant } from "../util/APIUtils";
import {
    COLLECTTIMEFRAME_MIN_LENGTH, COLLECTTIMEFRAME_MAX_LENGTH,
    PANTVALUE_MIN_LENGTH, PANTVALUE_MAX_LENGTH
} from "../constants";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class NewPant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            address: "",
            addressForDB: "",
            postalCode: "",
            city: "",
            longitude: "",
            latitude: "",
            info: "",
            collectTimeFrame: "",
            addressError: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.register = this.register.bind(this);
    }

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                this.setState({
                    addressForDB: `${results[0].address_components[1].long_name} ${results[0].address_components[0].long_name}`,
                    address: results[0].formatted_address,
                    postalCode: results[0].address_components[6].long_name,
                    city: results[0].address_components[3].long_name
                });
                this.getCoords(results);
            })
            .catch(error => console.error('Error', error));
    };

    getCoords(results) {
        getLatLng(results[0])
            .then(latLng => this.setState({
                latitude: latLng.lat,
                longitude: latLng.lng
            }))
            .catch(error => console.log(error))
    }

    isFormInvalid() {
        return !(this.state.addressForDB && this.state.collectTimeFrame && this.state.value);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSubmit(event) {
        event.preventDefault();

        this.register();
    }

    register() {
        const newPantRequest = {
            value: this.state.value,
            address: this.state.addressForDB,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            postalCode: this.state.postalCode,
            city: this.state.city,
            collectTimeFrame: this.state.collectTimeFrame,
            collectInfo: this.state.info,

        };
        newPant(newPantRequest)
            .then(response => {
                console.log("reg success: " + response);
                this.props.history.push("/pant");
            }).catch(error => {
                console.log(error.message);
            });
        console.log(this.state);
    }
    render() {
        return (
            <div className="container">
                <h1>Lägg upp pant</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input required className="form-control" value={this.state.value} onChange={this.handleInputChange} name="value" placeholder="Värde*" />
                    </div>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="form-group">
                                <input
                                    {...getInputProps({
                                        placeholder: 'Upphämtningsadress*',
                                        className: 'form-control',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    <div className="form-group">
                        <input required className="form-control" value={this.state.collectTimeFrame} onChange={this.handleInputChange} name="collectTimeFrame" placeholder="Hämttid*" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" value={this.state.info} onChange={this.handleInputChange} name="info" placeholder="Portkod, trappor, telefonnummer" />
                    </div>
                    <small className="newpant-mandatory">* = obligatoriskt</small>
                    <br />
                    <button type="submit" className="btn btn-primary" disabled={this.isFormInvalid()}>Registrera</button>
                </form>
            </div>
        );
    }

    validatePantValue = (value) => {
        if (value.length < PANTVALUE_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `(Minst ${PANTVALUE_MIN_LENGTH} tecken behövs.)`
            }
        } else if (value.length > PANTVALUE_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `(Max ${PANTVALUE_MAX_LENGTH} tecken tillåtet.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateCollectTimeFrame = (collectTimeFrame) => {
        if (collectTimeFrame.length < COLLECTTIMEFRAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `(Minst ${COLLECTTIMEFRAME_MIN_LENGTH} tecken behövs.)`
            }
        } else if (collectTimeFrame.length > COLLECTTIMEFRAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `(Max ${COLLECTTIMEFRAME_MAX_LENGTH} tecken tillåtet.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default NewPant;