// Core
import { Composer} from './';

//Mocks
const mocks = { // создаем заглушки (делаються с помощью библиотеки jest
    createPostMock:      jest.fn(() => Promise.resolve()),
    preventDefaultMock:  jest.fn(),
};

const avatar = 'https^//www.avatar.com';
const currentUserFirstName = 'Bard';
const props = {
    createPost: mocks.createPostMock,
    currentUserFirstName,
    avatar,
};

const testComment = 'Hello Lectrum';
const initialState = {
    comment: '',
};

const updatedState = {
    comment: testComment,
};

const result = mount(<Composer  { ...props }/>);
const markup = render(<Composer  { ...props }/>);

const spies = {
    _updateCommentSpy:    jest.spyOn(result.instance(), '_updateComment'),
    _submitCommentSpy:    jest.spyOn(result.instance(), '_submitComment'),
    _handleFormSubmitSpy: jest.spyOn(result.instance(), '_handleFormSubmit'),
    _submitCommentOnEnterSpy: jest.spyOn(result.instance(),"_submitCommentOnEnter"),
}; // первые 30 строчек это подготовка к выполнению тестов

describe('composer component:', () => { //говорим, что мі будем тестировать
    describe('should have valid markup element', () => {
        test('core JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
        });
    });

    describe('should have valid props', () => { // проверили пропсі
        test('currentUserFirstName should bea string', () => {
            expect(typeof result.prop('currentUserFirstName')).toBe('string');
        });
        test('avatar should bea string', () => {
            expect(typeof result.prop('avatar')).toBe('string');
        });
    });


    describe('should have valid initial state properties', () => { // тестируем state
        test('comment should be an empty string', () => {
            expect(result.state('comment')).toBe('');
        });
    });

    describe('should have core class methods', () => {
        describe("_handleFormSubmit", () => {
            test("should call preventDefault", () => {
                result.instance()._handleFormSubmit({ // вызываем метод _handleFormSubmit в компоненте
                    preventDefault: mocks.preventDefaultMock,
                });
                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });

            test("should call this._submitComment class method", () => {
                expect(spies._submitCommentSpy).toHaveBeenCalledTimes(1); // проверяемя, что _submitCommentSpy вызвался один раз

                jest.clearAllMocks();
            });
        });

        describe("_submitComment", () => {
            afterEach(() => {
                jest.clearAllMocks();
            result.setState((initialState));
            });

            test("should do nothing if a state.comment is an empty string", () => {
                result.instance()._submitComment();
                expect(spies._submitCommentSpy).toHaveBeenCalledWith();
                expect(mocks.createPostMock).not.toHaveBeenCalled();
                expect(result.state()).toEqual(initialState);
            });

            test("should call props.createPost with a comment as an argument", () => {// что функция createPost вызвался с правильным аргум
                result.setState({ // записываем наш коммент
                    comment:testComment,
                });
                result.instance()._submitComment();

                expect(mocks.createPostMock).toHaveBeenNthCalledWith(1, testComment);
                expect(result.state()).toEqual(initialState);
            });
        });

        describe("_updateComment", () => {
            test("should update state.comment", () => {
                result.instance()._updateComment({
                    target: {
                        value: testComment,
                    },
                });

                expect(result.state()).toEqual(updatedState);

                jest.clearAllMocks();
                result.setState(initialState);
            });
        });

        describe("_submitCommentOnEnter",() => {
            afterEach(() => {
                jest.clearAllMocks();
                result.setState(initialState)
            });

            // test("should call event.preventDefault and this._submitCommentOnEnter", () => {
            //     result.instance()._submitCommentOnEnter({
            //         key: "Enter",
            //         preventDefault: mocks.preventDefaultMock,
            //     });
            //
            //     expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            //     expect(spies._submitCommentSpy).toHaveBeenCalledTimes();
            // });
        });

        describe("should implement core business logic", () => {
            test("rextarea value should be empty initially", () => {
                expect(result.find("textarea").text()).toBe("");
            });

            test("rextarea value should be controlled by state", () => {
                result.setState({
                    comment: testComment,
                });

                expect(result.find("textarea").text()).toBe(testComment);
                result.setState(initialState);
            });

            test("textarea onChange event should trigger this_submitComment", () => {
                result.find("textarea").simulate("change", {
                    target: {
                        value: testComment,
                    },
                });

                expect(spies._updateCommentSpy).toHaveBeenCalledTimes(1);
                expect(result.find("textarea").text()).toBe(testComment);
                expect(result.state()).toEqual(updatedState);
                result.setState(initialState);
            });
        });

        describe("should render valid markup", () => {
            test("should contain valid CSS", () => {
                expect(markup.attr("class")).toBe("composer");
            });
        });

        test("should contain valid placeholder", () => {
            expect(markup.find("textarea").attr("placeholder")).toBe(`What's on your mind, ${currentUserFirstName}?`,
            );
        });

        test("img should have have a valie src", () => {
            expect(markup.find("img").attr("src")).toBe(avatar);
        });

        test("snapshot should match", () => {
            expect(markup.html()).toMatchSnapshot();
        });




// ----------------------------------------
    });
});