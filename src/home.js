import React, { Component } from 'react';
import logo from './logo.svg';
import theo from './theodorCv.jpg';
import water from './free.jpg';
//https://www.pexels.com/photo/photo-of-seawaves-2120101/


const terminal = {
    fontFamily:" 'IBM Plex Mono', monospace"
}


class Info extends Component {
    render() {
        return (
            <div class={main}>
                <h1 class="center-align white-text" style={terminal}> <i class="fas fa-terminal"></i> /home/theodorc </h1>
                <p class="flow-text white-text">
                    Studying computer science at NTNU, full
                    stack engineer, and Chief of server operations at the Student
                    Society in Trondheim, Norway. A passion for free software,
                        disco, vim and chess.
            </p>
            </div>
        )
    }
}
//https://api.github.com/users/theodorrene/repos
// curl ^ get names of repos
//curl https://raw.githubusercontent.com/TheodorRene/DailyPuzzles/master/makeDB.py to download readme
const git_daily = "https://github.com/TheodorRene/DailyPuzzles"
const git_spotify = "https://github.com/TheodorRene/SpotifyPlaylistPic"

const main = {
    backgroundImage: `url(${water})`,
    height: "100%",
    background: "rgba(192, 192, 192, 0.3)",
    filter: "blur(8px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center"
}

const main_child = {
    //backgroundImage: `url(${water})`,
    background: "rgba(192, 192, 192, 0.3)",
    filter: "blur(0px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%"
}
class Home extends Component {
    render() {
        return (
            <div>
                <div style={main}></div>
                <div class="container" >
                    <Info />
                    <div class="col s12 m10 offset-m1" >
                        <div class="row" >
                            <Project title="Summer internship at Tripletex" text="Developed mobile application in React Native" img={theo} />
                            <Project title="Pleieassistent at " text="Took care of elderly" img={theo} />
                            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo} />
                            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo} />
                            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo} />
                        </div>
                    </div>
                    <h1 class="center-align"> <i class="fas fa-terminal"></i> /home/theodorc/projects</h1>
                    <div class="col s12 m10 offset-m1">
                        <div class="row">
                            <Project title="DailyChess" text="Twitterbot posting chess puzzles every day" img={logo} link={git_daily} />
                            <Project title="This page" text="Page written in React" img={logo} />
                            <Project title="Playlist illustrations" text="Small bash script that generates Spotify-like playlist images" img={logo} link={git_spotify} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Project extends Component {
    render() {
        return (
            <div class="col s12 m4">
                <div class="card medium z-depth-2 ">
                    <div class="card-image">
                        <img src={this.props.img} alt="logo" />
                        <span class="card-title">{this.props.title}</span>
                        <div></div>
                    </div>
                    <div class="card-content">
                        <p>{this.props.text}</p>
                    </div>
                    <div class="card-action">
                        <a class="blue-text text-darken-2" href={this.props.link}>Githublink</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;