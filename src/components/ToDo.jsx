import React, { Component } from 'react';
import './styles/todo.css';
import MaterialIcon from 'material-icons-react';
import Dialog from './Dialog'

export default class ToDo extends Component {
    state = {
        show: false,
        edit: false,
        selectedTodo: {
            name: 'test',
            id: '',
            date: ''
        }
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

    getTitle = () => {
        if (this.state.edit) {
            return 'Edit Todo';
        }
        else {
            return 'Add New Todo'
        }
    }

    deleteDo = (id) => {
        this.toDos = this.toDos.filter((todo) => id !== todo.id)
        this.setState(this.toDos);
    }

    addToDo = () => {
        let toDo = {
            id: this.toDos.length + 1,
            name: this.todoName.value,
            date: new Date(this.todoDate.value).toDateString()
        }
        this.toDos.push(toDo);
        this.setState(this.toDos);
    }

    enableEditTodo = (id) => {
        this.setState({ show: true, edit: true });
        let todo = this.toDos.filter(todo => id === todo.id)[0];
        this.setState({
            selectedTodo: {
                name: todo.name,
                date: this.setDate(todo.date),
                id: todo.id
            }
        });
    }
    setDate = (date) => {
        let tmpDate = new Date(date);
        let yr = tmpDate.getFullYear();
        let mn = tmpDate.getMonth() < 9 ? '0' + (tmpDate.getMonth() + 1) : tmpDate.getMonth() + 1;
        let dt = tmpDate.getDate() < 9 ? '0' + tmpDate.getDate() : tmpDate.getDate();
        return [yr, mn, dt].join('-');
    }
    editTodo = () => {

        this.toDos = this.toDos.map((x) => {
            if (x.id == this.state.selectedTodo.id) {
                x.name = this.todoName.value;
                x.date = new Date(this.todoDate.value).toDateString()
                return x;
            } else {
                return x;
            }
        })

        console.log(this.toDos)

        this.setState(this.toDos);
    }
    setTodoName = (ref) => {
        this.todoName = ref;
        console.log("set name", this.todoName)
    }

    setTodoDate = (ref) => {
        this.todoDate = ref;
    }

    showDialog = () => {
        // this.state.show = true;
        this.setState({ show: true, edit: false, selectedTodo: { name: '' } });
    }

    closeDialog = () => {
        // this.state.show = false;
        this.setState({ show: false });
    }

    handle = (attr, event) => {
        this.setState({
            selectedTodo: {
                attr: event.target.value
            }
        })

    }
    submitTodo = () => {
        if (this.state.edit) {
            this.editTodo();
        } else {
            this.addToDo();
        }
    }

    change = name => event => {
        alert(event.target.value)
        this.setState({
            [name]: event.target.value,
        });
    };
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
                            <button className="btn" onClick={() => this.enableEditTodo(todo.id)}>
                                <MaterialIcon icon="edit" color="black" />

                            </button>

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

                <Dialog
                    state={this.state}
                    closeDialog={this.closeDialog}
                    getTitle={this.getTitle}
                    setTodoDate={(ref) => this.setTodoDate(ref)}
                    setTodoName={(ref) => this.setTodoName(ref)}
                    submitTodo={() => this.submitTodo()}
                />
            </div>

        )
    }


}