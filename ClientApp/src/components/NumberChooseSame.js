import React, { Component, useState } from "react";
import { Button } from "reactstrap";
import { ReactDOM } from "react";
import "../css/format.css"
export class NumberChooseSame extends Component {
    static displayName = NumberChooseSame.name
    static hideList = []
    constructor() {
        super()
        this.state = { buttonArray: [], loading: true }
        this.btnArr = this.state.buttonArray
    }
    componentDidMount() {
        this.getButton()
    }
    async getButton() {
        const btnArr = await fetch("numberchoose/same/64")
        const arrJson = await btnArr.json()
        this.setState({ buttonArray: arrJson, loading: false })
        this.btnArr = arrJson
    }
    render() {
        let content = this.state.loading ? "Loading" : <ButtonArray data={this.state.buttonArray} />
        return content
    }
}
function ButtonArray({ data }) {
    let [update, setUpdate] = useState(false)
    let countClick = 0
    let val1, val2, id1, id2
    function onBtnClick(value, index) {
        countClick++
        if (countClick == 1) {
            val1 = value
            id1 = index
        }
        else {
            val2 = value
            id2 = index
            if (val1 == val2) {
                NumberChooseSame.hideList.push(id1)
                NumberChooseSame.hideList.push(id2)
                countClick = 0
                setUpdate(!update)
            }
        }
    }
    let btnArr = []
    let btnPerRow = Math.sqrt(data.length)
    for (let i = 0; i < btnPerRow; i++) {
        btnArr.push(data.slice(i * btnPerRow, (i + 1) * btnPerRow))
    }
    let content = (
        <div>
            <table className="table">
                {
                    btnArr.map(row => <ButtonRow data={row} onBtnClick={onBtnClick} hideList={NumberChooseSame.hideList} />)
                }
            </table>
        </div>
    )
    return content
}
function ButtonRow({ data, onBtnClick, hideList }) {
    return (
        <tr>{
            data.map(cell =>
                <td colSpan={2}><NumberButton onBtnClick={onBtnClick} data={cell} hide={hideList.includes(cell.id)} /></td>)}
        </tr>
    )
}
class NumberButton extends Component {
    constructor(props) {
        super()
        this.onBtnClick = props.onBtnClick
        this.data = props.data
        this.hide = props.hide
    }
    render() {
        return <button className="same-choose-cell" onClick={this.onBtnClick(this.data.value, this.data.id)}>{this.hide ? "" : this.data.text}</button>
    }
}