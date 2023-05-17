import React from "react";

class Loader extends React.Component {
    render() {
        return (
            <center>
                <div class="spinner-border" style={{"width": "3rem", "height": "3rem"}}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </center>
        )
    }
}

export default Loader;