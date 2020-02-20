import React, {Component} from 'react'
import Search from './search'
import FadeIn from 'react-fade-in'



import instagramImage from '../assets/ig.png'
import twitterImage from '../assets/twitter.png'


class Social extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [1,2,3,4,5,6,7,8,9,10],
        }
       
    }




    render(){



        let feedList = this.state.list.map( (item,index)=>{
        return(
            
                <div key={index} className="feed-children-container" >  
                    <p className="username">@username</p>
                    <p className="description">Sed ut perspiciatis unde omnis iste
                        natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam
                        natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam.
                    </p>
                    <div className="social-icon-container">
                        <img className="social-image" src={instagramImage}></img>
                    </div>
                </div>
            
            
            
        )})

        return(
            <div id="main-social-container">
                
               <div id="main-social-list-container">
                    <FadeIn transitionDuration={500} delay={400}>
                        {feedList}  
                    </FadeIn>
                                      
                </div> 
                
                <div id="search-container">
                    <h1>Edit Search Filter:</h1>
                    <Search/>                
                </div>
            </div>
            
        )
    }
}

export default Social