import React from "react";
import { ThreeCircles } from 'react-loader-spinner';


class Loader extends React.Component {
    render() {
        return (
            <div className="adminx-content">
                <div className="adminx-main-content">
                    <div className='adminx-container d-flex justify-content-center align-items-center'>
                        <ThreeCircles color="#0d6efd" height={100} width={100} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Loader;