export const sendJson = (res, data = {}, code = 200, message = 'Ok', token = '') => {
  res.status(code).json({
    code,
    message,
    data: {
      ...data
    },
    token,
  });
};

export const sendJsonData = (res, data = {}, code = 200, token) => {
  sendJson(res, data, code, 'Ok', token);
};

export const sendJsonError = (res, data = {}, status = 500, error) => {
  sendJson(res, data, code, error.message, token);
};
