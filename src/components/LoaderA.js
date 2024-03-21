import React from "react"
import { Modal } from "react-bootstrap";
import { ThreeCircles } from 'react-loader-spinner';

const LoaderA = ({modal}) => (
    <Modal centered show={modal}>
        <Modal.Body>
            <div class="container" style={{padding: '100px'}}>
                <div class="row justify-content-md-center">
                    <ThreeCircles color="#0d6efd" height={100} width={100}  />
                </div>
            </div>
        </Modal.Body>
    </Modal>
)

export default LoaderA;