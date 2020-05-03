const currentEnv = process.env;
const accountSid = currentEnv.TWILIO_ACCOUNT_SID;
const authToken = currentEnv.TWILIO_AUTH_TOKEN;
const wppFrom = currentEnv.TWILIO_WHATSAPP_FROM;
const wppTo = currentEnv.TWILIO_WHATSAPP_TO;

const client = require("twilio")(accountSid, authToken);

const sendWhatsAppMessage = async () =>
  await client.messages.create({
    body: "O servidor está online, sai do netflix e vamos rushar elo",
    from: `whatsapp:${wppFrom}`,
    to: `whatsapp:${wppTo}`,
  });

export default sendWhatsAppMessage;
