import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTsCandidates } from '../../../redux/actions/tsCandidateActions'
import UpdateCandidate from './UpdateCandidate'
import { Container } from 'reactstrap'

class ViewCandidates extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.candidates.data,
      selection: null,
      update: false,
      sort: true,
      page: 1,
      contains: 8
    }
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.sortData = this.sortData.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  selectPage(e){
    this.setState({
      page: e.target.id
    })
  }

  select(item){
    this.setState({
      selection: item,
      update: true
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

  back(){
    this.setState({
      update: false
    })
  }

  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';  
    //Pagination
    const { data, page, contains } = this.state;
    const length = data.length;
    const lastItem = page * contains;
    const firstItem = lastItem - contains;
    const items = data.slice(firstItem, lastItem);
    const pageNos = [];
    for(let i = 1; i <= Math.ceil(length / contains); i++){
      pageNos.push(i);
    }
    console.log(pageNos)
    return(
      <div className={shrink}>
        {!this.state.update
          ?<Container className="container-card p-2" style={{position: 'relative'}}>
            <Link to="/employee/techscreening">
              <i className="cancel-button material-icons pointer">cancel</i>
            </Link>
            <h4 className="bold center">Candidates</h4>
            <div className="table100 ver1 m-b-110 m-4">
              <div className="table100-head">
                <table>
                  <thead>                    
                    <tr className="row100 head">
                      <th className="cell100 column1 pointer" onClick={this.sortData}>Job Id</th>
                      <th className="cell100 column5">Name</th>                      
                      <th className="cell100 column5">Email</th>
                      <th className="cell100 column5">Contact</th>
                      <th className="cell100 column5">Skype</th>
                      <th className="cell100 column5">Status</th>
                      <th className="cell100 column5">Panel</th>
                      <th className="cell100 column5">Screening</th>
                      <th className="cell100 column5">Tech</th>
                      <th className="cell100 column5">Feedback</th>
                    </tr>                      
                  </thead>
                </table>
              </div>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                  {items.map(candidate =>
                    <tr
                      onClick={() => this.select(candidate)}
                      key={candidate.candId}
                      className="row100 body">
                      <td className="cell100 column1">{candidate.jobId}</td>
                      <td className="cell100 column5">{candidate.candName}</td>
                      <td className="cell100 column5">{candidate.email}</td>
                      <td className="cell100 column5">{candidate.contact}</td>
                      <td className="cell100 column5">{candidate.skypeId}</td>
                      <td className="cell100 column5">{candidate.status}</td>
                      <td className="cell100 column5">{candidate.panelName}</td>
                      <td className="cell100 column5">{candidate.scrStatus}</td>
                      <td className="cell100 column5">{candidate.feedStatus}</td>
                      <td className="cell100 column5">{candidate.comment}</td>
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
          :<UpdateCandidate candidate={this.state.selection} back={this.back} />
        }
      </div>
    )
  }  
}

ViewCandidates.propTypes = {
  candidates: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  candidates: state.tsCandidates
})

export default connect(
  mapStateToProps,
  { getTsCandidates }
)(ViewCandidates);
