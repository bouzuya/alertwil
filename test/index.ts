import * as assert from 'power-assert';
import beater from 'beater';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

const { test } = beater();

test('index', () => {
  assert(assert);
  assert(proxyquire);
  assert(sinon);
  assert(1 === 1);
});
