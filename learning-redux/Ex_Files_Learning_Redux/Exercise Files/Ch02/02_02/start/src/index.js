import C from './constants'; //I am assuming this imports the whole 'constants' object - I don't know this syntax.

import { skiDay } from "./store/reducers";

const state = null;

const action = {
  type: C.ADD_DAY,
  payload: {
    "resort": "Aberdeen",
    "date": "2016-12-10",
    "powder": false,
    "backcountry": true
  }
};

const nextState = goal(state, action);

console.log(`

  initial goal: ${state}
  action: ${JSON.stringify(action)}
  new goal: ${nextState}

`);
