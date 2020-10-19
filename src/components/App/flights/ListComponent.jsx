import React, {Component} from 'react';
import STYLES from '../App.scss';
import ItemComponent from './ItemComponent';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const jsonFilePath = '/flights.json';

class ListComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
        itineraries: [],
        legs: [],
        error: false
      };
    this.getData = this.getData.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    return fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
      /*
        Store itineraries and legs in the state
      */
      this.setState({
        itineraries: data.itineraries,
        legs: data.legs,
        error: false
      });
    })
    .catch((error)=> {
        // handle error
        this.setState({
            error: true
          });
      });
  }

  render() {
    return (
      <div className={getClassName('ItemList')}>
      {/* Pass itinerary object and array of legs as props to each ItemComponent */}
      {!this.state.error && this.state.itineraries && this.state.itineraries.map( (itinerary) => {
            return (
                <div key={itinerary.id.toString()}>
                  <ItemComponent itemComponent itinerary={itinerary} legs={this.state.legs} />
                </div>
            );
          })
      }
      </div>
    );
  }
}

export default ListComponent;
