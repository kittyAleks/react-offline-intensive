// Core
import React, { Component} from 'react';
import moment from 'moment';

// Components
import StatusBar from '../../components/StatusBar';
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Spinner from '../../components/Spinner';

//Instruments
import Styles from './styles.m.css'; // подключаем css
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);

    }

    state = {
        posts: [
            { id: '123', comment: 'Hi there', created: 1526825076849, likes: [] },
            { id: '356', comment: 'Hi world', created: 1526825076855, likes: [] }
        ],
        isPostFetching: false,
    };

    _setPostsFetchingState(state) {
        this.setState({
            isPostFetching: state,
        });
    }

    async _createPost(comment) { // метод создания поста
        this._setPostsFetchingState(true);
        const post = {
            id: getUniqueID(),
            created: moment.now(),
            comment,
            likes: [],
        };
        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
            isPostFetching: false,
        }));
    }

    async _likePost(id) {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostsFetchingState(true); // включаем спиннер

        await delay(1200); // задержка
        const newPosts = this.state.posts.map((post) => { // перебираем все посты, чтобы понять какой лайкнули
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id: getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName: currentUserLastName,
                        }
                    ],
                };
            }
            return post;
        });
        this.setState({
            posts: newPosts,
            isPostFetching: false, // выключаем спиннер
        })

    }



// _setTasksFetchingState = (isPostFetching) => this.setState({ isPostFetching }); // метод крутит спинер

    render() {
        const { posts, isPostFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } {...post} _likePost = { this._likePost } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching } /> {/* isSpinning - булевый пропс */}
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}

