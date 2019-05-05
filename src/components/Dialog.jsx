import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';

export default class Dialog extends Component {
    render() {
        return (
            <Modal show={this.props.state.show} onHide={this.props.closeDialog} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.getTitle()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTodoName">
                            <Form.Label>Todo Name</Form.Label>
                            <Form.Control defaultValue={this.props.state.selectedTodo.name} ref={ref => { this.props.setTodoName(ref) }} type="text" placeholder="Enter name of the todo" />
                        </Form.Group>

                        <Form.Group controlId="formTodoDate">
                            <Form.Label>Date</Form.Label>
                            {/*<input type="date" value={this.props.state.date} onChange={this.change('date')} />*/}

                            <Form.Control type="date" defaultValue={this.props.state.selectedTodo.date} ref={ref => { this.props.setTodoDate(ref) }} placeholder="Select date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-warning" onClick={() => this.props.closeDialog()}>Close</button>
                    <button className="btn btn-primary" onClick={() => { this.props.closeDialog(); this.props.submitTodo() }}> Save Changes </button>
                </Modal.Footer>
            </Modal>
        );
    }
}