import React, {Component} from 'react'
import FadeIn from 'react-fade-in'
import $ from 'jquery'
import { NavLink } from 'react-router-dom';
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
                        'Orange Juice','Coffee Creamer','Coconut Milk','Butter','Cream Cheese',
                        'Ketchup','Sugar','Splenda','Sweet & Low','Hot Chocolate','Decaf','Coffee Grounds',
                        'Cups','Spoon','Forks','Knives','Coffee Filters','Paper Plates','Tea','Salt','Pepper',
                        'Red Pepper Flakes','Balsamic Vinagrette','Crushed Red Pepper',],
            shoppingList:[],
            itemLimit:[""],

        }
        this.validate = this.validate.bind(this)
        this.addToShoppingList = this.addToShoppingList.bind(this)
        this.removeFromShoppingList = this.removeFromShoppingList.bind(this)
        this.updateItemCount = this.updateItemCount.bind(this)
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
        //var itemRemoved = $('.shopping-li')[index]
        // var itemRemoved = document.getElementsByClassName('shopping-li')[index]
        // console.log('Items to be removed',itemRemoved)
        // $(itemRemoved).fadeOut()
        staticList.unshift(shoppingList[index])
        shoppingList.splice(index,1)
        this.setState({staticList:staticList,shoppingList})
    }

    updateItemCount(e){

        var userLimit = e.target.value
        var itemLimit = []

        for(var i=1;i<=userLimit;i++){
            itemLimit.push("")
        }

        //update DOM
        this.setState({itemLimit})
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

            if(this.props.type==='suggestions'){ //suggestions
                nameInput = document.getElementById('suggestion-name-input').value
                suggestionText = document.getElementById('suggestion-text').value
                if(suggestionText!==''){
                    this.setState({showThanks:true})
                    setTimeout( ()=>{
                        this.props.reload()
                    },2000)
                }
            } else if(this.props.type==='office'){ //office
                nameInput = document.getElementById('office-name-input').value
                console.log(nameInput)

                //this has to change. this is now a class
                // officeItem = document.getElementById('office-input').value
                // officeQuantity = document.getElementById('office-quantity').value


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
                        <div className="items-count-container">

                            <h2>Number of items</h2>
                            <select className="items-count" className="pulldown" onChange={this.updateItemCount}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <hr/>
                        <div id="item-container">
                            {this.state.itemLimit.map( (item,index)=>{
                                return(
                                    <div className="item-quantity-container" key={index}>
                                        <p>Item</p>
                                        <div className="item-children">
                                            <input className="office-input" type="text" className="name-input"></input>
                                            <div className="quantity-container">
                                                <p>Quantity</p>
                                                <select className="office-quantity" className="pulldown">
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
                                    </div>
                                )
                            })}
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
                        <h1>Shopping List</h1>
                        <div id="left-container">
                            <div id="items-header-container">
                                <h3>Queue:</h3>
                            </div>


                        
                            {/* <div id="shopping-name-container" className="name-container">
                                <h2>Name <span className="soften">(optional)</span></h2>
                                <input id="shopping-name-input" className="name-input"></input>
                            </div> */}
                            {/* <h1>Items</h1> */}
                            <div id="q-list-container" className="">
                                
                                <ul className="lists" id="q-list">
                                    {this.state.staticList.map( (item,index)=>{
                                        return(
                                            <FadeIn key={index} delay={200}>
                                                <div  className="item-list-children">
                                                    <li className="q-li">{item}
                                                        <button onClick={()=>this.addToShoppingList(index)} className="q-shopping-buttons"><i className="fa fa-plus q-icon"></i></button>
                                                    </li>
                                                </div>
                                            </FadeIn>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        

                        <div id="final-list" className="list-containers">
                            <div id="final-header-container">
                                <div id="final-header-container">
                                    <h3>Items:</h3>
                                </div>
                            </div>
                            <ul className="lists" id="shopping-list">
                                {this.state.shoppingList.map( (item,index)=>{
                                    return(
                                        <FadeIn key={index}>
                                            <div className="shopping-list-children">
                                                <li className="shopping-li">{item}
                                                    <button onClick={()=>this.removeFromShoppingList(index)} className="final-shopping-buttons"><i className="fa fa-close final-icon"></i></button>
                                                </li>
                                            </div>
                                        </FadeIn>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="button-container" id="shopping-button-container">
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
                                <h2>Urgency Category:</h2>
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