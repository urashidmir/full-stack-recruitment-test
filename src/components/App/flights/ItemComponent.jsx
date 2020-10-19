import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkButton from 'bpk-component-button';
import BpkLink from 'bpk-component-link';
import STYLES from '../App.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const AlignedArrowIcon = withButtonAlignment(withRtlSupport(ArrowIcon));
const logoURL = 'https://logos.skyscnr.com/images/airlines/favicon/';

class ItemComponent extends Component {
  constructor(props){
    super(props);
  }


 static getLeg(leg, legs){
    /*
      Retreive leg Object corresponding to an itinerary from legs Array
    */
    return legs.find(legObject => {
       return legObject.id === leg;
    });
  }

  static getDurationFormat(duration){
    const timeFormat = Math.floor(duration/60)+'h '+(duration%60);
    return timeFormat;
  }

  static getTimeFormat(time){
      return time.substring(time.indexOf('T')+1);
  }

  static getStopsDescription(stops){
    if(stops === 0)
      return (<BpkText tagName="p" style={{color: '#00fbff'}}> Direct </BpkText>);
    if(stops === 1) {
      return (<BpkText tagName="p" style={{color: 'red'}}> 1 Stop </BpkText>);
    }
    if(stops > 1) {
      return (<BpkText tagName="p" style={{color: 'red'}}> {stops} Stops </BpkText>);
    }
  }


  render() {
    const {itinerary, legs} = this.props;
    return (
      <div className={getClassName('ItemComponent')} key={itinerary.id}>
          <div>
            <table className={getClassName('table')}>
              <tbody>

                {itinerary.legs.map( (leg) => {
                  const legObject = ItemComponent.getLeg(leg, legs);
                  const stops = ItemComponent.getStopsDescription(legObject.stops);
                  return (
                    <tr key={legObject.id.toString()}>
                      <td style={{width: '10%'}}>
                        <img style={{width: '32px', height:'32px'}} src={`${logoURL}${legObject.airline_id}.png`}
                        />
                      </td>
                      <td style={{width: '20%'}}>
                        <BpkText tagName="p">
                          {ItemComponent.getTimeFormat(legObject.departure_time)}
                        </BpkText>
                        <BpkText tagName="p">
                          {legObject.departure_airport}
                        </BpkText>
                      </td>
                      <td style={{width: '20%'}}>
                            <AlignedArrowIcon />
                      </td>
                      <td style={{width: '25%'}}>
                        <BpkText tagName="p">
                          {ItemComponent.getTimeFormat(legObject.arrival_time)}
                        </BpkText>
                        <BpkText tagName="p">
                          {legObject.arrival_airport}
                        </BpkText>
                      </td>
                      <td style={{width: '25%'}}>
                        <BpkText tagName="p" textStyle="sm">
                          {ItemComponent.getDurationFormat(legObject.duration_mins)}
                        </BpkText>
                        {stops}
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <td style={{width: '90%'}}>
                  <BpkText tagName="p" textStyle="xl" weight="bold">
                    {itinerary.price}
                  </BpkText>
                  <BpkLink href=''>{itinerary.agent}</BpkLink>
                  </td>
                  <td style={{width: '10%'}}>
                    <BpkButton>Select</BpkButton>
                  </td>
                </tr>
              </tbody>
            </table>

        </div>
      </div>
    );
  }
}

ItemComponent.propTypes = {
  itinerary: PropTypes.shape({
    id: PropTypes.string,
    legs: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.string,
    agent: PropTypes.string,
    agent_rating: PropTypes.number
  }).isRequired,
  legs: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.string,
        departure_airport: PropTypes.string,
        arrival_airport: PropTypes.string,
        departure_time: PropTypes.string,
        arrival_time: PropTypes.string,
        stop: PropTypes.number,
        airline_name: PropTypes.string,
        airline_id: PropTypes.string,
        duration: PropTypes.number
    }).isRequired
  ).isRequired
};

export default ItemComponent;
