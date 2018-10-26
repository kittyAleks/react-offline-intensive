//Core
import React, { Component} from 'react';
import moment from 'moment';
import { string, number, arrayOf, shape, func} from 'prop-types';

// Components
import Like from '../Like';

//Instruments
import Styles from './styles.m.css';
import { withProfile} from  '../../HOC';

export class Post extends Component { // синтаксис для render
    static propTypes = {
        avatar:               string.isRequired, //проверяем что пришло
        currentUserFirstName: string.isRequired,
        removePost:           func.isRequired,
        likePost:             func.isRequired,
        currentUserLastName:  string.isRequired,
        comment:              string.isRequired,
        created:              number.isRequired,
        firstName:            string.isRequired,
        id:                   string.isRequired,
        lastName:             string.isRequired,
        likes:                arrayOf(
            shape({
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }).isRequired,
        ).isRequired,
    };

    _removePost = () => {
        const { id, removePost} = this.props;
        removePost(id);
    };

    _likePost = (id) => this.props.likePost(id);

    _getCross = () => { // метод создает крестик в посте
        const {
            firstName,
            lastName,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return firstName === currentUserFirstName && lastName === currentUserLastName
            ? <span
                className = { Styles.cross }
                onClick = { this._removePost }
              />
            : null;
    };

    render () {
        const {avatar, comment, firstName, lastName, created, likes, id} = this.props;
        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                { cross }
                <img src = { avatar } /> {/* передаем картринку в виде переменной */}
                <a>
                    { firstName } {lastName }
                </a>
                <time> { moment.unix(created).format('MMMM D h:mm:ss a') }</time>
                <p> { comment }</p>
                <Like
                    id = {id}
                    likes = { likes }
                    likePost = { this._likePost }
                /> {/* Передаем массив лайков*/}
            </section>

        );
    }
}

export default withProfile(Post);
