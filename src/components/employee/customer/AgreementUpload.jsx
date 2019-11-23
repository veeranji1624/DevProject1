import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'
import DocumentViewer from '../../aside/DocumentViewer'

class AgreementUpload extends Component {
  constructor(){
    super();
    this.state = {
      file: [],
      docs: [],      
      view: false,
      name: '',
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getData = this.getData.bind(this);    
    this.getDocs = this.getDocs.bind(this);
    this.viewDocs = this.viewDocs.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
  }

  onChange(e){
    this.setState({
      file: e.target.files[0] || [],
      name: e.target.files[0].name || ''
    })
  }

  onSubmit(){
    let file = this.state.file;    
    let fd = new FormData();
    fd.append('agrmntName', file);    
    //for (var pair of fd.entries()) {
      //console.log(pair[0]+ ', ' + pair[1]); 
    //}

    axios.post(`${API}/companydocs/upload`, fd, {withCredentials: true})
      .then(res => {
        const data = {
          docId: res.data.ID,
          compCode: this.props.comp
        }
        axios.post(`${API}/companydocs/update`, data, {withCredentials: true})
          .then(res => {
            console.log(res.data);
            this.setState({
              message: 'Attachment added suuccessfully',
              docs: res.data
            })
            setTimeout(() => {this.setState({message: null})}, 5000)
          })
          .catch(err => {
            this.setState({error: 'Upload failed'})
            setTimeout(() => {this.setState({error: null})}, 5000)
          })
      })
      .catch(err => {this.setState({error: 'Upload failed'})});
      setTimeout(() => {this.setState({error: null})}, 5000)
  }

  getData(){
    const data = {
      compCode: this.props.comp
    }
    axios.post(`${API}/companydocs/select`, data, {withCredentials: true})
      .then(res => {        
        this.setState({
          docs: res.data
        })
      })
  }

  componentDidMount(){
    this.getData();
  }

  getDocs(file){
    axios.get(`${API}/companydocs?docId=${file.docId}`,
        {responseType: 'blob'},
        {withCredentials: true}
      )
      .then(res => {
        // let length = res.data.length;
        // let bytes = new Uint8Array(length);
        // for(var i=0; i<length; i++){
        //   bytes[i] = res.data.charCodeAt(i);
        // }
        // this.setState({
        //   file: res.data
        // })
        //let blob = new Blob(res.data, {type: 'application/pdf'});
        let file = res.data;
        console.log(file);
        this.setState({
          file: res.data
        })
        this.viewDocs();
      })
  }

  viewDocs(){
    this.setState({
      view: !this.state.view
    })
  }
  
  deleteDoc(file){
    const data = {
      docId: file.docId
    }
    console.log(data);
    axios.post(`${API}/companydocs/delete`, data, {withCredentials: true})
      .then(res => {
        console.log(res.data);
        this.setState({
          message: 'Attachment deleted successfully',          
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
        this.getData();
      })
      .catch(err => {
        this.setState({
          error: 'Could not delete'
        })
        setTimeout(() => {
          this.setState({error: null})
        }, 5000)
      })
  }


  render(){    
    return(
      <div className="center">
        <hr />
        <h6 className="center bold">Attachments</h6>
        {this.state.docs &&
          this.state.docs.map(file => {
          return <span
            key={file.docId}            
            className="m-3 card document-card pointer">
            <i
              className="material-icons cancel-button pointer"
              onClick={() => this.deleteDoc(file)}>
            cancel</i>
            <p onClick={() => this.getDocs(file)} className="bold label-sm p-2">
              {file.agrmntName}
            </p>
          </span>
        })
        }
        <hr />
        <label htmlFor="file" className="bold label-sm">
          Add new attachment :
        </label>
        <input
          type="file"
          name="file"
          className="form-control-sm"
          style={{fontSize: '11px'}}
          onChange={this.onChange} />
        <input
          type="Submit"
          value="Upload"
          style={{fontSize: '10px'}}
          onClick={this.onSubmit} />
          <hr />          
          {this.state.message && <Notifier message={this.state.message} />}
          {this.state.error && <ErrorNotifier message={this.state.error} />}
          {this.state.view && <DocumentViewer close={this.viewDocs} file={this.state.file} />}
      </div>
    )
  }
}
export default AgreementUpload;