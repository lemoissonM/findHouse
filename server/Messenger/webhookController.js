import { handleMessage, handlePostback } from './handler';

export default function webhookController(req, res) {
  const { body } = req;
  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];

      // Get the sender PSID
      const senderPsid = webhookEvent.sender.id;
      console.log(`Sender PSID: ${senderPsid}`);

      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
}

export function webHookVerification(req, res) {
  const VERIFY_TOKEN = process.env.verificationToken;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    }
    res.sendStatus(403);
  }
}
