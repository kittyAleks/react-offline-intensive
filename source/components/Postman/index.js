// Core
import React, { Component} from 'react';
import { string } from 'prop-types';



//Instruments
import Styles from './styles.m.css';
import { withProfile} from  '../../HOC';



@withProfile
export default class Postman extends Component { // синтаксис для render
        render() {
        const {avatar, currentUserFirstName} = this.props;
        return (
            <section className = { Styles.postman }>
                <img src={avatar}/>
                <span>
                <b> {currentUserFirstName} </b>
                </span>
            </section>
        );
    }
    }

