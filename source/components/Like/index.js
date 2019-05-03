// Core
import React, { Component} from 'react';
import { string, func, arrayOf, shape } from 'prop-types'; //валидация
import cx from 'classnames';

//Instruments
import Styles from './styles.m.css';

export default class Like extends Component {
    static propTypes = {
        _likePost:  func.isRequired,
        id:         string.isRequired,
        likes:      arrayOf(
            shape({
                id:         string.isRequired,
                firstName:  string.isRequired,
                lastName:   string.isRequired,
            }),
        ).isRequired,
    };

    constructor() {
        super();

        this._getLikedByMe = this._getLikedByMe.bind(this);
        this._getLikeStyles = this._getLikeStyles.bind(this);
        this._likePost = this._likePost.bind(this);
        this._showLikers = this._showLikers.bind(this);
        this._hideLikers = this._hideLikers.bind(this);
        this._getLikersList = this._getLikersList.bind(this);
        this._getLikesDescription = this._getLikesDescription(this);
    }

    state = {
        _showLikers: false,
    };

    _showLikers() {
        this.setState({
            _showLikers: true
        });
    }

    _hideLikers() {
        this.setState({
            _showLikers: false
        });
    }

    _likePost() {
        const { _likePost, id } = this.props;
        _likePost(id);
    }

    // Описываем стили(_getLikedByMe, _getLikeStyles)
    _getLikedByMe() { //  метод вернет true или false
        const {currentUserFirstName, currentUserLastName, likes} = this.props;
        return likes.some(({firstName, lastName}) => {
            return (
                `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            );
        });
    }

    _getLikeStyles() { // вернет нужный стиль в зависимости от того, что вернет _getLikedByMe(т.е.true или false)
        const likedByMe = this._getLikedByMe();
        return cx(Styles.icon, {
            [Styles.liked]: likedByMe,
        });
    }

    // метод, возвращающий список пользователей, лайкнувших пост
    _getLikersList() {
        const { _showLikers } = this.state;
        const { likes } = this.props;
        const likesJSX = likes.map(({ firstName, lastName, id }) => ( // перебираем все лайки
            <li key = { id }>{ `${firstName} ${lastName}` }</li>
        ));
        return likes.length && _showLikers ? <ul>{ likesJSX }</ul>:null;
    }

    _getLikesDescription() {
        const {likes, currentUserFirstName, currentUserLastName } = this.props;
        const likedByMe = this._getLikedByMe();
        if(likes.length === 1 && likedByMe) { // если пост был лайкнут только текущим поль-ем, то отобразить...
            return ` ${ currentUserFirstName } ${ currentUserLastName }`;
        } else if(likes.length === 2 && likedByMe) {
            return `You and ${ likes.length - 1 } other`;
        } else if(likedByMe) { // если пред-ие условия не соблюдены, но пост все равно был лайкнут текущим поль-ем
            return `You and ${ likes.length - 1 } others`;
        }
        return likes.length;
    }


    render() {
        const likeStyles = this._getLikeStyles();
        const likersList = this._getLikersList();
        const likesDescription = this._getLikesDescription();
        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this._likePost }>Like</span>
                <div>
                    { likersList }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        { likesDescription }
                    </span>
                </div>
            </section>
        )
    }
}