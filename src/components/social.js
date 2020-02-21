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
      searchTerms: ["Search Term"],
      twitterData: []
    };
    this.filterAPI = this.filterAPI.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI();
  }

  filterAPI(data) {
    console.log("Data in Filter API: ", data);
  }


  callBackendAPI = async () => {
      let query = this.state.searchTerms
      const response = await fetch('/express_backend');

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
    console.log(this.state.twitterData.length)
    let feedList = this.state.twitterData.map((item, index) => {
      return (
        <div key={index} className="feed-children-container">
          <p className="username">{this.state.twitterData[index]['user']['name']}</p>
          <p className="description">
            {this.state.twitterData[index]['text']}
          </p>
          <div className="social-icon-container">
            <img className="social-image" src={twitterImage}></img>
          </div>
        </div>
      );
    });

    return (
      <div id="main-social-container">
        <div id="main-social-list-container">
          {/* <FadeIn transitionDuration={500} delay={400}> */}
            {feedList}
          {/* </FadeIn> */}
        </div>

        <div id="search-container">
          <h1>Edit Search Filter:</h1>
          <Search filterAPI={data => this.filterAPI(data)} />
        </div>
      </div>
    );
  }
}

export default Social;
