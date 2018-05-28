export const sendJson = (res, data = {}, status = 200, success = true) => {
  res.status(status).json({
    success,
    ...data,
  });
};

export const sendJsonData = (res, data = {}, status = 200) => {
  sendJson(res, data, status, true);
};

export const sendJsonError = (res, data = {}, status = 500) => {
  sendJson(res, data, status, false);
};
