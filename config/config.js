exports.SESSION_SECRET = process.env.SESSION_SECRET;

const providers = ["facebook"];

const callbacks = providers.map((provider) => {
  return process.env.NODE_ENV === "production"
    ? ""
    : process.env.URL + `/${provider}/callback`;
});

const [facebookURL] = callbacks;

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production" ? "" : process.env.URL;