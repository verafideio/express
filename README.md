# Verafide Express

### Introduction

An example project of how to integrate [Verafide](https://verafide.io) with [Express](https://expressjs.com)

Before using this repo, you will need to register with Verafide at [https://verafide.io](https://verafide.io) and then create a developer app at [https://developer.verafide.io](https://developer.verafide.io).

Once you've created your app, you will need to update the `.env` file in this repo with your appKey and appSecret.

### Installation

```
npm install
cp .env.example .env
npm start
```

Update Environment Variables

| Key        | Description                                              | Default    |
| ---------- | -------------------------------------------------------- | ---------- |
| APP_KEY    | Verafide App Key                                         |            |
| APP_SECRET | Verafide App Secret                                      |            |
| ENV        | Verafide Environment (DEV, TEST, TEST_LOCAL, PRODUCTION) | PRODUCTION |
| PORT       | Port to listen on                                        | 8000       |

### Customising templates

The templates are stored in the [views](views) directory. They are rendered using [https://handlebarsjs.com/](Handlebars).

| Template                                     | Description                                                     |
| -------------------------------------------- | --------------------------------------------------------------- |
| [index.hbs](views/index.hbs)                 | The default landing page which contains the `<verafide-button>` |
| [invalid_sig.hbs](views/invalid_sig.hbs)     | This is rendered if the callback signature is invalid           |
| [verify_failed.hbs](views/verify_failed.hbs) | This is rendered if the verification process failed             |
| [verified.hbs](views/verified.hbs)           | This is rendered if all went OK                                 |

### Running Tests

```
npm test
```
