import React from "react";

class IdSearch extends React.Component {
    render(){
        return (
            <>
             <div className="row">
                <div className="col-md-12 col-lg-12 d-flex ">
                    <div className="card mb-grid w-100">
                        <div className="card-body">
                            <div class="input-group">
                                <center>
                                    <div class="input-group input-group-lg">
                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default IdSearch;