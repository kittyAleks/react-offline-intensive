// Core
import React, { Component} from 'react';
import { string } from 'prop-types';
import { withProfile} from  '../../HOC';

//Instruments
import Styles from './styles.m.css';

export  class Composer extends Component { // синтаксис для render
    static propTypes = {
        avatar: string.isRequired,
        currentUserFirstName: string.isRequired,
    };

    state = { //cв-во нашего єкземпляра
        comment: '',
    };

    _preventCopy = (event) =>
        event.preventDefault()


    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment();
    };

    _updateComment = (event) => {
        const {value: comment} = event.target;

        this.setState({ comment });
    };

    _submitCommentOnEnter = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            this._submitComment();
        }
    };

    _submitComment = () => {
        const {comment} = this.state;
        const {createPost} = this.props;

        if (!comment) {
            return null;
        }

        createPost(comment);
        this.setState({ comment: '' });
    };

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const  { comment } = this.state; // извлекаем

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this._handleFormSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${currentUserFirstName}?` }
                        value = { comment }
                        onChange = { this._updateComment }
                        onKeyPress = {this._submitCommentOnEnter}
                    />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
export default withProfile(Composer);
