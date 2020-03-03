import React, {Component} from 'react'
import FadeIn from 'react-fade-in'

class Games extends Component{
    constructor(props){
        super(props)
        this.state = {
            games:[
                {game: <a target="_blank" href="https://www.y8.com/games/color_lines"><img alt="Color Lines" class="playable" src="https://img-hws.y8.com/cloud/v2-y8-thumbs-small-thumbnails-001/129707/small.gif" /><br />Color Lines<br />Play Now!</a>},
                {game: <a target="_blank" href="https://www.y8.com/games/magic_poly_3d"><img alt="Magic Poly 3D" class="playable" src="https://img-hws.y8.com/cloud/v2-y8-thumbs-small-thumbnails-001/129450/small.gif" /><br />Magic Poly 3D<br />Play Now!</a>},
                {game: <a target="_blank" href="https://www.y8.com/games/hurdles"><img alt="Hurdles" class="playable" src="https://img-hws.y8.com/cloud/v2-y8-thumbs-small-thumbnails-001/128659/small.gif" /><br />Hurdles<br />Play Now!</a>}
            ]
           
        }
    }

    render(){
        return(
            <FadeIn>
                <div id="main-game-container">
                    {this.state.games.map( (item,index)=>{
                        return(
                            <div className="game-containers" key={index}>
                                {item.game}
                            </div>  
                        )
                    })}
                </div>
            </FadeIn>
        )
    }
}

export default Games