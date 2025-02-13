const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [];
const items = [];

const makeCounter = () => {
  let count = 0;

  return () => count++;
};

const itemsIdCounter = makeCounter();
const usersIdCounter = makeCounter();

const SECRET_KEY = 'your_secret_key';

const addDefaultUser = async () => {
  const username = 'defaultUser';
  const password = 'defaultPassword';
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {id: usersIdCounter(), username, password: hashedPassword};
  users.push(user);
};

addDefaultUser();

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({error: 'Missing username or password'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {id: usersIdCounter(), username, password: hashedPassword};
  users.push(user);
  res.status(201).json({message: 'User registered successfully'});
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({error: 'Missing username or password'});
  }

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({error: 'Invalid username or password'});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({error: 'Invalid username or password'});
  }

  const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: '1h'});
  res.json({token, username, password});
});

// Middleware для проверки токена
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({error: 'No token provided'});
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({error: 'Failed to authenticate token'});
    }

    req.userId = decoded.userId;
    next();
  });
};

// Создание нового объявления
app.post('/items', authenticate, (req, res) => {
  const {name, description, location, type, ...rest} = req.body;

  if (!name || !description || !location || !type) {
    return res.status(400).json({error: 'Missing required common fields'});
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({error: 'Missing required fields for Real estate'});
      }

      break;

    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({error: 'Missing required fields for Auto'});
      }

      break;

    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({error: 'Missing required fields for Services'});
      }

      break;

    default:
      return res.status(400).json({error: 'Invalid type'});
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get('/items', (req, res) => {
  res.json(items);
});

// Получение объявления по его id
app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));

  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Обновление объявления по его id
app.put('/items/:id', authenticate, (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));

  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Удаление объявления по его id
app.delete('/items/:id', authenticate, (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10),
  );

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
