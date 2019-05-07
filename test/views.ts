import * as assert from 'power-assert';
import { test } from 'beater';
import {
  alert as renderAlert,
  alertResult as renderAlertResult
} from '../src/views';

const tests = [
  test('views > alert', () => {
    const alert = {};
    const message = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<Response>',
      '<Say language="ja-JP">',
      'Mayday! Mayday! Mayday! ',
      'This is Alertwil! Alertwil! Alertwil! ',
      '</Say>',
      '</Response>'
    ].join('');
    assert(renderAlert(alert) === message);
  }),

  test('views > alertResult', () => {
    const result = {};
    assert(renderAlertResult(result) === 'OK');
  })
];

export { tests };
