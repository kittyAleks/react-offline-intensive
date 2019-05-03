//Core
// Файл отображения новосозданных постов
import React, {Component} from 'react';
import moment from 'moment';
import { func, string, array, number } from 'prop-types';

// Components
import Like from 'components/Like';
import {Consumer} from '../HOC/withProfile';

//Instruments
import Styles from './styles.m.css'; // подключаем css

export default class Post extends Component {
    static propTypes = {
        _likePost:  func.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        id:         string.isRequired,
        likes:      array.isRequired,

    };

    render() {
        const { comment, created, id, likes, _likePost } = this.props; // достаем props с именем comment

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>{ context.currentUserFirstName } { context.currentUserLastName }</a>
                        <time>{ moment.unix(created).format('MMM D h:mm:ss a') }</time>
                        <p>{comment}</p> {/* текст созданного поста. Отрендерим comment */}
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}

