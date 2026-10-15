import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buscarFerramentas, tools, validarFerramentas } from '../src/tools';

test('o registro de ferramentas é válido', () => {
  assert.deepEqual(validarFerramentas(tools), []);
});

test('a Gestão de horas está cadastrada primeiro', () => {
  assert.equal(tools[0].id, 'gestao-de-horas');
  assert.equal(tools[0].url, 'https://raiugami.github.io/gestao-de-horas');
});

test('validação aponta id repetido e url insegura', () => {
  const t = { ...tools[0], url: 'http://x.com' };
  const erros = validarFerramentas([t, t]);
  assert.ok(erros.some((e) => e.includes('repetido')));
  assert.ok(erros.some((e) => e.includes('https')));
});

test('busca ignora acentos e maiúsculas', () => {
  assert.equal(buscarFerramentas(tools, 'DEDICACAO').length, 1);
  assert.equal(buscarFerramentas(tools, 'inexistente').length, 0);
  assert.equal(buscarFerramentas(tools, '  ').length, tools.length);
});
