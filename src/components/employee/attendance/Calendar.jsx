import React, { Component } from 'react'
import axios from 'axios'
import dateFns from 'date-fns'
import ViewAttendance from './ViewAttendance'

class Calendar extends Component{
  constructor(){
    super();
    this.state = {
      data: [{submitted_on: '3-2-2019'}, {submitted_on: '2-1-2019',time_in: '09:00'}],
      leaveDays: [],
      presentDays: [],
      currentMonth: new Date(),
      selectedDate: new Date(),
      isSelect: false,
      modalProp: '',
      timeProp: ''
    };
    this.mainLogic = this.mainLogic.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.back = this.back.bind(this);
    this.assignProps = this.assignProps.bind(this);
    this.checkPresence = this.checkPresence.bind(this);
    this.assignTime= this.assignTime.bind(this);
    this.clearAbsence = this.clearAbsence.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:1337/leavemanagement/select')
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => {
        this.setState({error: 'Error fetching data'})
        setTimeout(() => {this.setState({error: ''})})
      })
    this.mainLogic();
  }

  mainLogic(){
    let Ldays = [];
    let Pdays = [];
    this.state.data.forEach(item => {
      let split_arr = item.submitted_on.split('-');
      let month = parseInt(split_arr[1], 10);
      let year = parseInt(split_arr[2], 10);
        console.log(this.state.currentMonth.getFullYear(), this.state.currentMonth.getMonth()+1);
      if(!item.time_in){
        if (this.state.currentMonth.getFullYear() === year && (this.state.currentMonth.getMonth()+1) === month){
          Ldays.push(parseInt(split_arr[0], 10));        
          this.setState({leaveDays: Ldays})
        }
      }else{
        Pdays.push({day:parseInt(split_arr[0], 10), timeIn: item.time_in});
        this.setState({
          presentDays: Pdays
        })
      }
    })
  }
  
  onSelect = date => {
    this.setState({
      selectedDate: date,
//      isSelect: !this.state.isSelect
    })
  }

  back(){
    this.setState({
      isSelect: !this.state.isSelect
    })
  }

  clearAbsence(){
    this.setState({
      modalProp: '',
      timeProp: ''
    })
    this.back()
  }

  checkPresence(date){
    let r;
    this.state.presentDays.map(item => {
      if(item.day === date){
        r = item.timeIn
      }
      return r;
    })
    return r;
  }

  assignProps(){
    this.setState({
      modalProp: 'Absent'
    })
    this.back();
  }

  assignTime(data){
    this.setState({
      timeProp: data
    })
    this.back();
  }

  toggleModal(){
    return <ViewAttendance
      back={this.clearAbsence}
      date={this.state.selectedDate}
      timeData={this.state.timeProp}
      absent={this.state.modalProp} />
  }

  previousMonth(){
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
    //this.mainLogic()
  }

  nextMonth(){
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
    //this.mainLogic()
  }

  renderHeader(){
    const dateFormat = 'MMMM YYYY';

    return(
      <div className="header row flex-middle">
        {this.state.isSelect && this.toggleModal()}
        <div className="col col-start">
          <div className="icon" onClick={this.previousMonth}>
            <b>chevron_left</b>
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={this.nextMonth}>
            <b>chevron_right</b>
          </div>
        </div>
      </div>
    );
  }

  renderDays(){
    const dateFormat = 'dddd';
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for(let i = 0; i < 7; i++ ){
      days.push(dateFns.format(dateFns.addDays(startDate, i), dateFormat))
    }

    return(
      <div className="days row">{days.map(day => {
        return <div className="col col-center" key={day}><b>{day}</b></div>
      })}</div>
    )
  }

  renderCells(){
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(currentMonth);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    
    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    if(this.state.leaveDays){
      while(day <= endDate){
      for(let i = 0; i < 7; i++){
        formattedDate = dateFns.format(day, dateFormat);
        const dayClone = day;
        const timeData = this.checkPresence(parseInt(formattedDate, 10));
        if(this.state.leaveDays.indexOf(parseInt(formattedDate, 10)) > -1){
          days.push(
            <div
              className={`col cell ${!dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                  ? "selected"
                  : "leave"}`}
              key={day}
              onClick={() => this.onSelect(dateFns.parse(dayClone))}
              onDoubleClick={this.assignProps}
            >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>              
            </div>
          );
        }else{
          days.push(
            <div
              className={`col cell ${!dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                  ? "selected"
                  : ""}`}
              key={day}
              onClick={() => this.onSelect(dateFns.parse(dayClone))}
              onDoubleClick={() => this.assignTime(timeData)}
            >
              <span className="number">{formattedDate}</span>
              <span className="label-sm lead">In:</span><br />
              <span className="label-sm lead">Out:</span>
              <span className="bg">{formattedDate}</span>
            </div>
          );
        }
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = [];
    }
  }
    return <div className="body">{rows}</div>
  }

  render(){
    return(
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    )
  }
}
export default Calendar;