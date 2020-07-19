const express = require('express');
const { user, state, district, child } = require('./routes/api');
const { isAuth } = require('./policies');

const app = express();

isAuth.unless = require('express-unless');

app.use(express.json());
app.use(
  isAuth.unless({
    path: ['/api/user/login', { url: '/api/user', methods: ['POST'] }],
  })
);
app.use('/api/user', user);

app.use('/api/state', state);

app.use('/api/district', district);

app.use('/api/child', child);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
