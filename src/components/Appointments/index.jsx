import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isStarredFilterActive: false,
    appointmentsList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    if (titleInput === '' || dateInput === '') {
      return
    }

    const dateObject = new Date(dateInput)
    const formattedDate = format(dateObject, 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickStarredFilter = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isStarredFilterActive} = this.state

    if (!isStarredFilterActive) {
      return appointmentsList
    }
    return appointmentsList.filter(eachItem => eachItem.isStarred === true)
  }

  render() {
    const {titleInput, dateInput, isStarredFilterActive} = this.state
    const filteredAppointments = this.getFilteredAppointments()
    const starredFilterClassName = isStarredFilterActive
      ? 'starred-filter-button active-filter'
      : 'starred-filter-button'

    return (
      <div className="app-bg-container">
        <div className="appointments-card">
          <div className="top-section">
            <div className="form-section">
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label htmlFor="title" className="input-label">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  className="text-input"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                />

                <label htmlFor="date" className="input-label">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  className="text-input"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>

          <hr className="separator" />

          <div className="bottom-header">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={starredFilterClassName}
              onClick={this.onClickStarredFilter}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
