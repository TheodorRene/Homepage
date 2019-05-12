import React, { Component } from 'react';
import logo from './logo.svg';
import theo from './theodorCv.jpg';
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
    height: "100%",
    background: "rgba(192, 192, 192, 0.3)",
    filter: "blur(8px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center"
}


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            projects: null,
        }
        this.getProjects = this.getProjects.bind(this)
    }
    componentDidMount(){
        fetch('http://localhost:8000/allprojects')
            .then(response => response.json())
            .then(projects => this.setState({projects}))
    }

    getProjects = ( typ ) => {
        return this.state.projects.filter(project => (project.type===typ)).map(project => {
            return (<Project title={project.title} text={project.description} img={`./images/${project.img_path}`} link={project.link}/>)
        })

    }
    render(){
        return (
            <div>
                <div style={main}></div>
                <div class="container" >
                    <Info />
                    <div class="col s12 m10 offset-m1" >
                        <div class="row" >
                            {this.state.projects && this.getProjects('jobb')}
                        </div>
                    </div>
                    <h1 class="center-align"> <i class="fas fa-terminal"></i> /home/theodorc/projects</h1>
                    <div class="col s12 m10 offset-m1">
                        <div class="row">
                            {this.state.projects && this.getProjects('prosjekt')}
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
                        <a class="blue-text text-darken-2" href={this.props.link}>Link</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;
