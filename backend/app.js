const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const {createUser, login} = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {PORT = 3000} = process.env;
const routes = require('./routes/index');

const app = express();

app.use(helmet());


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://sergeykms.students.nomoredomains.club",
      "http://back.sergeykms.students.nomoredomains.club",
      "https://sergeykms.students.nomoredomains.club",
      "https://back.sergeykms.students.nomoredomains.club",
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "origin", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(routes);

routes.use((req, res) => {
  res.status(404).send({message: 'Запрашиваемый ресурс не найден'});
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const {statusCode = 500, message} = err;
  res.status(statusCode)
    .send({message: statusCode === 500 ? 'На сервере произошла ошибка' : message});
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
});
