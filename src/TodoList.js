import React, { Component, Fragment } from 'react';
import axios from 'axios'
import './style.css'
import TodoItem from './TodoItem'

class TodoList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)
    }

    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor="insertArea">Enter event: </label>
                    <input
                        id={"insertArea"}
                        className='input'
                        value={this.state.inputValue}
                        ref={(input) => {this.input = input}}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleBtnClick}>
                        submit
                    </button>
                </div>
                <ul ref={(ul) => {this.ul = ul}}>
                    { this.getTodoItem()  }
                </ul>
            </Fragment>

        )
    }

    // 只会执行一次，把ajax请求放在这边
    componentDidMount() {
        axios.get('api/todolist')
        .then((res) => {
            this.setState(() => {
                list: [...res.data]
            })
        })
        .catch(() => {alert('error')})
    }

    getTodoItem() {
        return this.state.list.map((item, index) => {
            return (
                <TodoItem
                    key={index}
                    content={item}
                    index={index}
                    deleteItem={this.handleItemDelete}
                />
                )
            }
        )
    }

    handleInputChange() {
        const value = this.input.value;
        this.setState(() => {
            return {inputValue: value};
        })
    }

    handleBtnClick() {
        // setState 异步执行，提升性能，后面可以接一个回调函数
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }), () => {
            console.log(this.ul.querySelectorAll('div').length)
        });
    }

    handleItemDelete(index) {
        // immutable
        // change copy
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list: list};
        });
    }
}

export default TodoList;