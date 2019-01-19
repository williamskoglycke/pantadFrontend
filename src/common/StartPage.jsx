import React, { Component } from 'react';

class StartPage extends Component {
    state = {}
    render() {
        return (
            <div className="start-page">
                <div className="jumbotron text-center">
                    <h1 className="display-4">Happy Can</h1>
                    <p className="lead">
                        Är tiden eller orken för knapp för att gå och panta dina burkar?
                        Lösningen är Happy Can! Registrera enkelt din pant och en skolklass
                        kommer och hämtar den. Slå två flugor i en smäll, eller varför inte
                        tre? Bli av med panten, hjälp en skolklass och bidra till en bättre
                        miljö!
                </p>

                    <hr className="start-page-divider my-4" />
                    <div className="happy-can-video text-center">
                        <video className="happy-can-video" controls>
                            <source src="../video/happy_can_720p.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <p>Låt din lathet rädda miljön!</p>
                </div>
            </div>


        );
    }
}

export default StartPage;