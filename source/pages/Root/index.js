// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Catcher from "../../components/Catcher";
import { Provider } from '../../HOC';
import Feed from "../../components/Feed";


//Instruments
import avatar from "../../theme/assets/lisa.png";

const options = {
    avatar,
    currentUserFirstName: "Александра",
    currentUserLastName: "Кириллова"

};

@hot(module) //отключить перезагрузку страницы
export default class Root extends Component {
    render() {
        return (
            <Catcher>
            <Provider value = { options }>
                <Feed { ...options } />
            </Provider>
            </Catcher>
        );
    }
}