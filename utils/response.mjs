export const sendJson = (res, data = {}, code = 200, message = 'Ok', token) => {
  res.status(code).json({
    code,
    message,
    data: {
      ...data,
    },
    token,
  });
};

export const sendJsonData = (res, data = {}, code = 200, token) => {
  sendJson(res, data, code, 'Ok', token);
};

export const sendJsonError = (res, error, code = 400, errorData) => {
  sendJson(res, { error: errorData }, code, error.message);
};
