import React, { Component } from 'react';

class ProfilePant extends Component {

    render() {
        const { pant, isSchoolclass, unCollectPant, deletePant } = this.props;
        return (
            <div className="your-pant">
                <div className="pantInfo">
                    <p>Uppskattat värde: {pant.value}</p>
                    <p>Adress: {pant.address}, {pant.postalCode} {pant.city}</p>
                    {isSchoolclass &&
                        <React.Fragment>
                            <p>Namn: {pant.userName}</p>
                            <p>Mail till annonsör: {pant.userEmail}</p>
                        </React.Fragment>
                    }
                    <p>Hämttid: {pant.collectTimeFrame}</p>
                    <p>Övrig info: {pant.collectInfo}</p>
                </div>

                {isSchoolclass &&
                    <div className="pant-buttons">
                        <button className="pantButton btn btn-success" onClick={() => {
                        deletePant(pant.id)
                    }}>Har hämtat</button>
                        <button className="pantButton btn btn-secondary btn-sm" onClick={() => {
                        unCollectPant(pant.id)
                        }}>Ångra</button>
                    </div>
                }

                {!isSchoolclass &&
                    <button className="pantButton btn btn-secondary btn-sm" onClick={() => {
                        deletePant(pant.pantId)
                    }}>Ta bort</button>
                }

            </div>
        );
    }
}

export default ProfilePant;