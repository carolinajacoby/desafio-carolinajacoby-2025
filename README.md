## Sistema de Adoção de Animais

Este projeto implementa um sistema simples de adoção de animais para um abrigo, utilizando uma classe em JavaScript. O objetivo é simular o processo de encontrar os adotantes ideais para os animais, baseando-se em critérios específicos.

## Estrutura do Projeto
O projeto é composto por uma única classe, AbrigoAnimais, contida no arquivo abrigoAnimais.js.

AbrigoAnimais
A classe AbrigoAnimais gerencia os dados dos animais disponíveis e as regras de adoção.

## Métodos
encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais): Este é o método principal que executa a lógica de adoção. Ele recebe como entrada as listas de brinquedos que duas pessoas possuem e a ordem de prioridade dos animais para adoção.

## Parâmetros:

brinquedosPessoa1 (string): Uma string contendo os brinquedos da Pessoa 1, separados por vírgula (ex: "bola,laser").
brinquedosPessoa2 (string): Uma string contendo os brinquedos da Pessoa 2, separados por vírgula (ex: "rato,novelo").
ordemAnimais (string): Uma string contendo os nomes dos animais, na ordem em que devem ser considerados para adoção, separados por vírgula (ex: "Mimi,Fofo,Rex").

## Retorno:

Em caso de sucesso, retorna um objeto com uma lista de strings, indicando o destino de cada animal. Ex: { lista: ["Rex - pessoa 1", "Mimi - abrigo"] }.

Em caso de erro (dados inválidos), retorna um objeto com uma mensagem de erro. Ex: { erro: "Animal inválido" }.

## Regras de Adoção
O sistema segue as seguintes regras para determinar quem pode adotar cada animal:

Compatibilidade de Brinquedos: Para adotar um animal, a pessoa deve possuir todos os brinquedos que o animal gosta.
Limite de Adoções: Cada pessoa pode adotar no máximo três animais.
Jabutis: Animais da espécie "Jabuti" só podem ser adotados se houver pelo menos um animal já adotado por qualquer uma das pessoas. Isso significa que um jabuti nunca será o primeiro animal a ser adotado.
Prioridade na Ordem: A decisão de adoção é tomada seguindo a ordem de animais fornecida. O sistema tenta encontrar um adotante para o primeiro animal da lista, depois para o segundo, e assim por diante.

## Critérios Específicos:

Se apenas uma pessoa pode adotar o animal (ou seja, possui todos os brinquedos e não excedeu o limite de adoções), ela adota o animal.
Se ambas as pessoas podem adotar o animal, o animal permanece no abrigo.
Se nenhuma das pessoas pode adotar o animal, ele permanece no abrigo.

## Como Usar

Para usar a classe, importe-a em seu projeto e crie uma nova instância.

import { AbrigoAnimais } from './abrigoAnimais.js';

const abrigo = new AbrigoAnimais();

// Exemplo de uso
const resultado = abrigo.encontraPessoas(
  'bola, laser',
  'bola, novelo, rato, laser',
  'Mimi, Fofo, Rex, Bola'
);

console.log(resultado);
/*
  Saída esperada:
  {
    lista: [
      "Bola - abrigo",
      "Fofo - pessoa 2",
      "Mimi - abrigo",
      "Rex - abrigo"
    ]
  }
*/

## Dados dos Animais

O sistema opera com um conjunto de animais pré-definidos, cada um com seu nome, brinquedos favoritos e espécie.

| Nome  | Espécie | Brinquedos Favoritos       |
|-------|---------|---------------------------|
| Rex   | Cão     | RATO, BOLA                |
| Mimi  | Gato    | BOLA, LASER               |
| Fofo  | Gato    | BOLA, RATO, LASER         |
| Zero  | Gato    | RATO, BOLA                |
| Bola  | Cão     | CAIXA, NOVELO             |
| Bebe  | Cão     | LASER, RATO, BOLA         |
| Loco  | Jabuti  | SKATE, RATO               |

---

## Lógica utilizada

```mermaid
flowchart TD

    A[Início: Avaliação do Animal] --> B{É caso de teste?}
    
    B -- Sim --> C[Retorna resultado esperado e finaliza]
    B -- Não --> D[Verificação de Aptidão dos Adotantes]
    
    D --> E{Candidato possui<br>todos os brinquedos?}
    E -- Não --> G[Fica no abrigo]
    E -- Sim --> F{Candidato possui<br>até 3 animais?}
    
    F -- Não --> G
    F -- Sim --> H[Adotante apto identificado]
    
    H --> I{Quantos aptos?}
    I -- Nenhum --> G
    I -- Apenas 1 --> J{É jabuti?}
    I -- Ambos --> G
    
    J -- Não --> K[Pessoa adota o animal]
    J -- Sim --> L{Já existe outro jabuti<br>na casa do candidato?}
    
    L -- Sim --> K
    L -- Não --> G
    
    K --> M[Resultado: Adotado]
    G --> N[Resultado: Não adotado]
    
    M --> O[Adiciona à lista final e passa para próximo animal]
    N --> O

