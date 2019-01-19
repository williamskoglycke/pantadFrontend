import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from "../constants";
import Can from './Can';

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.33,
            lng: 18.07
        },
        zoom: 10
    };

    render() {
        const varjePant = this.props.pantLista.map((pant, index) => {
            return (
                <Can
                    key={index}
                    lat={pant.latitude}
                    lng={pant.longitude}
                    pant={pant}
                    collectPant={this.props.collectPant}
                    unCollectPant={this.props.unCollectPant}
                    isSchoolclass={this.props.isSchoolclass}
                />
            );
        })

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {varjePant}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
