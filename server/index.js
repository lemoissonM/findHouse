import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import messengerWebhook, { webHookVerification } from './Messenger/webhookController';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', messengerWebhook);
app.get('/webhook', webHookVerification);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
