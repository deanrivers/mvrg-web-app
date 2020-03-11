import React, {Component} from 'react'
import FadeIn from 'react-fade-in'
var randomstring = require("randomstring");


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
                    name:'',
                    request:'',
                    category:'',
                    id:'',
                    date:''
                }
            },
            staticList:['Diet Soda','Keurig Pods','Popcorn','Milk','Heavy Cream','Half & Half',
                        'Orange Juice','Coffee Dreamer','Coconut Milk','Butter','Cream Cheese',
                        'Ketchup','Sugar','Splenda','Sweet & Low','Hot Chocolate','Decaf','Coffee Grounds',
                        'Cups','Spoon','Forks','Knoves','Coffee Filters','Paper Plates','Tea','Salt','Pepper',
                        'Red Pepper Flakes','Balsamic Vinagrette','Crushed Red Pepper'],
            shoppingList:[]

        }
        this.validate = this.validate.bind(this)
        this.addToShoppingList = this.addToShoppingList.bind(this)
        this.removeFromShoppingList = this.removeFromShoppingList.bind(this)
    }

    addToShoppingList(index){
        var shoppingList = this.state.shoppingList
        var staticList = this.state.staticList
        shoppingList.push(staticList[index])
        staticList.splice(index,1)       
        this.setState({staticList:staticList,shoppingList})
    }

    removeFromShoppingList(index){
        var shoppingList = this.state.shoppingList
        var staticList = this.state.staticList
        staticList.unshift(shoppingList[index])
        shoppingList.splice(index,1)
        this.setState({staticList:staticList,shoppingList})
    }

    validate(){
        try{
            //general variables
            var nameInput

            //set variables for suggestion box
            var suggestionText
            var officeItem
            var officeQuantity
            var checkedbox
            var list = []

            //set variables for work
            var workRequestText
            var urgencyValue
            
            
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
                checkedbox = document.getElementById('office-checkbox').checked
                if(nameInput!==''&&officeItem!==''&&checkedbox){
                    this.setState({showThanks:true})
                    setTimeout( ()=>{
                        this.props.reload()
                    },2000)
                }
            } else if(this.props.type==='work'){//work
                nameInput = document.getElementById('work-name-input').value
                workRequestText = document.getElementById('work-text').value
                urgencyValue = document.getElementById('urgency-select').value
                if(nameInput!==''&&workRequestText!==''){
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
                            <select id="office-quantity" className="pulldown">
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
                    <div id="checkbox-container">
                        <input id="office-checkbox" type="checkbox"/>
                        <span>I have checked and confirmed these items are <u>not</u> in the supply closets.</span>
                    </div>
                    <div className="button-container">   
                        <button onClick={this.props.reload} className="button">Cancel</button>
                        <button onClick={this.validate} className="button">Submit</button>
                    </div>
                </div>
        } else if(this.props.type==='kitchen'){
            console.log('kitchen')
            html=<div className="form-container-children">
                    <div id="main-shopping-container">
                        <div className="list-containers">
                            <h1>Items</h1>
                            <ul className="lists" id="shopping-list">
                                {this.state.staticList.map( (item,index)=>{
                                    return(
                                        <FadeIn delay={200}>
                                            <div key={index} className="item-list-children">
                                                <li>{item}
                                                    <button onClick={()=>this.addToShoppingList(index)} className="shopping-buttons"><i class="fa fa-plus"></i></button>
                                                </li>
                                            </div>
                                        </FadeIn>
                                    
                                    )
                                })}
                            </ul>
                            
                        </div>

                        <div className="list-containers">
                            <h1>Shopping List</h1>
                            <ul className="lists" id="shopping-list">
                                {this.state.shoppingList.map( (item,index)=>{
                                    return(
                                        <FadeIn>
                                            <div key={index} className="shopping-list-children">
                                                <li>{item}
                                                    <button onClick={()=>this.removeFromShoppingList(index)} className="shopping-buttons"><i className="fa fa-close"></i></button>
                                                </li>
                                            </div>
                                        </FadeIn>
                                        
                                    
                                    
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="button-container">
                        <button onClick={this.props.reload} className="button">Cancel</button>
                        <button onClick={this.validate} className="button">Submit</button>
                        
                    </div>
                </div>
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
            var date = new Date()
            var jobNumber = randomstring.generate(7)
            html = <div id="work">
                        <div id="work-top-row">
                            <div className="name-container">
                                <h2>Name:</h2>
                                <input id="work-name-input" className="name-input" type="text"></input>
                            </div>

                            <div id="urgency-container">
                                <h1>Urgency Category:</h1>
                                <select id="urgency-select" className="pulldown">
                                    <option value='when possible'>When Possible</option>
                                    <option value='one day'>One Day</option>
                                    <option value='one week'>One Week</option>
                                    <option value='emergency'>Emergency</option>
                                </select>
                            </div>
                            
                        </div>

                        <div id="suggestions-box-container">
                            <h2>Request:</h2>
                            <textarea id="work-text"></textarea>
                        </div>
                        
                        
                        <div id="job-number-container">
                            <span>#{jobNumber}</span>
                            <span> Date: {date.toDateString()}</span>
                        </div>

                      

                        <div className="button-container">
                            <button onClick={this.props.reload} className="button">Cancel</button>
                            <button onClick={this.validate} className="button">Submit</button>
                        </div>
                    </div>
        } else{
            console.log('something went wrong.')
        }

        return(
            <div id="form-template-container">
                <FadeIn>
                    {this.state.showThanks?<p style={{textAlign:'center'}}>Thanks! you will now be redirected to the forms page</p>:html}
                </FadeIn>
                
            </div>
        )
    }
}

export default FormTemplate