'use strict';
import React, { Component } from "react";


function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property])
      return 1;
    if (a[property] < b[property])
      return -1;
    return 0;
  }
}

export default {
  sortByProperty
}
