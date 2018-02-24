import React, { Component } from 'react'

import {getFormData} from '../modules/account'

class Form extends Component {
  constructor(props) {
      super(props);

    }

    printFormData(){
      console.log("test2");
      var response = getFormData("not");
      console.log(response);
      return "test";
    }

    render() {
      return (
        <div>
        <p>test{this.printFormData()}</p>
        </div>
      );
    }
}

export default Form;
