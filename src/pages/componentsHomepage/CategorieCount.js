import React from 'react';
import axios from 'axios';

class CategorieCount extends React.Component {
    state={
        couter: ''
    }

    componentDidMount = () => {
        axios.get(`categorie_cvs/${this.props.data}`).then(response => {
            this.setState({
                couter: response.data.counter
            })
        })
    }

    render() {
        return (
            <>
                <span class="badge rounded-pill bg-info text-dark">+  0{this.state.couter} CV</span>
            </>
        )
    }
}

export default CategorieCount;