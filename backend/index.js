const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', todosRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
