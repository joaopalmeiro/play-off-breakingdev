const Event = require('../../models/Event');

module.exports = (app) => {
    app.post('/api/event/create', (req, res, next) => {
        const {
            body
        } = req;

        const {
            sport,
            type,
            host,
            date,
            hour,
            location,
            place,
            address,
            description,
            cost
        } = body;

        if (!sport) {
            return res.send({
              success: false,
              message: "Error: Sport cannot be blank."
            });
          }
      
          if (!type) {
            return res.send({
              success: false,
              message: "Error: Type cannot be blank."
            });
          }
      
          if (!host) {
            return res.send({
              success: false,
              message: "Error: Host cannot be blank."
            });
          }

          if (!date) {
            return res.send({
              success: false,
              message: "Error: Date cannot be blank."
            });
          }

          if (!hour) {
            return res.send({
              success: false,
              message: "Error: Hour cannot be blank."
            });
          }

          if (!location) {
            return res.send({
              success: false,
              message: "Error: Location cannot be blank."
            });
          }

          if (!place) {
            return res.send({
              success: false,
              message: "Error: Place cannot be blank."
            });
          }

          if (!address) {
            return res.send({
              success: false,
              message: "Error: Address cannot be blank."
            });
          }

          if (!description) {
            return res.send({
              success: false,
              message: "Error: Description cannot be blank."
            });
          }

          if (!cost) {
            return res.send({
              success: false,
              message: "Error: Cost cannot be blank."
            });
          }

          const newEvent = new Event();

          newEvent.sport = sport;
          newEvent.type = type;
          newEvent.host = host;
          newEvent.date = date;
          newEvent.hour = hour;
          newEvent.location = location;
          newEvent.place = place;
          newEvent.address = address;
          newEvent.description = description;
          newEvent.cost = cost;

          newEvent.save((err, event) => {
            if (err) {
              return res.send({
                success: false,
                message: err
              });
            }
            return res.send({
              success: true,
              message: "Event created!"
            });
          });
    });

    app.get('/api/event/all', (req, res, next) => {
        Event.find({}, function(err, events) {
            var eventsMap = [];
        
            events.forEach(function(event) {
                eventsMap.push(event);
            });
        
            res.send(eventsMap);
        });
    });
};
