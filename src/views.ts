import * as twilio from 'twilio';

// unused
const render = (name: string, data: any): string => {
  switch (name) {
    case 'alert': return alert(data);
    case 'alert-result': return alertResult(data);
    default: throw new Error();
  }
};

const alert = (_data: any): string => {
  const r = new twilio.TwimlResponse();
  const message = 'Mayday! '.repeat(3) + 'This is ' + 'Alertwil! '.repeat(3);
  r.say(message, { language: 'ja-JP' });
  return r.toString();
};

const alertResult = (_data: any): string => {
  return 'OK';
};

export { alert, alertResult };
