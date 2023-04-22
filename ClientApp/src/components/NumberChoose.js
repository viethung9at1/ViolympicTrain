import React, { Component } from "react";
import "../css/format.css"
export class NumberChoose extends Component {
    static displayName = NumberChoose.name;
    static orNum = 1
    constructor() {
        super()
        this.state = { buttonArray: [], loading: true }
    }
    componentDidMount() {
        this.getButton()
    }
    async getButton() {
        const btnArr = await fetch("numberchoose")
        const arrJSon = await btnArr.json()
        this.setState({ buttonArray: arrJSon, loading: false })
    }
    static renderTable(btnArr) {
        return (
            <div className="table">
                <ButtonTable btnArray={btnArr} orderNumberToHide={this.orNum} />
            </div>
        )
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : NumberChoose.renderTable(this.state.buttonArray)
        return (
            <div>{contents}</div>
        )
    }
}
function ButtonRow({ rowArray }) {
    return (
        <tr>
            {
                rowArray.map(row =>
                    <td><ButtonCell data={row.text} order={row.ordinaryToChoose} /></td>)
            }
        </tr>
    )
}
class ButtonCell extends Component {
    constructor(props) {
        super(props)
        this.data=props.data
        this.order=props.order
    }
    clicked(){
        if(this.order==NumberChoose.orNum) NumberChoose.orNum++
        console.log(this.order)
        console.log(NumberChoose.orNum)
        this.forceUpdate()
    }
    isHide(){
        if(this.order<NumberChoose.orNum) return true;
        else return false
    }
    render() {
        return (
            <button className="cell" onClick={() => this.clicked()}>{this.isHide() ? "" : this.data}</button>
        )
    }
}
function ButtonTable({ btnArray }) {
    let cnt = Math.sqrt(btnArray.length)
    let rowArr = []
    for (let i = 0; i < cnt; i++) {
        rowArr.push(btnArray.slice(i * cnt, i * cnt + cnt))
    }
    return (
        <table>
            {
                rowArr.map(row =>
                    <ButtonRow rowArray={row} />)
            }
        </table>
    )
}