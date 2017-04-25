import express from 'express';
import bodyParser from 'body-parser';

import register from './routes/register';
import userauth from './routes/userauth';
import processapp from './routes/processapp';

const app = express();

app.use(bodyParser.json());

app.use('/api/register', register);
app.use('/api/login', userauth);
app.use('/api/application', processapp);

const PORT = 3003;
app.listen(PORT, () => {
	console.log("Listening on http://127.0.0.1:3003");
});