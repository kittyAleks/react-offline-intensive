// Core
import React, { Component} from 'react';
import { string } from 'prop-types';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import gsap from 'gsap';



// Components
import Composer from '../Composer';
import StatusBar from '../StatusBar';
import Post from '../Post';
import Catcher from '../Catcher';
import { Counter } from '../Counter';
import Spinner from  '../Spinner';
import { GROUP_ID, api } from  '../../API';
import Postman from '../Postman';


//Instruments
import Styles from './styles.m.css';
import index from '../Composer/index';
import {getUniqueID} from '../../instruments';
import { socket } from  '../../socket/init';
import {withProfile} from '../../HOC';


@withProfile
export default class Feed extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,

    };

    state = {
        posts:      [],
        isSpinning: false,
        isPostmanAppear: true,
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName} = this.props;
        this._fetchPostAsync(1);

        socket.emit('join', GROUP_ID);
        socket.on('create', (postJSON) => {
            const { data: createdPost } = JSON.parse(postJSON);
            if (currentUserFirstName !== createdPost.firstName
                && currentUserLastName !== createdPost.lastName
            ) {
                this.setState((prevState) => ({
                    posts: [createdPost, ...prevState.posts],
                }));
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: deletedPost, meta} = JSON.parse(postJSON);

            if (currentUserFirstName !== meta.authorFirstName
                && currentUserLastName !== meta.authorLasttName
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => {
                        return post.id !== deletedPost.id
                    })
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost } = JSON.parse(postJSON);

            if (currentUserFirstName !== likedPost.firstName
                && currentUserLastName !== likedPost.lastName
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post)
                }));
            }
        });

    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _fetchPostAsync = async () => {
        try {
            this._setPostsFetchingState(true);
            const posts = await api.fetchPosts();
            this.setState({
                posts,
                isSpinning: false,
            });
        } catch (error) {
            console.log(error.message);
            this._setPostsFetchingState(false);
        }
    };

    _createPostAsync = async (comment) => { // создаем коммент
        try {
            this._setPostsFetchingState(true);

            const post = await api.createPost(comment);
            console.log(1);

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts],
                isSpinning: false,
            }));
        } catch (error) {
            this._setPostsFetchingState(false);
        }
    };

    _removePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            const isPostDeleted = await api.removePost(id); // если посто удален
                if (isPostDeleted) {
                    this.setState((prevState) => ({
                        posts: prevState.posts.filter((post) => {
                            return post.id !== id;
                        }),
                        isSpinning: false,
                    }));
                }
        } catch (error) {
            this._setPostsFetchingState(false);
        }
    };
    _likePostAsync = async (id) => {
        try {
            this._setPostsFetchingState(true);

            const likedPost = await api.likePost(id); // если пост отлайканый
                    this.setState(({posts}) => ({ //обращаемя к лок.памяти комп. и деструктуриз.массивпостов из нее
                        posts: posts.map((post) => {
                            if(post.id === id) {
                                return likedPost;
                            }
                            return post;
                        }),
                        isSpinning: false,
                    }));
        } catch (error) {
            this._setPostsFetchingState(false);
        }
    };

    _animateComposerEnter = (composer) => {// _animateComposerEnter передает ссылку на элемент
        gsap.fromTo(composer, 3, {opacity: 0}, {opacity:1}); // элемент, кот.нужно анимировать, началь.точка, конечная точка
    };


    _animateCounterEnter = (composer) => {// _animateComposerEnter передает ссылку на элемент
        gsap.fromTo(composer, 1, {x: -1000, y: -500}, {x: 0, y: 0, opacity: 1}); // элемент, кот.нужно анимировать, началь.точка, конечная точка
    };


    _animatePostmanEnter = (postman) => {// _animatePostmanEnter передает ссылку на элемент
        gsap.fromTo(postman, 1, {x: -1000}, {x: 0, y: 0, opacity: 1}); // элемент, кот.нужно анимировать, началь.точка, конечная точка
        setTimeout(() => this.setState({isPostmanAppear: false}), 5000);
    };

    _animatePostmanExit = (postman) => {// _animatePostmanExit передает ссылку на элемент
        gsap.fromTo(postman, 1, {x: 0, opacity:0}, {x: 1000, opacity: 1}); // элемент, кот.нужно анимировать, началь.точка, конечная точка
    };

    render () {
        const { posts, isSpinning, isPostmanAppear} = this.state;

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning }/>
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = {3000}
                    onEnter = {this._animateComposerEnter}>
                <Composer createPost = { this._createPostAsync }/>
                </Transition>

                <Transition
                    appear
                    in
                    timeout = {1000}
                    onEnter = {this._animateCounterEnter}>
                <Counter count = { posts.length }/>
                </Transition>

                <Transition
                    appear
                    in = { isPostmanAppear }
                    timeout = {3000}
                    onEnter = {this._animatePostmanEnter}
                    onExit = {this._animatePostmanExit}>
                    <Postman/>
                </Transition>

                <TransitionGroup>
                {
                    posts.map((post) => (
                        <CSSTransition
                            classNames ={{
                                enter: Styles.postInStart,
                                enterActive: Styles.postInEnd,
                                exit: Styles.postOutStart,
                                exitActive: Styles.postOutEnd,
                            }}
                            key = { post.id }
                            timeout={{enter:500, exit:400}}>
                            <Catcher>
                                <Post
                                    removePost = { this._removePostAsync }
                                    likePost = { this._likePostAsync }
                                    { ...post }
                                >
                                </Post>
                            </Catcher>
                        </CSSTransition>
                    ))
                }
                </TransitionGroup>
            </section>
        );
    }
}
