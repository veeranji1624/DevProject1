import React from 'react'
import {
  Card
} from 'reactstrap'
import Calendar from './Calendar'

const Attendance = ({sidebar}) => {
  let shrink;
  sidebar? shrink = 'scale': shrink =  'no-scale';
  return(
    <div className={shrink}>
      <Card className="details-card mb-3 p-5 m-3 left shadow">
        <h5 className="pointer bold center pt-2 mb-2">
          Attendance
        </h5>
          <Calendar />
      </Card>
    </div>
  )
}

export default Attendance;