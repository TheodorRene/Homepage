import React, { Component, useState, useEffect } from 'react'
import { backend as backend_link } from './config'
import './css/index.css'
import Card from './testing';
//https://www.pexels.com/photo/photo-of-seawaves-2120101/

const main = {
    background: 'rgba(192, 192, 192, 0.3)',
}

class Info extends Component {
    render() {
        return (
            <div className="main">
                <h1 className="center-align white-text">
                    {' '}
                    <i className="fas fa-terminal" /> /home/theodorc{' '}
                </h1>
                <p className="flow-text white-text">
                    {this.props.info[0].text}
                </p>
            </div>
        )
    }
}
function SuperHome(props){
    const [projects, setProjects] = useState(null)
    const [info, setInfo] = useState(null)

    useEffect(() => {
        fetch(`${backend_link}/allprojects`)
            .then(response => response.json())
            .then(projects => {
                setProjects(projects)
            })
        fetch(`${backend_link}/info`, { mode: 'cors', redirect: 'follow' })
            .then(response => response.json())
            .then(info2 => setInfo(info2))
    }, [])

    return (
        <div>
            {projects && info && <Home projects={projects} info={info} />}
            { !projects && !info && <Loading /> }
        </div>
    )
}
function Loading(props){

    return (
        <div>
            <h1 className="loading">Laster siden        <i class="fas fa-sync fa-spin"></i></h1>
        </div>
    )
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.getProjects = this.getProjects.bind(this)
        this.getStaticLink = this.getStaticLink.bind(this)
    }

    getStaticLink = path => `${backend_link}/static/${path}`

    getProjects = typ => {
        return this.props.projects
            .filter(project => project.type === typ)
            .map(project => {
                return (
                    <Card
                        key={project.projectid}
                        title={project.title}
                        text={project.description}
                        img={this.getStaticLink(project.img_path)}
                        link={project.link}
                        date={project.date}
                    />
                )
            })
    }
    getProjectsWrapper = typ => {
        return (
            <div className="containerTo">
                {this.getProjects(typ)}
            </div>
        )
    }

    //maybe make component for project types
    render() {
        return (
            <div className="super_homepage_container">
                    <Info info={this.props.info}/>
                    {this.getProjectsWrapper('jobb')}
                    <Title title="prosjekter" />
                    {this.getProjectsWrapper('prosjekt')}
                    <Title title="engasjement" />
                    {this.getProjectsWrapper('engasjement')}
                    <Title title="utdanning" />
                    {this.getProjectsWrapper('utdanning')}
            </div>
        )
    }
}
const LinkedIn = () => {
    return (
        <div className="linkedin">
            <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="no_NO" data-type="vertical" data-theme="dark" data-vanity="theodor-rené-c-6804b589"><a class="LI-simple-link" href='https://no.linkedin.com/in/theodor-ren%C3%A9-c-6804b589?trk=profile-badge'>Theodor René C.</a></div>
        </div>
    )
}
const Title = (props) => <h1> <i className="fas fa-terminal" />{`home/theodorc/${props.title}`}</h1>

class Project extends Component {
    constructor(props) {
        super(props)
        this.getYear = this.getYear.bind(this)
        this.getMonth = this.getMonth.bind(this)
    }

    //TODO migrate to utils
    //Should maybe be pure functions
    getYear = () => new Date(this.props.date).getFullYear()
    getMonth = () => this.monthName(new Date(this.props.date).getMonth())

    monthName = i => {
        switch (i) {
            case 0:
                return 'Januar'
            case 1:
                return 'Februar'
            case 2:
                return 'Mars'
            case 3:
                return 'April'
            case 4:
                return 'Mai'
            case 5:
                return 'Juni'
            case 6:
                return 'Juli'
            case 7:
                return 'August'
            case 8:
                return 'September'
            case 9:
                return 'Oktober'
            case 10:
                return 'November'
            case 11:
                return 'Desember'
            default:
                return
        }
    }

    render() {
        return (
            <div className="col s12 m4">
                <div className="card medium z-depth-2 ">
                    <div className="card-image">
                        <img src={this.props.img} alt="logo" />
                        <span className="card-title">
                            <b>{this.props.title}</b>
                        </span>
                        <div />
                    </div>
                    <div className="card-content">
                        <p>{this.props.text}</p>
                        <p>
                            {this.getMonth()} {this.getYear()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a
                            className="blue-text text-darken-2"
                            href={this.props.link}
                        >
                            Link
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SuperHome
