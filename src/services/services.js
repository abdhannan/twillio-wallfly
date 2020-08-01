import React, { Component } from 'react';
const axios = require('axios');

class TwilioService extends Component {
    constructor() {
        super();
    }

    static access_token(username) {
        return axios.get('https://twilio.lokerjadong.com/twilio/public/api/twilio/access_token/' + username);
    }

    static end_room(room_id) {
        return axios.post('https://twilio.lokerjadong.com/api/twilio/end_room', {
            roomID: room_id
        });
    }
}

export default TwilioService;