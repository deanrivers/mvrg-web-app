import React, {Component} from 'react'

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            list: [1,2,3,4,5,6,7,8,9,10],
            defaultSearchTerms: ['MVRG','Marketing','Market Research','Church & Dwight','Phillip Morris'],
            searchTerms:[]
        }
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.updateText = this.updateText.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
        this.filterResults = this.filterResults.bind(this)
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            console.log(data)
        })
    }

    addItem(){
        let searchTerms = this.state.searchTerms
        if(this.state.text.trim() !==''){
            searchTerms.push(this.state.text)
            this.setState({searchTerms,text:''})
        } else{
            this.setState({searchTerms,text:''})
        }        
    }

    removeItem(index){
        console.log('This is the index:',index)
        let searchTerms = this.state.searchTerms
        searchTerms.splice(index,1)
        this.setState({searchTerms})
    }

    updateText(e){
        let text = e.target.value
        this.setState({text})
    }

    resetFilter(){
        let searchTerms = this.state.searchTerms
        searchTerms = []
        this.setState({searchTerms})
    }

    filterResults(){

    }

    render(){
        return(
            <div id="search-elements">
                {this.state.defaultSearchTerms.map( (item,index) => {
                    return(
                        <div key={index} className="search-term-children">
                            <input type="checkbox" id={item} value={item}></input>
                            <label for={item}>{item}</label>
                        </div>            
                        )
                    })}
                    
                {this.state.searchTerms.map( (item,index) =>{
                    return(
                        <div key={index} className="search-term-children">
                            <input type="checkbox" id={item} value={item}></input>
                            <label for={item}>{item}</label>
                            <button className="close-button" onClick={()=>this.removeItem(index)}><i className="fa fa-close"></i></button>
                        </div> 
                    )
                } )}
                <div id="add-item-container">
                    <input id="add-input" value={this.state.text} onChange={(e)=>this.updateText(e)} placeholder="Add Keyword..."></input>
                    <button id="add-button" className="button" onClick={this.addItem}>Add</button>
                </div>
                <div id="button-container">
                    <button id="filter-button" className="button" onClick={this.filterResults} >Filter</button>
                    <button id="reset-button" className="button" onClick={this.resetFilter} >Reset</button>
                </div>
                
            </div>    
        )
    }
}

export default Search