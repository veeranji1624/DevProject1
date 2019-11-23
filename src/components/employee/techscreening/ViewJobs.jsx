import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import UpdateJobs from './UpdateJobs'

class ViewJobs extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.jobs.data,
      selection: null,
      update: false,
      order: true,
      page: 1,
      contains: 12
    }
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.sortData = this.sortData.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  selectPage(e){
    this.setState({ page: e.target.id })
  }

  select(item){
    this.setState({
      selection: item,
      update: true
    })
  }

  back(){
    this.setState({
      update: false
    })
  }

  sortData(){
    let array = this.state.data;
    array.sort(
      (a, b) => {
        let jobA = a.jobId.toUpperCase();
        let jobB = b.jobId.toUpperCase();
        if(jobA > jobB){
          let order = this.state.order? -1: 1;
          return order;
        }
        if(jobA < jobB){
          let order = this.state.order? 1: -1;
          return order;
        }
        return 0;
      })
    this.setState({ data: array, order: !this.state.order })
  }

  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    //  pagination    
    const { data, page, contains } = this.state;
    const length = data.length;
    const lastItem = page * contains;
    const firstItem = lastItem - contains;
    const items = data.slice(firstItem, lastItem);
    const pageNos = [];
    for(let i = 1; i <= Math.ceil(length / contains); i++){
      pageNos.push(i);
    }
    return(
      <div className={shrink}>
        {!this.state.update
          ?<Container className="container-card p-2" style={{position: 'relative'}}>
            <Link to="/employee/techscreening">
              <i className="cancel-button material-icons pointer">cancel</i>
            </Link>
            <h4 className="bold center">Jobs</h4>
            <div className="table100 ver1 m-b-110 m-4">
              <div className="table100-head">
                <table>
                  <thead>                    
                    <tr className="row100 head">
                      <th className="cell100 column1 pointer" onClick={this.sortData}>Job Id</th>
                      <th className="cell100 column2">Role</th>
                      <th className="cell100 column3">Job Description</th>
                      <th className="cell100 column4">Skillset</th>
                      <th className="cell100 column5">Experience</th>
                    </tr>                      
                  </thead>
                </table>
              </div>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                  {items.map(job =>
                    <tr
                      onClick={() => this.select(job)}
                      key={job.reqId}
                      className="row100 body">
                      <td className="cell100 column1">{job.jobId}</td>
                      <td className="cell100 column2">{job.jobRole}</td>
                      <td className="cell100 column3">{job.jobDesc}</td>
                      <td className="cell100 column4">{job.skillSet}</td>
                      <td className="cell100 column5">{job.exp}</td>
                    </tr>)
                  }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex">
              {pageNos.map(page =>
                <button
                  key={page}
                  id={page}
                  onClick={this.selectPage}
                  className="btn btn-light btn-sm label-sm">
                  {page}
                </button>
              )}
            </div>
          </Container>
          :<UpdateJobs job={this.state.selection} back={this.back} />
        }
      </div>
    )
  }
}

ViewJobs.propTypes = {
  jobs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  jobs: state.tsJobs
})

export default connect(
  mapStateToProps
)(ViewJobs);