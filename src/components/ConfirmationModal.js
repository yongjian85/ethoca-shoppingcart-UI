import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

class ConfirmationModal extends Component {



    render() {
        const { lineItems, isShowModal, closeModalParentCallBack } = this.props;


        return (
            <Modal show={isShowModal} onHide={() => closeModalParentCallBack()}>
                <Modal.Header closeButton>
                    <Modal.Title>Thanks for your purchase!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>item</th>
                                <th>quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((lineItem, index) => (
                                <tr>
                                    <td>{lineItem.productName}</td>
                                    <td>{lineItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        )

    }
}

export default ConfirmationModal
