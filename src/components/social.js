import React, { Component } from "react";
import Search from "./search";
import FadeIn from "react-fade-in";

import instagramImage from "../assets/ig.png";
import twitterImage from "../assets/twitter.png";

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      searchTerms: [],
      twitterData: [],
      isLoading: false
    };
    this.filterAPI = this.filterAPI.bind(this);
  }

  componentDidMount() {
    if(this.state.searchTerms>0){
      this.callBackendAPI();
    }
  }

  filterAPI(data) {
    console.log("Data in Filter API: ", data);
    this.setState({searchTerms:data})

    //need set timeout for 
    this.setState({isLoading:true})
    setTimeout(()=>{
      this.callBackendAPI()
    },10)
    this.setState({isLoading:false})
  }

  callBackendAPI = async () => {
    let query = this.state.searchTerms
    const response = await fetch('/express_backend/'+query);

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    console.log('This is the body',body)
    this.setState({twitterData:body['statuses']})
    return body;
  };

  render() {
    console.log('twitter data....',this.state.twitterData)
    let feedList = this.state.twitterData.map((item, index) => {
    let d = new Date(this.state.twitterData[index]['created_at'])
    let n = d.toDateString()
      return (
        

        <FadeIn>
          <div key={index} className="feed-children-container">
            <p className="username">{this.state.twitterData[index]['user']['name']}</p>
            <p id="screen-name" className="username">@{this.state.twitterData[index]['user']['screen_name']}</p>
            <p className="description">
              {this.state.twitterData[index]['full_text']}
            </p>
            <p className="twitter-timestamp">{n}</p>
            <div className="social-icon-container">
              <a href={'https://twitter.com/'+this.state.twitterData[index]['user']['screen_name']+'/status/'+this.state.twitterData[index]['id_str']} target="_blank">
                <img className="social-image" src={twitterImage}></img>
              </a>
            </div>
          </div>
        </FadeIn>
        
      );
    });

    return (
      <FadeIn>
        <div id="main-social-container">
          <div id="main-social-list-container">
            {feedList}
          </div>
          <div id="search-container">
            <h1>Edit Search Filter:</h1>
            <Search filterAPI={data => this.filterAPI(data)} />
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default Social;
