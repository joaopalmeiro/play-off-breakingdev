import React, {Component} from 'react';
import Modal from './Modal';
import Tennis from '../../public/assets/img/tennis.svg';
import Football from '../../public/assets/img/football.svg';
import Volleyball from '../../public/assets/img/volleyball.svg';
import EventForm from './EventForm';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from '../utils/storage';

class CardEvent extends Component{

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      sport: '',
      type: '',
      username: '',
      date: '',
      hour: '',
      location: '',
      place: '',
      address: '',
      cost: '',
      description : ''
    };
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render(props) {
    const { showModal } = this.state;

    let image;

    if (this.props.sport === "Tennis") {
      image = Tennis;
    } else if (this.props.sport === "Football") {
      image = Football;
    } else {
      image = Volleyball;
    }

    return(
      <div key={this.props.id} className="CardFrame">
        <div className="CardImage">
          <div id="sportscard" dangerouslySetInnerHTML={{ __html: image }}></div>
          <div className="CardDescription">
            <h3>{this.props.sport} {this.props.type}</h3>
            <p><i className="far fa-calendar-alt"/> {this.props.date}</p>
            <p><i className="far fa-user"/> Hosted by {this.props.username}</p>
            <p><i className="fas fa-map-marker-alt"></i> {this.props.location}</p>
            <p className="eventDescription">{this.props.description}</p>
            <div>
              <button type="submit" name="submit" value="submit" onClick={() => this.handleToggleModal()}>More Information</button>

              {showModal &&
                <Modal onCloseRequest={() => this.handleToggleModal()}>
                  <div className="modalInteractionButtons">
                    <div className="modalContent">
                      <h2>{this.props.sport} {this.props.type}</h2>
                      <p><i className="far fa-calendar-alt"/> {this.props.date} &emsp;&emsp;<i className="far fa-clock"/> {this.props.hour}</p>
                      <p><i className="far fa-user"/> Hosted by {this.props.username}</p>
                      <p><i className="fas fa-map-marker-alt"></i> {this.props.place}</p>
                      <p>&emsp; {this.props.address}</p>
                      <p><i className="fas fa-coins"></i> {this.props.cost}€ per person</p><br/>
                      <p>{this.props.description}</p>
                    </div>

                    <div className="optionsEventsBar">
                      <button id="join">Join!</button>
                      <button>Talk with {this.props.username}</button>
                      <button>Share</button>
                    </div>
                  </div>
                </Modal>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      sport: '',
      type: '',
      username: '',
      date: '',
      hour: '',
      location: '',
      place: '',
      address: '',
      cost: '',
      description : '',
      createError: '',
      cardEventsMap: []
    };

    this.onChangeSport = this.onChangeSport.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeHour = this.onChangeHour.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePlace = this.onChangePlace.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.onCreateEvent = this.onCreateEvent.bind(this);

  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  onChangeSport(event) {
    this.setState({
      sport: event.target.value
    });
  }

  onChangeSport(event) {
    this.setState({
      sport: event.target.value
    });
  }

  onChangeType(event) {
    this.setState({
      type: event.target.value
    });
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onChangeDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  onChangeHour(event) {
    this.setState({
      hour: event.target.value
    });
  }

  onChangeLocation(event) {
    this.setState({
      location: event.target.value
    });
  }

  onChangePlace(event) {
    this.setState({
      place: event.target.value
    });
  }

  onChangeAddress(event) {
    this.setState({
      address: event.target.value
    });
  }

  onChangeCost(event) {
    this.setState({
      cost: event.target.value
    });
  }

  onChangeDescription(event) {
    this.setState({
      description: event.target.value
    });
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');

    if (obj && obj.token) {
      const { token } = obj;

      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log(json.username);
            this.setState({
              username: json.username
            });
          } else {
            console.log(json.message);
            this.setState({
              createError: json.message
            });
          }
      });
    }

    fetch('/api/event/all')
      .then(res => res.json())
      .then(json => {
        this.setState({
          cardEventsMap: json
        });
      });
  }

  onCreateEvent() {
    const {
      sport,
      type,
      username,
      date,
      hour,
      location,
      place,
      address,
      cost,
      description,
      createError
    } = this.state;

    let reversedDate = date.split('-').reverse().join('-');
    let sportCap = sport.charAt(0).toUpperCase() + sport.substr(1);
    let typeCap = type.charAt(0).toUpperCase() + type.substr(1);

    // POST request to backend
    fetch('/api/event/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sport: sportCap,
        type: typeCap,
        host: username,
        date: reversedDate,
        hour: hour,
        location: location,
        place: place,
        address: address,
        cost: cost,
        description: description,
        }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            createError: json.message,
            sport: '',
            type: '',
            host: '',
            date: '',
            hour: '',
            location: '',
            place: '',
            address: '',
            cost: '',
            description: '',
          });
        } else {
          this.setState({
          createError: json.message,
        });
        }
      });
  }

  render() {
    const { showModal, cardEventsMap } = this.state;

    let cardEventItems = [];

    for (var i = 0; i < cardEventsMap.length; i++) {
      cardEventItems.push(<CardEvent
        id = {i.toString()}
        sport = {cardEventsMap[i].sport}
        type = {cardEventsMap[i].type}
        date = {cardEventsMap[i].date}
        username = {cardEventsMap[i].host}
        location = {cardEventsMap[i].location}
        description = {cardEventsMap[i].description}
        place = {cardEventsMap[i].place}
        address = {cardEventsMap[i].address}
        cost = {cardEventsMap[i].cost}
        hour = {cardEventsMap[i].hour}
      />);
    }

    return(
      <div className="main">
        <div className="toolBar">
          <span className="toolBarDiv" onClick={() => this.handleToggleModal()}><i className="fas fa-plus fa-2x"/> New Match</span>
          <span className="toolBarDiv"><input className="search-bar" type="text" name="search" placeholder="Search for the perfect Game!"/></span>
          <span className="toolBarDiv">Filter <i className="fas fa-filter fa-2x"/></span>
        </div>

        <div className="container">
          {cardEventItems}
        </div>

        {showModal &&
          <Modal onCloseRequest={() => this.handleToggleModal()}>
            <EventForm
              sport = {this.state.sport}
              changeSport = {this.onChangeSport}
              type = {this.state.type}
              changeType = {this.onChangeType}
              date = {this.state.date}
              changeDate = {this.onChangeDate}
              hour = {this.state.hour}
              changeHour = {this.onChangeHour}
              location = {this.state.location}
              changeLocation = {this.onChangeLocation}
              place = {this.state.place}
              changePlace = {this.onChangePlace}
              address = {this.state.address}
              changeAddress = {this.onChangeAddress}
              cost = {this.state.cost}
              changeCost = {this.onChangeCost}
              description = {this.state.description}
              changeDescription = {this.onChangeDescription}
              createEvent = {this.onCreateEvent}
            />
          </Modal>}
      </div>
    );
  }
}

export default Main;
