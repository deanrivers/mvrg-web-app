import React, {Component} from 'react'

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            list: [1,2,3,4,5,6,7,8,9,10],
            defaultSearchTerms: ['Marketing'],
            searchTerms:[],
            twitterData: [],
            queryTerms: []
        }
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.updateText = this.updateText.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
        this.filterResults = this.filterResults.bind(this)
        this.queryChange = this.queryChange.bind(this)
    }
     

    addItem(){
        let searchTerms = this.state.searchTerms
        if(this.state.text.trim() !==''){
            searchTerms.push(this.state.text)
            this.setState({searchTerms,text:''})
        } else{
            
            let el = document.getElementById('add-input')
            el.classList.add('input-wiggle')
            setTimeout(function(){
                el.classList.remove('input-wiggle');
            }, 500);
            this.setState({searchTerms,text:''})
        }
    }

    removeItem(index,item){
        console.log('This is the index:',index)
        let searchTerms = this.state.searchTerms
        searchTerms.splice(index,1)
        this.setState({searchTerms})

        //remove from queryterms array
        let queryTerms = this.state.queryTerms
        var queryIndex = queryTerms.indexOf(item) //find index of the item to be removed
        queryTerms.splice(queryIndex,1)
        this.setState({queryTerms})

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
        this.props.filterAPI(this.state.queryTerms)
    }

    queryChange(e){
        let queryTerms = this.state.queryTerms
        //add to query array if checked true
        if(e.target.checked){
            queryTerms.push(e.target.value)
        } else if(!e.target.checked){
            var index = queryTerms.indexOf(e.target.value) //find index of the item to be removed
            queryTerms.splice(index,1)
        }
        this.setState({queryTerms})
        console.log(this.state.queryTerms)
    }

    render(){
        return(
            <div id="search-elements">
                {this.state.defaultSearchTerms.map( (item,index) => {
                    return(
                        <div key={index} className="search-term-children">
                            <input type="checkbox" id={item} value={item} onClick={(e)=>this.queryChange(e)}></input>
                            <label className="search-item-label" for={item}>{item}</label>
                        </div>            
                        )
                    })}
                    
                {this.state.searchTerms.map( (item,index) =>{
                    return(
                        <div key={index} className="search-term-children">
                            <input type="checkbox" id={item} value={item} onClick={this.queryChange}></input>
                            <label className="search-item-label" for={item}><span>{item}</span></label>
                            <button className="close-button" onClick={()=>this.removeItem(index,item)}><i className="fa fa-close"></i></button>
                        </div> 
                    )
                })}
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