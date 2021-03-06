# alertwil

An alert notification system using [Twilio](https://www.twilio.com/).

## Usage

```
$ git clone https://github.com/bouzuya/alertwil
$ cd alertwil/
$ # setup AWS account
$ # edit & upload config.json to Amazon S3
$ # setup Heroku account & heroku cli
$ heroku create          # create your alertwil app on heroku
$ heroku config:set ...  # set env. see: _envrc
$ git push heroku master # deploy
```

## How to develop

```
$ git clone https://github.com/bouzuya/alertwil
$ cd alertwil/
$ npm install
$ cp _envrc .envrc
$ vi .envrc # update env
$ source .envrc # or use direnv
$ cp _config.json config.json
$ vi config.json # update configuration
$ npm start
```

## Routes

- POST /groups/{group_id}/alerts
  - alerts#create { group_id }
  - call by user
- GET /alerts/{alert_id}
  - alerts#show[.twiml] { alert_id }
  - call by twilio server
- POST /alerts/{alertId}/results
  - alert/results#create { alertId }
  - call by twilio server


## Badges

[![Travis CI][travisci-badge-url]][travisci-url]

[travisci-badge-url]: https://img.shields.io/travis/bouzuya/alertwil.svg
[travisci-url]: https://travis-ci.org/bouzuya/alertwil

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][email]&gt; ([https://bouzuya.net][url])

[user]: https://github.com/bouzuya
[email]: mailto:m@bouzuya.net
[url]: https://bouzuya.net
