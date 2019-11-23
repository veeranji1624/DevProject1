import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import UpdatePanel from './UpdatePanel'

class ViewPanel extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.panel.data,
      selection: null,
      update: false,
      order: true,
      page: 1,
      contains: 8
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

  sortData(){
    let array = this.state.data;
    array.sort(
      (a, b) => {
        let nameA = a.panelName.toUpperCase();
        let nameB = b.panelName.toUpperCase();
        if(nameA > nameB){
          let order = this.state.order? -1: 1;
          return order;
        }
        if(nameA < nameB){
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

    //  paginatiuon
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
            <h4 className="bold center">Panel</h4>
            <div className="table100 ver1 m-b-110 m-4">
              <div className="table100-head">
                <table>
                  <thead>                    
                    <tr className="row100 head">
                      <th className="cell100 column1 pointer" onClick={this.sortData}>Name</th>
                      <th className="cell100 column5">Email</th>
                      <th className="cell100 column5">Contact</th>
                      <th className="cell100 column5">Skype</th>
                      <th className="cell100 column5">Experience</th>
                      <th className="cell100 column5">Skills</th>                      
                      <th className="cell100 column5">Remarks</th>
                    </tr>                      
                  </thead>
                </table>
              </div>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                  {items.map(item =>
                    <tr
                      onClick={() => this.select(item)}
                      key={item.panelId}
                      className="row100 body">
                      <td className="cell100 column1">{item.panelName}</td>
                      <td className="cell100 column5">{item.email}</td>
                      <td className="cell100 column5">{item.contact}</td>
                      <td className="cell100 column5">{item.skype}</td>
                      <td className="cell100 column5">{item.exp}</td>
                      <td className="cell100 column5">{item.skills}</td>                      
                      <td className="cell100 column5">{item.remarks}</td>
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
          :<UpdatePanel item={this.state.selection} back={this.back} />
        }
      </div>
    )
  }
}

ViewPanel.propTypes = {
  jobs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  panel: state.tsPanel
})

export default connect(
  mapStateToProps
)(ViewPanel);