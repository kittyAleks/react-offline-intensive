import { sum, delay, getUniqueID, getFullApiUrl  } from './';
import { GROUP_ID, ROOT_URL } from '../API/config.js';

describe('helpers:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });



    test('should throw if call with non number', () => {
        expect(() => sum('Hello', 'Hello world')).toThrow(); //toThrow - выдает ошибки
    });


    test('should add two number', () => {
        expect(sum(1, 2)).toBe(3); //toBe - проверяет результат в toBe с функцией
        expect(sum(1, 3)).toBe(4);
    });


    test('should throw if call with non number', () => {
        expect(() => sum('Hello', 'Hello world')).toThrow(); //toThrow - выдает ошибки
});


    test('delay function should return a resolved promise', async () => {
        await expect(delay(3000)).resolves.toBe("success"); //toBe - проверяет результат в toBe с функцией
    });

    test('sum function should be a function', () => {
        expect(getUniqueID(1)).toHaveLength(1);
    });

    test('Мы ожидаем ошибку если передаем в функцию строку', () => {
        expect(() => getUniqueID("1")).toThrow();
    });
    test('Мы проверяем, что результат ф-ии строкой на еденицу больше, из-за /', () => {
        expect(getFullApiUrl('Hello', 'World')).toHaveLength(11);
    });

    test('Мы ожидаем ошибку если передаем в функцию числа', () => {
        expect(() => getUniqueID("1", 1)).toThrow();
    });


    test('должен врнутьверный результат при передаче двух строк', () => {
        expect(getFullApiUrl(ROOT_URL, GROUP_ID)).toBe("https://lab.lectrum.io/react/api/crknbffchzv2");
    });

});

/*
describe('helpers:', () => {
});
*/

