import React, { Component } from 'react'
import { Document, Page } from 'react-pdf'
import axios from 'axios'
import { API } from '../../../utils/routes'
import spinner from '../../../assets/img/spinner.gif'
 
class CandidateProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      file: []
    }
    this.getData = this.getData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage(){
    const {numPages, pageNumber} = this.state;
    let page = pageNumber < numPages ? pageNumber + 1 : 1;
    this.setState({ pageNumber: page})
  }

  prevPage(){
    const {pageNumber} = this.state;
    let page = pageNumber === 1 ? pageNumber : pageNumber - 1;
    this.setState({ pageNumber: page})
  }

  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(prevProps){
    if(prevProps.id !== this.props.id){
      this.getData();
    }
  }

  getData(){
    axios.get(
      `${API}/candidate/download?candId=${this.props.id}`,
      {responseType: 'blob', withCredentials: true}
    ).then(res => {
        console.log(res.data);
        this.setState({file: res.data})
      })
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {    
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <div className="card candidate-profile-card">
        <div className="candidate-profile-controls p-1">          
          <button onClick={this.prevPage} className="btn btn-sm btn-light">&larr;</button>
          <span className="label-sm bold">Profile</span>
          <span className="label-sm bold">{`(${pageNumber} / ${numPages && numPages})`}</span>
          <button onClick={this.nextPage} className="btn btn-sm btn-light">&rarr;</button>
        </div>
        <Document
          className="candidate-profile-doc"
          file={this.state.file}
          loading={
            <img
              src={spinner}
              alt="Loading..."
              height="50" style={{position: 'absolute', top: '50%', left: '50%'}} />}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>        
      </div>
    );
  }
}

export default CandidateProfile;