import React, { Component, useState, useEffect } from 'react'
import { backend as backend_link } from './config'
import './css/index.css'
import Card from './components/card';
import Loading from './components/loading';
import UnderMaintenance from './components/undermaintenance'

const main = {
    background: 'rgba(192, 192, 192, 0.3)',
}

class Info extends Component {
    render() {
        return (
            <div className="main">
                <h1 className="center-align white-text">
                    <i className="fas fa-terminal" /> /home/theodorc
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
    const [isUnderMaintenance, setIsUnderMaintenance] = useState(false)

    useEffect(() => {
        // get projects
        fetch(`${backend_link}/allprojects`)
            .then(response => response.json())
            .then(projects => {
                setProjects(projects)
            }).catch(setIsUnderMaintenance(true))

        // get info
        fetch(`${backend_link}/info`, { mode: 'cors', redirect: 'follow' })
            .then(response => response.json())
            .then(info2 => setInfo(info2))
    }, [])

    return (
        <div>
            {projects && info && <Home projects={projects} info={info} />}
            { !projects && !info && !isUnderMaintenance && <Loading /> }
            { !projects && !info && isUnderMaintenance && <UnderMaintenance />}
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
    // Container for each type of projects
    ProjectsTypeWrapper = typ => {
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
                    {this.ProjectsTypeWrapper('jobb')}
                    <Title title="prosjekter" />
                    {this.ProjectsTypeWrapper('prosjekt')}
                    <Title title="engasjement" />
                    {this.ProjectsTypeWrapper('engasjement')}
                    <Title title="utdanning" />
                    {this.ProjectsTypeWrapper('utdanning')}
            </div>
        )
    }
}

const Title = (props) => <h1> <i className="fas fa-terminal" />{`home/theodorc/${props.title}`}</h1>

export default SuperHome
