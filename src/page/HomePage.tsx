import React from 'react';
import { Row, Col } from 'react-bootstrap';

class HomePage extends React.Component {
    render() {
        return (
            <div className="mainPage">
                <h1 className="mainPageTitle">Raymond Thornley</h1>
                <Row style={{ marginRight: 0 }}>
                    <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ order: 1, span: 3, offset: 0 }} >
                        <div className="infoSection">
                            <h4 className="infoSectionTitle">About me</h4>
                            <span className="infoSectionLine">Raymond Thornley is a 25 year old living in the Twin Cities.</span>
                            <img className="profilePicture" src={"RaymondThornley.jpg"} alt="" />
                            <a href="https://www.linkedin.com/in/raymond-thornley-481847bb/" className="externalLink">
                                <img src={"LI-In-Bug.png"} className="linkImage" alt="" />View my LinkedIn&trade; profile</a>
                            <a href="https://github.com/RaymondThornley" className="externalLink">
                                <img src={"GitHub-Mark-32px.png"} className="linkImage" alt="" />View my GitHub&trade; profile</a>
                        </div>
                    </Col>

                    <Col xs={12} sm={{ span: 10, offset: 1 }} lg={{ span: 7, offset: 1 }}>
                        <div className="infoSection">
                            <h4 className="infoSectionTitle">Work Experience</h4>
                            <span className="infoSectionLine">I worked for Infosys as a Software Developer from October 2017 to February 2020.</span>
                            <span className="infoSectionLine">During that time I was a part of two major projects:</span>
                            <span className="infoSectionLine">The first project was the Expert Services UI for John Deere.</span>
                            <ul className="infoSectionList">
                                <li className="infoSectionListItem">The project is a website for John Deere employees and equipment dealers to track and manage equipment mantinence checklists.</li>
                                <li className="infoSectionListItem">I refactored multiple React.js components to match the latest React and Javascript standards.</li>
                                <li className="infoSectionListItem">I updated the components to use Redux and the API calls to Axios.</li>
                                <li className="infoSectionListItem">I worked remotely with ten other programmers, most of them in India, in an Agile environment.</li>
                                <li className="infoSectionListItem">I set up the front end testing environment using Enzyme and Jest.</li>
                            </ul>
                            <span className="infoSectionLine">The second project was the Indy Hub Website.</span>
                            <ul className="infoSectionList">
                                <li className="infoSectionListItem">The project is an internal website for the Infosys Indianapolis hub.</li>
                                <li className="infoSectionListItem">I started the development if an application in TypeScript and Java.</li>
                                <li className="infoSectionListItem">We used Spring in the back-end and React in the front-end.</li>
                                <li className="infoSectionListItem">I worked with a varying ammount of coworkers in Scrum. This varied from eight to fifteen other, mostly new hires fresh from college.</li>
                                <li className="infoSectionListItem">I set up the front end testing environment using Enzyme and Jest.</li>
                            </ul>
                        </div>

                        <div className="infoSection">
                            <h4 className="infoSectionTitle">Skills</h4>
                            <span className="infoSectionLine">My primary programming language is Javascript, with two years project experience using it with React, Redux and Axios.</span>
                            <span className="infoSectionLine">I also have experience with Typescript, and training with Java and SQL.</span>
                        </div>

                        <div className="infoSection">
                            <h4 className="infoSectionTitle">Education</h4>
                            <span className="infoSectionLine">I attended the University of Minnesota from August 2012 to December 2015.</span>
                            <span className="infoSectionLine">I got my Bachelor of Science in Computer Science with a minor in Mathematics after 3 and a half years.</span>
                            <span className="infoSectionLine">I was in the College of Science and Engineering in the University of Minnesota in the Twin Cities.</span>
                            <span className="infoSectionLine">I graduated with a GPA of 3.234 and did one major project.</span>
                            <span className="infoSectionLine">The GRADS Project done during the class Software Engineering 1 that I took in Fall 2014.</span>
                            <ul className="infoSectionList">
                                <li className="infoSectionListItem">The project is a Java application to check if students reached the graduation requirements.</li>
                                <li className="infoSectionListItem">I worked with with three other students.</li>
                                <li className="infoSectionListItem">We implemented a system using the waterfall design model.</li>
                                <li className="infoSectionListItem">We programmed and tested the system in Java.</li>
                            </ul>
                            <span className="infoSectionLine">I attended the University of Minnesota Talented Youth Mathematics Program from Fall 2005 to Spring 2010, while I was in middle and high school.</span>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HomePage;
