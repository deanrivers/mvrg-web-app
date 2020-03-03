import React, {Component} from 'react'
import FadeIn from 'react-fade-in'


class FormTemplate extends Component{
    constructor(props){
        super(props)
        this.state={
            showThanks:false,
            formValues:{
                office:{
                    name: '',
                    item:'',
                    quantity:0

                },
                kitchen:{

                },
                suggestions:{
                    name:'',
                    suggestions:''
                },
                lunch:{

                },
                work:{

                }
            }
        }
        this.validate = this.validate.bind(this)
    }

    validate(){
        try{
            //general variables
            var nameInput

            //set variables for suggestion box
            var suggestionText
            var officeItem
            var officeQuantity
            
            console.log(nameInput)

            
            if(this.props.type==='suggestions'){ //suggestions
                nameInput = document.getElementById('suggestion-name-input').value
                suggestionText = document.getElementById('suggestion-text').value
                if(nameInput!==''&&suggestionText!==''){
                    this.setState({showThanks:true})
                    setTimeout( ()=>{
                        this.props.reload()
                    },2000)
                }
            } else if(this.props.type==='office'){ //office
                nameInput = document.getElementById('office-name-input').value
                officeItem = document.getElementById('office-input').value
                officeQuantity = document.getElementById('office-quantity').value
                if(nameInput!==''&&officeItem!==''){
                    this.setState({showThanks:true})
                    setTimeout( ()=>{
                        this.props.reload()
                    },2000)
                }
            }
            
        } catch(error){
            console.log(error)
        }
    }

    render(){
        
        var html
        console.log(this.props)

        //determing html to render
        if(this.props.type==='office'){
            console.log('office')
            html=<div id="office">
                    <div className="name-container">
                        <h2>Name <span className="soften">(optional)</span></h2>
                        <input id="office-name-input" className="name-input"></input>
                    </div>
                    <div id="office-items-container">
                        <div id="item-container">
                            <p>Item</p>
                            <input id="office-input" type="text" className="name-input"></input>  
                        </div>
                        <div id="quantity-container">
                            <p>Quantity</p>
                            <select id="office-quantity">
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-container">   
                        <button onClick={this.props.reload} className="button">Cancel</button>
                        <button onClick={this.validate} className="button">Submit</button>
                    </div>
                    <div id="checkbox-container">
                        <input type="checkbox"/>
                        <p>I have checked and confirmed these items are <u>not</u> in the supply closets.</p>

                    </div>
                </div>
        } else if(this.props.type==='kitchen'){
            console.log('kitchen')
        } else if(this.props.type==='suggestions'){
            console.log('suggestions')
            html=<div className="form-container-children">
                    <h1>Suggestions Box</h1>
                    <div className="name-container">
                        <h2>Name <span className="soften">(optional)</span></h2>
                        <input id="suggestion-name-input" className="name-input" type="text"></input>
                    </div>
                    <div id="suggestions-box-container">
                        <h2>Suggestions:</h2>
                        <textarea id="suggestion-text"></textarea>
                    </div>
                    <div className="button-container">
                        <button onClick={this.props.reload} className="button">Cancel</button>
                        <button onClick={this.validate} className="button">Submit</button>
                        
                    </div>
                </div>
        } else if(this.props.type==='lunch'){
            console.log('lunch')
        } else if(this.props.type==='work'){
            console.log('work')
        } else{
            console.log('something went wrong.')
        }

        return(
            <div id="form-template-container">
                <FadeIn>
                    {this.state.showThanks?<p>Thanks! you will now be redirected to the forms page</p>:html}
                </FadeIn>
                
            </div>
        )
    }
}

export default FormTemplate