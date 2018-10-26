// Core
import React, { Component} from 'react';
import { string, func, arrayOf, shape} from 'prop-types'; //валидация
import cx from 'classnames';

//Instruments
import Styles from './styles.m.css';
import { withProfile} from  '../../HOC';

export class Like extends Component { // синтаксис для render
    static propTypes = {
        likePost: func.isRequired,
        id: string.isRequired,
        likes: arrayOf(
            shape({
                firstName: string.isRequire,
                lastName: string.isRequire,
            })
        ).isRequired,
    };
    static defaultProps = {
        likes: []
    };

    state = {
        showLikers: false,
    };

    _showLikers = () => this.setState({ showLikers: true })

    _hideLikers = () => this.setState({ showLikers: false, });



    _likePost = () => {
        const { id, likePost} = this.props;
        likePost(id);
    };

    _getLikeByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => firstName === currentUserFirstName && lastName === currentUserLastName);
    };

    _getLikedStyles = () => {
        const getLikeByMe = this._getLikeByMe();

        return cx(Styles.icon, {
            [Styles.liked]: getLikeByMe,
        });
    };

    _getLikersList = () => {
        const {showLikers} = this.state;
        const {likes} = this.props;

        const likesJSX = likes.map(({firstName, lastName, id}) => (
            <li key={id}>
                {firstName} {lastName}
            </li>
        ));
        return likes.length && showLikers ? <ul>{likesJSX}</ul> : null;
    };

    _getLikersDescription = () => {

        const {likes, currentUserFirstName, currentUserLastName} = this.props;
        const likeByMe = this._getLikeByMe();

        if (likes.length === 1 && likeByMe) {
            return `${ currentUserFirstName } ${ currentUserLastName }`;
        } else if (likes.length === 2 && likeByMe) {
            return 'You and i other';
        } else if (likeByMe) {
            return `You and ${ likes.length - 1} others`;
        }
        return likes.length;
    };


    render() {
        const likers = this._getLikersList();
        const likeStyles = this._getLikedStyles();
        const likersDescription = this._getLikersDescription();

        return (
            <section className = { Styles.like }>
                <span
                    className = {likeStyles}
                    onClick = {this._likePost}
                >
                    Like
                </span>
                <div>
                    {likers}
                    <span
                        onMouseEnter={this._showLikers}
                        onMouseLeave={this._hideLikers}>
                        {likersDescription}
                    </span>
                </div>
            </section>
        )
    }
}

export default withProfile(Like);