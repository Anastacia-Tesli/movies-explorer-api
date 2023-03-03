const CREATED_CODE = 201;

const AUTH_ERROR_MESSAGE = 'Неправильные почта или пароль.';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация.';
const FORBIDDEN_ERROR_MESSAGE = 'Доступ запрещен.';
const NOT_FOUND_MOVIE_MESSAGE = 'Передан несуществующий _id.';
const NOT_FOUND_USER_MESSAGE = 'Пользователь по указанному _id не найден.';
const PAGE_NOT_FOUND_MESSAGE = '404. Такой страницы не существует.';
const INCORRECT_ERROR_MESSAGE = 'Переданы некорректные данные.';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже зарегистрирован.';
const DEFAULT_ERROR_MESSAGE = 'Ошибка по умолчанию.';

const regExpression = '/https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/';

module.exports = {
  CREATED_CODE,
  PAGE_NOT_FOUND_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  AUTH_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  regExpression,
};
