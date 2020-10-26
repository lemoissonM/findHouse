/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import axios from 'axios';
import getReply from '../Bot';
import { getDetails, getMapImage } from '../Bot/data';

export async function callSendAPI(id, response) {
  for (const res of response) {
    try {
      await axios.post(`https://graph.facebook.com/v8.0/me/messages?access_token=${process.env.facebookToken}`, {
        recipient: {
          id,
        },
        message: res,
      });
    } catch (ex) {
      console.log(ex.response.data);
    }
  }
}

export async function handleQuickReplies(data, psid) {
  switch (data.type) {
    case 'visit':
      return callSendAPI(psid, getMapImage(data.id));
    default:
      return callSendAPI(psid, [{ text: 'Je m\'excuse j\'ai pas su traiter votre requette' }]);
  }
}

// Handles messages events
export async function handleMessage(senderPsid, receivedMessage) {
  if (receivedMessage.quick_reply) {
    handleQuickReplies(JSON.parse(receivedMessage.quick_reply.payload),
      senderPsid);
  }
  const response = getReply(receivedMessage.nlp, senderPsid);
  // Send the response message
  if (response) {
    callSendAPI(senderPsid, response, true);
  }
}

// Handles messaging_postbacks events
export async function handlePostback(senderPsid, receivedPostback) {
  let response;
  // Get the payload for the postback
  const { payload } = receivedPostback;
  const object = JSON.parse(payload);
  switch (object.action) {
    case 'house.detail':
      response = getDetails(object.name);
      // console.log(JSON.stringify(response));
      break;
    case 'house.visit':
      response = getMapImage(object.name);
      break;
    default:
      response = { text: 'nothing' };
      break;
  }
  // Send the message to acknowledge the postback
  return callSendAPI(senderPsid, response);
}
