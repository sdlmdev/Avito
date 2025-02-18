const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const ItemTypes = {
  ALL: 'Все',
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

const delayMiddleware = (req, res, next) => {
  setTimeout(next, 1000);
};

app.use(delayMiddleware);

const users = [];
const items = [];

const SECRET_KEY = 'your_secret_key';

const addTestItems = () => {
  const testItems = [
    {
      name: 'Квартира у моря',
      description: 'Квартира с видом на море',
      location: 'Сочи',
      type: ItemTypes.REAL_ESTATE,
      propertyType: 'Квартира',
      area: 100,
      rooms: 4,
      price: 20000000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Автомобиль Tesla',
      description: 'Электромобиль Tesla',
      location: 'Москва',
      type: ItemTypes.AUTO,
      brand: 'Tesla',
      model: 'Model S',
      year: 2021,
      mileage: 15000,
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Услуги программиста',
      description: 'Разработка программного обеспечения',
      location: 'Санкт-Петербург',
      type: ItemTypes.SERVICES,
      serviceType: 'Консультация',
      experience: 8,
      cost: 5000,
      user: {id: 0, username: 'defaultUser'},
      schedule: 'Пн-Пт 10:00-18:00',
    },
    {
      name: 'Коттедж в лесу',
      description: 'Коттедж в живописном месте',
      location: 'Тверь',
      type: ItemTypes.REAL_ESTATE,
      propertyType: 'Дом',
      area: 300,
      rooms: 6,
      price: 35000000,
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Автомобиль Ford',
      description: 'Надежный автомобиль Ford',
      location: 'Казань',
      type: ItemTypes.AUTO,
      brand: 'Ford',
      model: 'Focus',
      year: 2019,
      mileage: 30000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Услуги дизайнера',
      description: 'Услуги по дизайну интерьера',
      location: 'Екатеринбург',
      type: ItemTypes.SERVICES,
      serviceType: 'Ремонт',
      experience: 6,
      cost: 4000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
      schedule: 'Пн-Пт 9:00-17:00',
    },
    {
      name: 'Квартира в новостройке',
      description: 'Современная квартира в новостройке',
      location: 'Новосибирск',
      type: ItemTypes.REAL_ESTATE,
      propertyType: 'Квартира',
      area: 90,
      rooms: 3,
      price: 12000000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Автомобиль Honda',
      description: 'Экономичный автомобиль Honda',
      location: 'Самара',
      type: ItemTypes.AUTO,
      brand: 'Honda',
      model: 'Civic',
      year: 2017,
      mileage: 40000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Услуги фотографа',
      description: 'Профессиональные услуги фотографа',
      location: 'Краснодар',
      type: ItemTypes.SERVICES,
      serviceType: 'Уборка',
      experience: 10,
      cost: 6000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
      schedule: 'Пн-Вс 10:00-20:00',
    },
    {
      name: 'Квартира в центре',
      description: 'Просторная квартира в центре города',
      location: 'Москва',
      type: ItemTypes.REAL_ESTATE,
      propertyType: 'Квартира',
      area: 120,
      rooms: 3,
      price: 15000000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Автомобиль BMW',
      description: 'Новый автомобиль BMW',
      location: 'Санкт-Петербург',
      type: ItemTypes.AUTO,
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      mileage: 0,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Услуги электрика',
      description: 'Профессиональные услуги электрика',
      location: 'Новосибирск',
      type: ItemTypes.SERVICES,
      serviceType: 'Ремонт',
      experience: 5,
      cost: 2000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
      schedule: 'Пн-Пт 9:00-18:00',
    },
    {
      name: 'Дом в пригороде',
      description: 'Уютный дом в пригороде',
      location: 'Казань',
      type: ItemTypes.REAL_ESTATE,
      propertyType: 'Дом',
      area: 200,
      rooms: 5,
      price: 25000000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Автомобиль Audi',
      description: 'Подержанный автомобиль Audi',
      location: 'Екатеринбург',
      type: ItemTypes.AUTO,
      brand: 'Audi',
      model: 'A6',
      year: 2018,
      mileage: 50000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Услуги сантехника',
      description: 'Качественные услуги сантехника',
      location: 'Нижний Новгород',
      type: ItemTypes.SERVICES,
      serviceType: 'Ремонт',
      experience: 10,
      cost: 3000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
      schedule: 'Пн-Сб 8:00-20:00',
    },
    {
      name: 'Квартира на окраине',
      description: 'Недорогая квартира на окраине города',
      location: 'Самара',
      type: ItemTypes.REAL_ESTATE,
      propertyType: 'Квартира',
      area: 80,
      rooms: 2,
      price: 8000000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Автомобиль Mercedes',
      description: 'Автомобиль Mercedes в отличном состоянии',
      location: 'Краснодар',
      type: ItemTypes.AUTO,
      brand: 'Mercedes',
      model: 'C-Class',
      year: 2020,
      mileage: 10000,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
    },
    {
      name: 'Услуги маляра',
      description: 'Профессиональные услуги маляра',
      location: 'Воронеж',
      type: ItemTypes.SERVICES,
      serviceType: 'Ремонт',
      experience: 7,
      cost: 2500,
      image: 'uploads/default.svg',
      user: {id: 0, username: 'defaultUser'},
      schedule: 'Пн-Пт 10:00-19:00',
    },
  ];

  testItems.forEach((item) => {
    item.id = itemsIdCounter();
    items.push(item);
  });
};

const makeCounter = () => {
  let count = addTestItems.length;
  return () => count++;
};

const itemsIdCounter = makeCounter();
const usersIdCounter = makeCounter();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage});

const addDefaultUser = async () => {
  const username = 'defaultUser';
  const password = 'defaultPassword';
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {id: usersIdCounter(), username, password: hashedPassword};
  users.push(user);
};

addDefaultUser();
addTestItems();

const parseDataMiddleware = (req, res, next) => {
  const parseValue = (value) => {
    if (value === 'null') return null;
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(value) && value.trim() !== '') return Number(value);
    return value;
  };

  const parseObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = parseValue(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        parseObject(obj[key]);
      }
    }
  };

  parseObject(req.body);
  next();
};

app.post('/register', async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({error: 'Missing username or password'});
  }

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(400).json({error: 'Username already exists'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {id: usersIdCounter(), username, password: hashedPassword};
  users.push(user);

  const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: '24h'});
  res.status(201).json({token, username, id: user.id});
});

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

  const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: '24h'});
  res.status(200).json({token, username, id: user.id});
});

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({error: 'No token provided'});
  }

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({error: 'Failed to authenticate token'});
    }

    req.userId = decoded.userId;
    next();
  });
};

app.post('/items', authenticate, upload.single('image'), (req, res) => {
  const {name, description, location, type, ...rest} = req.body;
  const image =
    req?.file && req?.file?.path && req?.file?.path !== 'null'
      ? req.file.path
      : 'uploads/default.svg';
  const userId = req.userId;

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
    ...rest,
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    image,
    user: {id: userId},
  };

  items.push(item);
  res.status(201).json(item);
});

const parseQueryString = (req, res, next) => {
  const {type} = req.query;
  req.queryParams = {
    type,
  };
  next();
};

app.get('/items', parseQueryString, (req, res) => {
  const {
    type,
    propertyType,
    area,
    rooms,
    price,
    brand,
    model,
    year,
    mileage,
    serviceType,
    experience,
    cost,
    limit,
    page,
    search,
    location,
  } = req.query;

  let filteredItems = items;

  if (type !== ItemTypes.ALL) {
    if (type) {
      filteredItems = filteredItems.filter((item) => item.type === type);
    }

    if (propertyType) {
      filteredItems = filteredItems.filter((item) =>
        item.propertyType.toLowerCase().includes(propertyType.toLowerCase()),
      );
    }

    if (!isNaN(area) && area && area !== '0') {
      filteredItems = filteredItems.filter(
        (item) => Number(item.area) >= Number(area),
      );
    }

    if (!isNaN(rooms) && rooms && rooms !== '0') {
      filteredItems = filteredItems.filter(
        (item) => Number(item.rooms) === Number(rooms),
      );
    }

    if (!isNaN(price) && price && price !== '0') {
      filteredItems = filteredItems.filter(
        (item) => Number(item.price) <= Number(price),
      );
    }

    if (brand) {
      filteredItems = filteredItems.filter((item) =>
        item.brand.toLowerCase().includes(brand.toLowerCase()),
      );
    }

    if (model) {
      filteredItems = filteredItems.filter((item) =>
        item.model.toLowerCase().includes(model.toLowerCase()),
      );
    }

    if (!isNaN(year) && year && year !== '0') {
      filteredItems = filteredItems.filter(
        (item) => Number(item.year) === Number(year),
      );
    }

    if (!isNaN(mileage) && mileage && mileage !== '0') {
      filteredItems = filteredItems.filter(
        (item) => Number(item.mileage) <= Number(mileage),
      );
    }

    if (serviceType) {
      filteredItems = filteredItems.filter((item) =>
        item.serviceType.toLowerCase().includes(serviceType.toLowerCase()),
      );
    }

    if (!isNaN(experience) && experience && experience !== '0') {
      filteredItems = filteredItems.filter(
        (item) => Number(item.experience) >= Number(experience),
      );
    }

    if (!isNaN(cost) && cost && cost !== '0') {
      filteredItems = filteredItems.filter(
        (item) => Number(item.cost) <= Number(cost),
      );
    }
  }

  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (location) {
    filteredItems = filteredItems.filter((item) =>
      item.location.toLowerCase().includes(location.toLowerCase()),
    );
  }

  const itemsWithFullImagePath = filteredItems.map((item) => ({
    ...item,
    image: item.image
      ? `${req.protocol}://${req.get('host')}/${item.image}`
      : null,
  }));

  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 5;
  const totalItems = itemsWithFullImagePath.length;
  const maxPage = Math.ceil(totalItems / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedItems = itemsWithFullImagePath.slice(startIndex, endIndex);

  res.json({
    items: paginatedItems,
    maxPage,
    currentPage: pageNumber,
  });
});

app.get('/items/:id', (req, res) => {
  const item = items.find(
    (i) => parseInt(i.id) === parseInt(req.params.id, 10),
  );

  if (item) {
    const itemsWithFullImagePath = {
      ...item,
      image: item.image
        ? `${req.protocol}://${req.get('host')}/${item.image}`
        : null,
    };

    res.json(itemsWithFullImagePath);
  } else {
    res.status(404).send('Item not found');
  }
});

app.put('/items/:id', authenticate, upload.single('image'), (req, res) => {
  const item = items.find(
    (i) => parseInt(i.id) === parseInt(req.params.id, 10),
  );

  if (item) {
    const {name, description, location, type, ...rest} = req.body;
    let image = req.file ? req.file.path : item.image;

    if (image) {
      image = image.replace(/\\/g, '/');
    }

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

    if (name) item.name = name;
    if (description) item.description = description;
    if (location) item.location = location;
    if (type) item.type = type;
    if (image) item.image = image;

    Object.keys(rest).forEach((key) => {
      if (rest[key] !== null && rest[key] !== '' && rest[key] !== 'null') {
        item[key] = rest[key];
      }
    });

    const itemsWithFullImagePath = {
      ...item,
      image: image ? `${req.protocol}://${req.get('host')}/${image}` : null,
    };

    res.json(itemsWithFullImagePath);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/items/:id', authenticate, (req, res) => {
  const itemIndex = items.findIndex(
    (i) => parseInt(i.id) === parseInt(req.params.id, 10),
  );

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
