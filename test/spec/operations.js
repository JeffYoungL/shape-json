'use strict';
var shape = require('../../index.js');
let input = require('../resources.js').readme;
const _ = require('lodash');

describe("operation specific:", function() {
  it("mirror - no target key provided", function() {
    let scheme = {
      "$mirror(pid)": {
        "id": "pid",
        "name": "contributor"
      }
    };

    let result = _.map(_.groupBy(input, 'pid'), function(group){
      let person = group[0];
      return {
        "id": person.pid,
        "name": person.contributor
      };
    });

    expect(shape.parse(input, scheme)).toEqual(result);
  });

  it("group - no target key provided", function() {
    let scheme = {
      "$group(pid)": {
        "id": "pid",
        "name": "contributor"
      }
    };

    let result = _.map(_.groupBy(input, 'pid'), function(group){
      let person = group[0];
      return {
        "id": person.pid,
        "name": person.contributor
      };
    });

    expect(shape.parse(input, scheme)).toEqual(result);
  });

  it("group nested - no target key provided", function() {
    let scheme = {
      "$group(pid)": {
        "id": "pid",
        "name": "contributor",
        "$group[projects](projectID)": {
          "id": "projectID",
          "name": "projectName"
        }
      }
    };

    let result = _.map(_.groupBy(input, 'pid'), function(group){
      let person = group[0];
      return {
        "id": person.pid,
        "name": person.contributor,
        "projects": _.map(_.groupBy(group, 'projectID'), function(projects){
          let project = projects[0];
          return {
            "id": project.projectID,
            "name": project.projectName
          };
        })
      }
    });

    expect(shape.parse(input, scheme)).toEqual(result);
  });
});