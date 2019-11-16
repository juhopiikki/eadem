import React, {Component} from 'react';

const API_ENDPOINTS = "http://10.0.2.2:8080/mental";

export default class API extends Component {

  constructor(props) {
    super(props);
  }

  /** 
   * Create new user.
   *
   *
   * Input: {
   *   "username":"User",
   *   "location":"Something",
   *   "description":"Citizen of earth"
   * }
   * Returns: d97b8baa-b626-4615-b142-fa6687887bfa / null

    API.createUser({
       "username":"User",
       "location":"Something",
       "description":"Citizen of earth"
    }, (sts) => console.log(sts));

   * */
  static createUser(input, cb) {
    fetch(API_ENDPOINTS + '/users/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(res => res.json())
      .then((result) => cb(result));
  }

  /** 
   * Get user.
   *
   * Input: "d97b8baa-b626-4615-b142-fa6687887bfa"
   * Returns: {
   *   "usersid":"d97b8baa-b626-4615-b142-fa6687887bfa",
   *   "username":"User",
   *   "location":"Something",
   *   "description":"Citizen of earth"
   * } / null

  API.getUserById(
    "3d4971bf-0f45-4a60-930d-547ed335e6bf", 
    (sts) => console.log(sts)
  );

   * */
  static getUserById(input, cb) {
    fetch(API_ENDPOINTS + '/users/getById', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Update user name.
   *
   * Input: {
   *   "usersid":"d97b8baa-b626-4615-b142-fa6687887bfa",
   *   "username":"Maniboi"
   * }
   * Returns: true / false

  API.updateUserName({
    "usersid": "3d4971bf-0f45-4a60-930d-547ed335e6bf",
    "username": "Fuck this"
  }, 
    (sts) => console.log(sts)
  );

   * */
  static updateUserName(input, cb) {
    fetch(API_ENDPOINTS + '/users/updateName', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Update user description.
   *
   * Input: {
   *   "usersid":"d97b8baa-b626-4615-b142-fa6687887bfa",
   *   "description":"Citizen of earth"
   * }
   * Returns: true / false

  API.updateUserDescription({
    "usersid": "3d4971bf-0f45-4a60-930d-547ed335e6bf",
    "description": "And this"
  }, 
    (sts) => console.log(sts)
  );

   * */
  static updateUserDescription(input, cb) {
    fetch(API_ENDPOINTS + '/users/updateDescription', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Create new record.
   *
   * Input: {
   *   "usersid":"3d4971bf-0f45-4a60-930d-547ed335e6bf",
   *   "filesid":"d97b8baa-b626-4615-b142-fa6687887bfa",
   *   "title":"Some title"
   * }
   * Returns: d97b8baa-b626-4615-b142-fa6687887bfa / null

  API.createRecord({
    "usersid": "3d4971bf-0f45-4a60-930d-547ed335e6bf",
    "filesid": "1beaee8b-358e-4e6e-97b5-a725485b147c",
    "title": "Stupid title"
  }, 
    (sts) => console.log(sts)
  );

   * */
  static createRecord(input, cb) {
    fetch(API_ENDPOINTS + '/record/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Add like to record.
   *
   * Input: "d97b8baa-b626-4615-b142-fa6687887bfa"
   * Returns: true / false

  API.likeRecord("2f72839f-45f7-4bde-a63e-43b5d3e70a98", 
    (sts) => console.log(sts)
  );

   * */
  static likeRecord(input, cb) {
    fetch(API_ENDPOINTS + '/record/likeIncrease', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Get record by id.
   *
   * Input: "d97b8baa-b626-4615-b142-fa6687887bfa"
   * Returns: {
   *   "recordid":"ce506c31-4b54-40bb-871d-50dd688c1919",
   *   "usersid":"d97b8baa-b626-4615-b142-fa6687887bfa",
   *   "filesid":"1beaee8b-358e-4e6e-97b5-a725485b147c",
   *   "likecount":0,
   *   "title":"asd"
   * } / null

  API.getRecordById("2f72839f-45f7-4bde-a63e-43b5d3e70a98", 
    (sts) => console.log(sts)
  );

   * */
  static getRecordById(input, cb) {
    fetch(API_ENDPOINTS + '/record/getById', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Get user records.
   *
   * Input: "d97b8baa-b626-4615-b142-fa6687887bfa"
   * Returns: [
   *   {
   *     "recordid":"ce506c31-4b54-40bb-871d-50dd688c1919",
   *     "usersid":"d97b8baa-b626-4615-b142-fa6687887bfa",
   *     "filesid":"1beaee8b-358e-4e6e-97b5-a725485b147c",
   *     "likecount":0,
   *     "title":"asd"
   *   }
   * ] / null

  API.getUserRecords("3d4971bf-0f45-4a60-930d-547ed335e6bf", 
    (sts) => console.log(sts)
  );

   * */
  static getUserRecords(input, cb) {
    fetch(API_ENDPOINTS + '/record/getByUserId', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Delete record.
   *
   * Input: "d97b8baa-b626-4615-b142-fa6687887bfa"
   * Returns: true / false

  API.deleteRecord("e36652da-3682-4871-bdb3-d6a91a8af0a8", 
    (sts) => console.log(sts)
  );

   * * */
  static deleteRecord(input, cb) {
    fetch(API_ENDPOINTS + '/record/deleteById', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Save saved.
   *
   * Input: {
   *     "recordid":"0bcf398f-2d1e-4701-9186-f1a94a38145b",
   *     "usersid":"d97b8baa-b626-4615-b142-fa6687887bfa"
   *   }
   * Returns: true / false

  API.saveRecord({
    "usersid": "3d4971bf-0f45-4a60-930d-547ed335e6bf",
    "recordid": "2f72839f-45f7-4bde-a63e-43b5d3e70a98"
  },
    (sts) => console.log(sts)
  );

   * * */
  static saveRecord(input, cb) {
    fetch(API_ENDPOINTS + '/saved/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Get users saved records.
   *
   * Input: "d97b8baa-b626-4615-b142-fa6687887bfa"
   * Returns: [
   *   {
   *     "recordid":"0bcf398f-2d1e-4701-9186-f1a94a38145b",
   *     "usersid":"d97b8baa-b626-4615-b142-fa6687887bfa",
   *     "filesid":"1beaee8b-358e-4e6e-97b5-a725485b147c",
   *     "likecount":0,
   *     "title":"asd"
   *   }
   * ] / null

  API.getSavedRecords("3d4971bf-0f45-4a60-930d-547ed335e6bf",
    (sts) => console.log(sts)
  );

   * * */
  static getSavedRecords(input, cb) {
    fetch(API_ENDPOINTS + '/saved/getSaved', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

  /** 
   * Remove saved record.
   *
   * Input: "d97b8baa-b626-4615-b142-fa6687887bfa"
   * Returns: true / false

  API.removeSavedRecord("ac4a717e-4f91-484e-90cb-9a2ae8640c85",
    (sts) => console.log(sts)
  );

   * * */
  static removeSavedRecord(input, cb) {
    fetch(API_ENDPOINTS + '/saved/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then(response => response.json())
      .then(cb);
  }

}

