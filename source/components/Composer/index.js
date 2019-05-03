// Файл создания новых постов
// Core
import React, {Component} from 'react';
import propTypes from 'prop-types';

// Components
import {Consumer} from '../HOC/withProfile';

//Instruments
import Styles from './styles.m.css'; // подключаем css

export default class Composer extends Component {
    static propTypes = {
        _createPost: propTypes.func.isRequired,
    };

    constructor() {
        super();
        this._updateComment = this._updateComment.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
    }

    state = {
        comment: '', // Объект, описыв-ий строку компонента новосозданного комментария
    };

    _updateComment(event) { // для обновления значения исполь-ем метод _updateComment
        this.setState({
            comment: event.target.value,
        })
    }

    _handleFormSubmit(event) {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment() {
        const { comment } = this.state; // предоставляем компоненту Feed получить этот комментарий измененный
        if (!comment) {
            return null;
        }

        this.props._createPost(comment);

        this.setState({
            comment: '', // при создании нового поста обнуляем значение comment(т.е.зн-е textarea обнулилось
        });
    }

    _submitOnEnter(event) {
        const enterKey = event.key === 'Enter';
        if(enterKey) {
            event.preventDefault();
            this._submitComment();
        }
    }

    render() {
        const { comment } = this.state;
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }> {/* подключаем css*/}
                        <img src = { context.avatar } /> {/* читаем пропсы из Fees*/}
                        <form onSubmit = { this._handleFormSubmit }>
                            <textarea placeholder = { `What's on your mind, ${ context.currentUserFirstName }?` }
                                      value = { comment }
                                      onChange = { this._updateComment }
                                      onKeyPress={ this._submitOnEnter }
                            />{/* читаем пропсы из Feed */}
                            <input type = "submit" value = "Post" />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
/* Объявлен объект state, который описывает строковое значение созданного комментария */
/* Затем это св-во comment привязывается в виде значения к textarea, value = { comment } */
/* Для обнрвления значения исполь-я метод _updateComment */
/* Метод _submitComment содержит основную логику по проверке поста и при удачной проверке отправлет строку с этим комм-ем
компоненту Feed методом _createPost, обнуляя коммент */
/* Метод _submitOnEnter создает коммент по нажатию клавиши Enter */
