import React, {Component} from 'react';
// import Select from 'react-select';

// const options_sport = [
//   { value: "Football", label: 'Football' },
//   { value: "tennis", label: 'Tennis' },
//   { value: "volleyball", label: 'Volleyball' }
// ];

class EventForm extends Component {

  render() {
    return (
      <div className="event-form">
        <div>

        <h2 className="title-create-event">Create a new Game!</h2>
            <form>
                <div>
                    <select className="sport" value={this.props.sport} onChange={this.props.changeSport}>
                        <option value="" disabled selected>Select your sport</option>
                        <option value="football" selected>Football</option>
                        <option value="tennis">Tennis</option>
                        <option value="volleyball">Volleyball</option>
                    </select>
                    {/* <Select options={options_sport} value={this.props.sport} onChange={this.props.changeSport}/> */}
                </div>
                <div>
                    <select className="type" value={this.props.type} onChange={this.props.changeType}>
                        <option value="" disabled selected>Select the type</option>
                        <option value="match" selected>Match</option>
                        <option value="tournament">Tournament</option>
                        <option value="training">Training</option>
                    </select>
                </div>
                <input type="date" name="date" placeholder="Date" value={this.props.date} onChange={this.props.changeDate}/>
                <input type="time" name="hour" placeholder="Start time" value={this.props.hour} onChange={this.props.changeHour}/>
                <input type="text" name="location" placeholder="Location" value={this.props.location} onChange={this.props.changeLocation}/>
                <input type="text" name="place" placeholder="Place" value={this.props.place} onChange={this.props.changePlace}/>
                <input type="text" name="address" placeholder="Address" value={this.props.address} onChange={this.props.changeAddress}/>
                <input type="number" name="cost" placeholder="Cost" value={this.props.cost} onChange={this.props.changeCost}/>
                <input type="text" name="description" placeholder="Description" value={this.props.description} onChange={this.props.changeDescription}/>

                <button onClick={this.props.createEvent}>Submit</button>
            </form>
          </div>
        </div>
      );
  }

}

export default EventForm;
