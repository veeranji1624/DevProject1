import React, { Component } from 'react'
import {
  Col
} from 'reactstrap'

class Blog extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  render(){
    return (
      <Col md="12" className="blog-text">
        <h2 className="bold heading center">Enterprise Test Automation Strategy in DevOps</h2>
        <div className="justify blog-content">
          <p>
          In today’s modern digital Transformation scenario, Agile & DevOps are fact of life. It is the super glue that binds together and Enterprise Test Automation is right at the centre when we talk about regression & process automation, scalability, availability, security, accessibility and predictability while implementing Digital Transformation.  Without having an end to end Enterprise level automated test strategy, we cannot catch up with DevOps. 
          </p>
          <p>
          With the increased adoption of Agile + DevOps, the real question is what level of automation should a team achieve before they position themselves as Mature DevOps Organization. In reality, in spite of performing tasks manually, teams do declare that 100% DevOps principles are followed by their teams. 
          </p>
          <p>
          As quality assurance is being integrated into the sprints, continuous testing is the only way forward. To achieve the continuous testing objective, QA organizations have mostly focused their efforts on scaling up functional test design automation, test execution automation and integrating these with the CI-CD pipeline. One key area that continues to be executed out of this pipeline is Enterprise level test automation strategy. As a matter of fact, teams should analyse and answer few basic questions before they can even embark or think of integrating QA into Agile DevOps journey
          </p>
          <ul>
            <li>How much process & test automation can be done?</li>
            <li>What to do with manual tasks?</li>
            <li>Where to start and what to automate in continuous testing towards non-functional aspect?</li>
          </ul>
          <p>
          Teams need to ideate, strategize, create and implement solutions that will help implement Enterprise level test automation covering functional & non-functional tests in DevOps pipeline.
          </p>
          <p>
          Envision the following steps that gets triggered when new code for an existing application gets checked in
          </p>
          <ul>
            <li>Relevant code gets checked in</li>
            <li>Automated code scans are performed for security & performance analysis</li>
            <li>Build gets deployed to DEV for automated unit tests</li>
            <li>Automated scans get triggered to identify code changes and to flag impacted test cases which is the moved to regression test suite</li>
            <li>Upon success, build gets deployed to QA1 for automated functional regression and early performance checks</li>
            <li>
            Auto alerts and notifications on each process
            </li>
            <li>Functional scripts are auto migrated to load scripts for performance testing</li>
            <li>
            Upon success, build gets deployed to QA2 for running performance tests
            </li>
            <li>Automated dynamic application security scans and accessibility evaluations are performed and flagged for PROD deployment upon success</li>
            <li>Provides eligibility to pull out historic test results for analysis</li>
            <li>Code gets deployed to PROD and monitoring and alerts get triggered for continuous monitoring</li>
          </ul>
          <p>
          Some of these activities are typically being performed manually. To facilitate a real end to end automation including functional non-functional testing in a DevOps world, teams need to focus on developing specific point solutions to avoid manual interventions. These developments could be even in the form of automated reusable components.
          </p>
          <p>
          When building the solutions, it is essential to consider the below elements 
          </p>
          <ul>
            <li><strong>Reusability of test assets:</strong> Build flexible and scalable assets for reuse across sprints and releases</li>
            <li><strong>Measurability, Tracking and Optimization:</strong> In terms of metrics, feedbacks, monitoring etc.</li>
            <li><strong>Tool, Technology & Resource agnostic</strong></li>
          </ul>
          <p>
          DevOps is a journey. There will always be ways to improve, ideate new techniques to adopt, better collaboration techniques to implement, and so on. Getting organizations on-board with such an endeavour can be a whole journey in itself.
          </p>
          <p>
            <strong>PION Global</strong> has been focusing on building relevant solutions to address white spaces where current market tools don’t support in meeting end objective.
          </p>
        </div>
      </Col>
    )
  }
}

export default Blog;