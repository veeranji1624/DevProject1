import React, { Component } from "react";
import {
  Container,
  Table
} from "reactstrap";

class Landing extends Component {
  render() {
    return (
      <div>
        <h4 className="bold center">My Requirements</h4>
        <Container className="center">
          <Table className="employee-table">
            <thead className="table-header">
              <tr>
                <th>Details</th>
                <th>Reqr. Code</th>
                <th>Company Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Designation</th>
                <th>Positions</th>
                <th>Created on</th>
                <th>Category</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
          </Table>
        </Container>
      </div>
    );
  }
}
export default Landing;