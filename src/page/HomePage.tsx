import React from 'react';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Raymond Thornley</h1>

                <div className="infoSection">
                    <h4 className="infoSectionTitle">Work Experience</h4>
                    <span className="infoSectionLine">Software Developer, Infosys Ltd, October 2017-February 2020</span>
                    <span className="infoSectionLine">Expert Services UI for John Deere</span>
                    <ul className="infoSectionList">
                        <li className="infoSectionListItem">Developed a front-end application in JavaScript</li>
                        <li className="infoSectionListItem">Utilized JavaScript libraries including React, Redux and Axios</li>
                        <li className="infoSectionListItem">Collaborated with ten coworkers remotely in an Agile environment</li>
                        <li className="infoSectionListItem">Created a testing environment using Enzyme and Jest</li>
                    </ul>
                    <span className="infoSectionLine">Indy Hub Website</span>
                    <ul className="infoSectionList">
                        <li className="infoSectionListItem">Developed an application in TypeScript and Java</li>
                        <li className="infoSectionListItem">Utilized Spring in the back-end and React in the front-end</li>
                        <li className="infoSectionListItem">Collaborated in Scrum with eight to fifteen coworkers</li>
                        <li className="infoSectionListItem">Created a front-end testing environment using Enzyme and Jest</li>
                    </ul>
                </div>

                <div className="infoSection">
                    <h4 className="infoSectionTitle">Skills</h4>
                    <span className="infoSectionLine">Languages: Java, JavaScript, SQL</span>
                    <span className="infoSectionLine">JavaScript Libraries: React, Redux, Axios, TypeScript</span>
                </div>

                <div className="infoSection">
                    <h4 className="infoSectionTitle">Education</h4>
                    <span className="infoSectionLine">Bachelor of Science in Computer Science, December 2015</span>
                    <span className="infoSectionLine">College of Science and Engineering, University of Minnesota: Twin Cities</span>
                    <span className="infoSectionLine">GPA: 3.234 Minor in Mathematics</span>
                    <span className="infoSectionLine">GRADS Project, Software Engineering I, Fall 2014</span>
                    <ul className="infoSectionList">
                        <li className="infoSectionListItem">Collaborated with three other students</li>
                        <li className="infoSectionListItem">Implemented a system using the waterfall design model</li>
                        <li className="infoSectionListItem">Programmed and tested the system in Java</li>
                    </ul>
                    <span className="infoSectionLine">University of Minnesota Talented Youth Mathematics Program (Fall 2005-Spring 2010)</span>
                </div>
            </div>
        );
    }
}

export default HomePage;
