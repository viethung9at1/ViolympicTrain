import React, { Component, useState  } from "react";
import "../css/format.css"
import Button from 'react-bootstrap/Button';
export class NumberChooseSame extends Component {
    static displayName = NumberChooseSame.name;
    static choosing
    constructor() {
        super()
        this.state = { buttonArray: [], loading: true }
    }
    componentDidMount() {
        this.getButton()
    }
    static hideList = []
    async getButton() {
        const btnArr = await fetch("numberchoose/same/64")
        const arrJSon = await btnArr.json()
        this.setState({ buttonArray: arrJSon, loading: false })
    }
    static renderTable(btnArr) {
        return (
            <div className="table">
                <ButtonTable btnArray={btnArr} />
            </div>
        )
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : NumberChooseSame.renderTable(this.state.buttonArray)
        return (
            <div>
                <h1>Choose the tiles with same value, pair by pair</h1>
                {contents}
            </div>
        )
    }
}
function ButtonRow({ rowArray, onBtnClick }) {
    return (
        <tr>
            {
                rowArray.map(row =>
                    <td><ButtonCell data={row} onBtnClick={(id, value) => onBtnClick(id, value)} /></td>)
            }
        </tr>
    )
}
class ButtonCell extends Component {
    constructor(props) {
        super(props)
        this.data = props.data
        this.choosing = props.choosing
        this.onBtnClick = props.onBtnClick
    }
    render() {
        return (
            <Button className="same-choose-cell" onClick={() => this.onBtnClick(this.data.id, this.data.value)} >{NumberChooseSame.hideList.includes(this.data.id) ? "" : this.data.text}</Button>
        )
    }
}
function ButtonTable({ btnArray }) {
    let cnt = Math.sqrt(btnArray.length)
    let rowArr = []
    let [hideList, setHideList] = useState([])
    let [choosing, setChoosing] = useState(-1)
    let id1, val1, id2, val2, cntClick = 0
    function clickTest(id, value) {
        cntClick++
        if (cntClick == 1) {
            id1 = id
            val1 = value
            setChoosing(id1)
        }
        if (cntClick == 2) {
            id2 = id
            val2 = value
            if (val1 == val2 && id1 != id2) {
                setHideList(hideList.push(id2))
                setHideList(hideList.push(id1))
                NumberChooseSame.hideList = hideList.slice(0, hideList.length)
            }
            setChoosing(-1)
            cntClick = 0
        }
    }
    for (let i = 0; i < cnt; i++) {
        rowArr.push(btnArray.slice(i * cnt, i * cnt + cnt))
    }
    return (
        <div>
            <h5>Choosing cell {choosing}</h5>
            <table>
                {
                    rowArr.map(row =>
                        <ButtonRow rowArray={row} onBtnClick={(id, value) => clickTest(id, value)} />)
                }
            </table>
        </div>
    )
}