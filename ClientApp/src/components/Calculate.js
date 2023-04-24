import React, { Component } from "react";
import "../css/format.css"
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
export default class Calculate extends Component {
    static displayName = Calculate.name
    constructor() {
        super()
        this.onCheckingAns = this.onCheckingAns.bind(this)
        this.onAnswerChange = this.onAnswerChange.bind(this)
        this.state = { checked: false, valueInput: null, data: null , loading: true, trueAns: false}
    }
    componentDidMount(){
        this.getData()
    }
    onCheckingAns(event) {
        event.preventDefault()
        if(this.state.valueInput==this.state.data.value) this.setState({trueAns: true})
    }
    onAnswerChange(event) {
        event.preventDefault()
        this.setState({ valueInput: event.target.value })
    }
    async getData() {
        const data = await fetch("/calculate").then(respone=> respone.json())
        this.setState({ data: data, loading: false })
    }
    render() {
        let content=this.state.loading?"Loading":(
            <div>
                <h4>{this.state.trueAns?"True Answer":""}</h4>
                <div className="calculate-div">
                    <div><Input className="calculate-component" readOnly value={this.state.data.num1}></Input></div>
                    <div><Input className="calculate-component" readOnly value={this.state.data.operator}></Input></div>
                    <div><Input className="calculate-component" readOnly value={this.state.data.num2}></Input></div>
                    <div><Input className="calculate-component" readOnly value="="></Input></div>
                    <div><Input className="calculate-component" value={this.state.valueInput} onChange={this.onAnswerChange} required placeholder="Answer"></Input></div>
                </div>
                <Button onClick={this.onCheckingAns}>Check Answer</Button>
            </div>
        )
        return content
    }
}