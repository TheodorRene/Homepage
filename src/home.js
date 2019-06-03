import React, { Component } from 'react';
import { backend as backend_link } from './config'; 
//https://www.pexels.com/photo/photo-of-seawaves-2120101/


const terminal = {
    fontFamily:" 'IBM Plex Mono', monospace"
}

const main = {
    background: "rgba(192, 192, 192, 0.3)",
}

class Info extends Component {
    constructor(props){
        super(props)
        this.state = {
            info: null,
        }
    }

    componentDidMount() {
        fetch(`${backend_link}/info`, {mode:'cors',redirect:'follow'})
            .then(response => response.json())
            .then(info => this.setState({info}))
    }
    render() {
        return (
            <div className={main}>
                <h1 className="center-align white-text" style={terminal}> <i className="fas fa-terminal"></i> /home/theodorc </h1>
                <p className="flow-text white-text">
                    {this.state.info && this.state.info[0].text}
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
                <div className="container" >
                    <Info />
                    <div className="col s12 m10 offset-m1" >
                        <div className="row" >
                            {this.state.projects && this.getProjects('jobb')}
                            {!this.state.projects && <h1> Backend fetch error </h1>}
                        </div>
                    </div>
                    <h1 className="center-align"> <i className="fas fa-terminal"></i> /home/theodorc/prosjekter</h1>
                    <div className="col s12 m10 offset-m1">
                        <div className="row">
                            {this.state.projects && this.getProjects('prosjekt')}
                            {!this.state.projects && <h1> Backend fetch error </h1>}
                        </div>
                    </div>
                    <h1 className="center-align"> <i className="fas fa-terminal"></i> /home/theodorc/engasjement</h1>
                    <div className="col s12 m10 offset-m1">
                        <div className="row">
                            {this.state.projects && this.getProjects('engasjement')}
                            {!this.state.projects && <h1> Backend fetch error </h1>}
                        </div>
                    </div>
                    <h1 className="center-align"> <i className="fas fa-terminal"></i> /home/theodorc/utdanning</h1>
                    <div className="col s12 m10 offset-m1">
                        <div className="row">
                            {this.state.projects && this.getProjects('utdanning')}
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

    //TODO migrate to utils
    //Should maybe be pure functions
    getYear = () => new Date(this.props.date).getFullYear()
    getMonth = () => this.monthName(new Date(this.props.date).getMonth())

    monthName = (i) => {
        switch(i){
        case(0): return "Januar"; 
        case(1): return "Februar";
        case(2): return "Mars"; 
        case(3): return "April";
        case(4): return "Mai";
        case(5): return "Juni";
        case(6): return "Juli";
        case(7): return "August";
        case(8): return "September";
        case(9): return "Oktober";
        case(10): return "November";
        case(11): return "Desember";
            default: return;
        }
    }

    render() {
        return (
            <div className="col s12 m4">
                <div className="card medium z-depth-2 ">
                    <div className="card-image">
                        <img src={this.props.img} alt="logo" />
                        <span className="card-title" ><b>{this.props.title}</b></span>
                        <div></div>
                    </div>
                    <div className="card-content">
                        <p>{this.props.text}</p>
                        <p>{this.getMonth()} {this.getYear()}</p>
                    </div>
                    <div className="card-action">
                        <a className="blue-text text-darken-2" href={this.props.link}>Link</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;
