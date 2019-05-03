import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';
import './styles/todo.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MaterialIcon, { colorPalette } from 'material-icons-react';


export default class ToDo extends Component {
    state = {
        show: false
    }
    todoName;
    todoDate;
    toDos = [{
        id: 1,
        name: 'Learn React',
        date: new Date().toDateString()
    },
    {
        id: 2,
        name: 'Learn Angular',
        date: new Date().toDateString()
    },
    {
        id: 3,
        name: 'Learn Vue',
        date: new Date().toDateString()
    }]

    deleteDo = (id) => {
        this.toDos = this.toDos.filter((todo) => id !== todo.id)
        this.setState(this.toDos);
    }

    addToDo = () => {
        console.log(this.todoName);

        let toDo = {
            id: this.toDos.length + 1,
            name: this.todoName.value,
            date: new Date(this.todoDate.value).toDateString()
        }
        this.toDos.push(toDo);
        this.setState(this.toDos);
    }

    setTodoName = (ref) => {
        this.todoName = ref;
    }

    setTodoDate = (ref) => {
        this.todoDate = ref;
    }


    showDialog = () => {
        this.state.show = true;
        this.setState(this.state);
    }

    closeDialog = () => {
        this.state.show = false;
        this.setState(this.state);
    }
    render() {

        return (
            <div>
                <ol>
                    <li className="header">
                        <span className="todo-id">#</span>
                        <span className="todo-name">Name</span>
                        <span className="todo-date">Date</span>
                        <span> Action</span>
                    </li>
                    {this.toDos.map(todo => {
                        return (<li key={todo.id}>
                            <span className="todo-id">
                                {todo.id}
                            </span>
                            <span className="todo-name">
                                {todo.name}
                            </span>
                            <span className="todo-date">
                                {todo.date}
                            </span>
                            <button className="btn" onClick={() => this.deleteDo(todo.id)}>
                                <MaterialIcon icon="delete" color="red" />

                            </button>
                        </li>)
                    })
                    }
                </ol>
                <button className="btn btn-primary fab-btn" onClick={() => { this.showDialog() }}>
                    <MaterialIcon icon="add" color="white" />
                </button>

                <Modal show={this.state.show} onHide={this.closeDialog} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTodoName">
                                <Form.Label>Todo Name</Form.Label>
                                <Form.Control ref={ref => { this.setTodoName(ref) }} type="text" placeholder="Enter name of the todo" />
                            </Form.Group>

                            <Form.Group controlId="formTodoDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" ref={ref => { this.setTodoDate(ref) }} placeholder="Select date" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-warning" onClick={() => this.closeDialog()}>Close</button>
                        <button className="btn btn-primary" onClick={() => { this.closeDialog(); this.addToDo() }}> Save Changes </button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }


}