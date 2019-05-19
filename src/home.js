import React, { Component } from 'react';
import logo from './logo.svg';
import theo from './theodorCv.jpg';
//https://www.pexels.com/photo/photo-of-seawaves-2120101/


const terminal = {
    fontFamily:" 'IBM Plex Mono', monospace"
}
const backend_link = 'http://localhost:8000'

const main = {
    background: "rgba(192, 192, 192, 0.3)",
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


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            projects: null,
        }
        this.getProjects = this.getProjects.bind(this)
        this.getStaticLink = this.getStaticLink.bind(this)
    }
    componentDidMount(){
        fetch(`${backend_link}/allprojects`)
            .then(response => response.json())
            .then(projects => this.setState({projects}))
    }

    getStaticLink = ( path ) => `${backend_link}/static/${path}`

    getProjects = ( typ ) => {
        return this.state.projects.filter(project => (project.type===typ)).map(project => {
            return (
                <Project 
                    key={project.projectid} 
                    title={project.title} 
                    text={project.description} 
                    img={this.getStaticLink(project.img_path)}
                    link={project.link} 
                    date={project.date}/>)
        })

    }
    //maybe make component for project types
    render(){
        return (
            <div>
                <div style={main}></div>
                <div class="container" >
                    <Info />
                    <div class="col s12 m10 offset-m1" >
                        <div class="row" >
                            {this.state.projects && this.getProjects('jobb')}
                            {!this.state.projects && <h1> Backend fetch error </h1>}
                        </div>
                    </div>
                    <h1 class="center-align"> <i class="fas fa-terminal"></i> /home/theodorc/prosjekter</h1>
                    <div class="col s12 m10 offset-m1">
                        <div class="row">
                            {this.state.projects && this.getProjects('prosjekt')}
                            {!this.state.projects && <h1> Backend fetch error </h1>}
                        </div>
                    </div>
                    <h1 class="center-align"> <i class="fas fa-terminal"></i> /home/theodorc/engasjement</h1>
                    <div class="col s12 m10 offset-m1">
                        <div class="row">
                            {this.state.projects && this.getProjects('engasjement')}
                            {!this.state.projects && <h1> Backend fetch error </h1>}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

class Project extends Component {
    constructor(props){
        super(props)
        this.getYear = this.getYear.bind(this)
        this.getMonth = this.getMonth.bind(this)
    }

    //Should maybe be pure functions
    getYear = () => new Date(this.props.date).getFullYear()
    getMonth = () => this.monthName(new Date(this.props.date).getMonth())

    monthName = (i) => {
        switch(i){
        case(0): return "Januar"; break;
        case(1): return "Februar"; break;
        case(2): return "Mars"; break;
        case(3): return "April"; break;
        case(4): return "Mai"; break;
        case(5): return "Juni"; break;
        case(6): return "Juli"; break;
        case(7): return "August"; break;
        case(8): return "September"; break;
        case(9): return "Oktober"; break;
        case(10): return "November"; break;
        case(11): return "Desember"; break;
        }
    }

    render() {
        return (
            <div class="col s12 m4">
                <div class="card medium z-depth-2 ">
                    <div class="card-image">
                        <img src={this.props.img} alt="logo" />
                        <span class="card-title" ><b>{this.props.title}</b></span>
                        <div></div>
                    </div>
                    <div class="card-content">
                        <p>{this.props.text}</p>
                        <p>{this.getMonth()} {this.getYear()}</p>
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
