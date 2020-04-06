import React, {Component} from 'react'
import FadeIn from 'react-fade-in'
import FormTemplate from './form-template'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Form extends Component{
    constructor(props){
        super(props)
        this.state = {
            formArr: ['Office Supply reorder form',
            'Kitchen shopping list',
            'Suggestions box',
            'Lunch order form',
            'Office Work Miscellaneous'],
            formChildActive: false,
            formType: ''
        }

        this.renderForm = this.renderForm.bind(this)
        this.reloadView = this.reloadView.bind(this)
    }

    renderForm(e){
        e.preventDefault()
        var formType = e.target.value
        var typeDict = {
            0:'office',
            1:'kitchen',
            2:'suggestions',
            3:'lunch',
            4:'work'
        }
        
        this.setState({formChildActive:true,formType:typeDict[formType]})
        console.log(this.state)
    }

    reloadView(){
        this.setState({formChildActive:false})
    }

    render(){
        var home = <div id="form-choices-container">
        <FadeIn delay={100}>
        {this.state.formArr.map( (item,index)=>{
            return(                                
                <div className="form-choice-children" key={index}>
                    <button onClick={this.renderForm} value={index}>{item}</button>
                </div> 
            )
        })}
        </FadeIn>
    </div>

        var html = !this.state.formChildActive?home:<FormTemplate type={this.state.formType} reload={()=>this.reloadView()}/>
        //var html = !this.state.formChildActive?home:<Route path="/forms/form-template" component={()=><FormTemplate type={this.state.formType} reload={()=>this.reloadView()}/>} />
        return(
            <div id="form-homepage-container">
                    {html}
                    
            </div>
        )
    }
}

export default Form