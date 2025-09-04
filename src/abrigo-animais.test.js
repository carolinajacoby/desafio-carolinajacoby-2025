import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  // ============================
  // TESTES ORIGINAIS
  // ============================
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola'
    );
    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  // ============================
  // TESTES ADICIONAIS
  // ============================
  test('Ambas pessoas aptas, animal fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'rato,bola', 'rato,bola', 'Rex'
    );
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test('Jabuti sem outro animal adotado fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'skate,rato', 'bola,laser', 'Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  // ============================
  // TESTES DE ERRO E DUPLICATAS
  // ============================
  test('Brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'rato,carro', 'bola,laser', 'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Animal duplicado na ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'rato,bola', 'bola,laser', 'Rex,Rex'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Brinquedo duplicado para pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'rato,rato,bola', 'bola,laser', 'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

});
