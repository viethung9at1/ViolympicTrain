import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import "../css/format.css"
export default function ChooseFunction() {
    const navigate = useNavigate()
    const goToSameChoose = () => {
        navigate("/number-choose-same")
    }
    const goToIncChoose = () => {
        navigate("/number-choose-inc")
    }
    return (
        <div className="choose-function-div">         
           <div> <Button onClick={goToSameChoose} className="choose-function-button">Choose the same number in tiles</Button> </div>
           <div><Button onClick={goToIncChoose} className="choose-function-button">Choose the tiles follow increase order</Button> </div>
        </div>
    )
}