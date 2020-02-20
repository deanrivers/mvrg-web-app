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
        //Twitter creds
        //API key:OgBtfenn7MGg0OqJdJiT0SV27
        //API secret key:r2nn8JKZlYpSknTe04UBipP4UL54n7A6rS2qg0kBXVhftOBGYL
        //Access token :1230503856813084672-OhPWOMQgk1mxeXNyeX4nc4ViewDOhq
        //Access token secret :pE8tMwuX91YhsGZfoVuKuCPt3FM9Yy2eRtye5zmeD819Z
        //Bearer Token: AAAAAAAAAAAAAAAAAAAAAMaGCgEAAAAAo%2Fs2TjoIE3SWvpCdtyGniPj6qJU%3DIpGfkVWWJ12R53Pelk1N0aWYkvfnhWD4GkV8FiqjzAHJBq1Umq

        

        var Twit = require('twit')
 
        var T = new Twit({
        consumer_key:         'OgBtfenn7MGg0OqJdJiT0SV27',
        consumer_secret:      'r2nn8JKZlYpSknTe04UBipP4UL54n7A6rS2qg0kBXVhftOBGYL',
        access_token:         '1230503856813084672-OhPWOMQgk1mxeXNyeX4nc4ViewDOhq',
        access_token_secret:  'pE8tMwuX91YhsGZfoVuKuCPt3FM9Yy2eRtye5zmeD819Z',
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            false,     // optional - requires SSL certificates to be valid.
        })

       this.callBackendAPI()
    }

    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        console.log(body)
        return body;
      };

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