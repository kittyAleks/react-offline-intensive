// Core
import React, { Component } from 'react';
import { hot } from "react-hot-loader"; // обновление приложения в браузере без перезагрузки страницы

// Components
import Feed from "../../components/Feed";
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from '../../theme/assets/lisa2.jpg';

// чтобы избежать повторов в Post и Composer, создаем объект куда записываем повторяющ-я св-ва
const options = {
    avatar,
    currentUserFirstName: 'Aleksa',
    currentUserLastName: 'Bennett',
};

@hot(module)
export default class Root extends Component {
    render () {
        return (
            <Provider value = { options }> {/* передаем объект options по пропсам из Feed в Provider */}
                <Feed { ...options } />
            </Provider>
        );
    }
};

