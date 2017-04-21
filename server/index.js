import express from 'express';
import bodyParser from 'body-parser';

import register from './sfuncs/register';
import userlogin from './sfuncs/userlogin';

const app = express();

app.use(bodyParser.json());

app.use('/api/register', register);
app.use('/api/login', userlogin);

const PORT = 3003;
app.listen(PORT, () => {
	console.log("Listening on http://127.0.0.1:3003");
});