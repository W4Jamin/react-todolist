import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store'
import { getHandleInputChangeAction, getHandleBtnClickAction, getHandleItemClickAction } from './store/actionCreator'

export default class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = store.getState();
        console.log(store.getState())
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleStoreChange = this.handleStoreChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        store.subscribe(this.handleStoreChange)
    }

    render() {
        return (
            <div>
                <div style={{marginTop: 10, marginLeft: 10}}>
                    <Input 
                        value={this.state.inputValue} 
                        placeholder="What you want to do" 
                        style={{width: 300, marginRight: 10}} 
                        onChange={this.handleInputChange}
                        />
                    <Button 
                        type="primary"
                        onClick={this.handleBtnClick}
                        >
                        submit
                     </Button>
                </div>
                <List
                    style={{marginTop: 10, width: 300, marginLeft: 10}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => <List.Item onClick={this.handleItemClick.bind(this, index)}>{item}</List.Item>}
                >
                </List>
            </div>
        )
    }

    handleInputChange(e) {
        const action = getHandleInputChangeAction(e.target.value);
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState)
    }

    handleBtnClick() {
        const action = getHandleBtnClickAction()
        store.dispatch(action);
    }

    handleItemClick(index) {
        const action = getHandleItemClickAction(index)
        store.dispatch(action)
    }
}