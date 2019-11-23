import React, { Component } from 'react'
import { Document, Page } from 'react-pdf'

//const bypassCors = "https://cors-anywhere.herokuapp.com/";

class DocumentViewer extends Component{
  constructor(){
    super();
    this.state = {
      numPages: null,
      pageNo: 1
    }
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }
  onDocumentLoadSuccess({ numPages }){
    this.setState({ numPages });
  }
  previousPage(){
    this.setState({
      pageNo: this.state.pageNo - 1
    })
  }
  nextPage(){
    this.setState({
      pageNo: this.state.pageNo + 1
    })
  }
  render(){
    const { pageNo } = this.state;    
    //const blob = new Blob([this.props.file], {type: 'application/pdf'});
    //const link = window.URL.createObjectURL(blob);
    return(
      <div className="doc-container">
        
        <div className="doc-nav">
          {/*<span className="doc-nav-button" onClick={ this.previousPage }>
            Prev
          </span>
          <span className="doc-nav-button" onClick={ this.nextPage }>
            Next
          </span>*/}
        </div>
        <div className="doc-item">
          <i
            className="material-icons cancel-button pointer"
            onClick={() => this.props.close()}>
            cancel
          </i>
          <Document
            file={this.props.file}
            onLoadSuccess={ console.error }
          >
            <Page pageNumber={ pageNo } />
          </Document>                    
        </div>
        <div style={{display: 'fixed', justifyContent: 'center', bottom: 0}}>
          {/*<p>Page { pageNo } of { numPages }</p>*/}
        </div>
      </div>
    )
  }
}

export default DocumentViewer;