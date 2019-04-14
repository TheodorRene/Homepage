import React, { Component } from 'react';
import logo from './logo.svg';

class Home extends Component {
    render(){
        return(
            <div class="Flexbox">
            <h1> This is your homepage </h1>
            <div class="row">
            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo}/>
            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo}/>
            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo}/>
            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo}/>
            <Project title="Internship Vy" text="Jeg kjørte tog" img={logo}/>
            </div>
            </div>
        )
    }
}
class Profile extends Component{
    render(){
        return(
            <h1>h</h1>
        )
    }
}

class Project extends Component {
    render(){
        return(
            <div class="col col-md-6">
                <div class="card">
                    <h3 class="card-title">{this.props.title}</h3>
                    <p>{this.props.text}</p>
                    <img src={this.props.img} alt="logo" width="500" height="500"/>
        <ul class="card-actions">
                        <li><button class="button-primary">Action 1</button></li>
                        <li><button class="button-primary">Action 2</button></li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default Home;