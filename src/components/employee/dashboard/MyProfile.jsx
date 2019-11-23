import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class MyProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.employee || {}
    }
  }
    
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale' : shrink = 'no-scale';
    const { data } = this.state;
    return (
      <div className={shrink}>
        <h5 className="center bold">My Profile</h5>
        <Container className="card container-card">
          <h6 className="p-3">Welcome, <em>{localStorage.getItem('username')}</em></h6>
          {data
          ?<Row>
            <Col md="4" className="form-col">
              <div>
                <p className="label-sm m-2">Mobile Number : {data.mobileNumber}</p>
                <p className="label-sm m-2">Email Address : {data.email}</p>
                <p className="label-sm m-2">Date of Birth : {data.dob}</p>
                <p className="label-sm m-2">Gender : {data.genderType}</p>
                <p className="label-sm m-2">Employment : {data.empType}</p>
                <p className="label-sm m-2">Present Address : {data.presentAddr}</p>
                <p className="label-sm m-2">Permenant Address : {data.permanentAddr}</p>
                <p className="label-sm m-2">Date of Join : {data.dateOfJoin}</p>
                <p className="label-sm m-2">Designation : {data.designation}</p>
                <p className="label-sm m-2">Personal Email : </p>
                <p className="label-sm m-2">Blood Group : {data.bloodGroup}</p>
              </div>
            </Col>
            <Col md="4" className="form-col">
              <div>
                <p className="label-sm m-2">Marital Status : {data.maritalStatus}</p>                
                <p className="label-sm m-2">Spouse Name : {data.spouseName}</p>
                <p className="label-sm m-2">Spouse Contact : {data.spouseContact}</p>
                <p className="label-sm m-2">Father's Name : {data.fatherName}</p>
                <p className="label-sm m-2">Home Contact No : {data.homeContact}</p>
                <p className="label-sm m-2">Other Dependant : {data.otherDepend}</p>
                <p className="label-sm m-2">Emergency Contact :{data.contactPerson}</p>
                <p className="label-sm m-2">Emer Contact No. : {data.emerContact}</p>
                <p className="label-sm m-2">Emer Cont Relation : {data.personRelation}</p>
                <p className="label-sm m-2">Total Experience : {data.experience}</p>
                <p className="label-sm m-2">Offered CTC : {data.ctc}</p>
              </div>
            </Col>
            <Col md="4" className="form-col">
              <div>
                <p className="label-sm m-2">Qualification : {data.qualification}</p>
                <p className="label-sm m-2">Prev Employer :</p>
                <p className="label-sm m-2">PAN Number : {data.pan}</p>
                <p className="label-sm m-2">Aadhar Number : {data.aadhar}</p>
                <p className="label-sm m-2">Passport Number : {data.passportNo}</p>
                <p className="label-sm m-2">Name of bank : {data.bankName}</p>
                <p className="label-sm m-2">Bank Record Name : {data.nameInBank}</p>
                <p className="label-sm m-2">Bank Account No : {data.accountNo}</p>
                <p className="label-sm m-2">Bank Account Type : {data.accountType}</p>
                <p className="label-sm m-2">Bank IFSC code : {data.ifscCode}</p>
                <p className="label-sm m-2">PF Account No : {data.pfNo}</p>
              </div>
            </Col>
          </Row>
          :null}
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

MyProfile.propTypes = {
  employee: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  employee: state.data,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  {},
)(MyProfile);