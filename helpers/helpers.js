exports.emailValidator = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email?.toString());
};

exports.fieldsValidator = (payload, requiredFields) => {
  const keys = Object.keys(payload)?.map(
    (key) => !requiredFields?.includes(key?.toLowerCase())
  );

  if (keys?.length === 0) return true;

  return `${keys?.join(",")} are required.`;
};

exports.sendResponse = (
  res,
  message,
  data = {},
  statusCode = 200,
  success = true
) => {
  return res?.status(statusCode)?.json({
    success,
    message,
    data,
  });
};
