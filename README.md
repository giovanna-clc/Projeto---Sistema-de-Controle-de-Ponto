Trabalho avaliativo da disciplina de Programação para WEB
Objetivo

1. Desenvolvimento de uma aplicação WEB utilizando HTML, CSS e Javascript.
1.1. Ampliação do Sistema de Controle de Ponto desenvolvido durante as
aulas da disciplina.

Descrição

O projeto deve ser implementado utilizando apenas HTML, CSS e JavaScript, sem o
uso de frameworks ou bibliotecas externas (como Bootstrap, React, Angular, etc.). O
objetivo principal é a aplicação dos conceitos aprendidos durante a disciplina na
construção de uma aplicação web interativa e funcional.

Requisitos Gerais:

1. Escopo
● O projeto consiste na continuação do desenvolvimento do frontend do
projeto da disciplina de Programação WEB: Sistema de Controle de
Ponto.
2. Tecnologias Utilizadas
● O projeto deve ser implementado utilizando HTML para estruturação,
CSS para estilização e JavaScript para interatividade.
3. Armazenamento de Dados
● O projeto deve utilizar os mecanismos de armazenamento de dados,
como o LocalStorage, para salvar dados relacionados ao sistema.

Requisitos Funcionais:

Observação 1: O trabalho considerará a especificação de requisitos definida no
início da disciplina1
. Os requisitos em negrito e sublinhados NÃO FORAM
implementados durante as aulas e compõem o escopo deste trabalho.
1
https://docs.google.com/document/d/1Q7TEWthik-OJZoqTIsubKJU_vtfKOrduRuWoi3GHPUs/edit?us
p=sharing

Observação 2: Todos os requisitos serão considerados para a composição da nota
final do trabalho, mesmo os já desenvolvidos durante as aulas. Caso os integrantes
do grupo não tenham implementado essas funcionalidades durante as aulas, podem
basear-se no repositório da disciplina como ponto de partida para o trabalho.

Requisitos mínimos:
------------------------------------------------------------------------------------------
  ● Usuário deve poder visualizar a data e hora atual na página principal do
sistema;
  *Feito*
------------------------------------------------------------------------------------------  
  ● Usuário deve poder registrar um ponto de entrada e saída do
expediente;
  *Feito*
------------------------------------------------------------------------------------------
  ● Usuário deve poder registrar um ponto de entrada e saída do intervalo;
  *Feito*
------------------------------------------------------------------------------------------
  ● Usuário deve poder registrar um ponto no passado (dias anteriores
ao atual)
    ○ Esse registro deve possuir uma marcação diferenciada no
relatório de marcações;
    ○ Não deve ser permitida marcação em data futura
  *Feito*
------------------------------------------------------------------------------------------
  ● Usuário deve poder registrar uma justificativa para uma ausência,
inclusive com a possibilidade de fazer um upload de arquivo;
  *Feito*
------------------------------------------------------------------------------------------
  ● Por padrão, a marcação de entrada e saída de expediente e intervalo irá
considerar a data, hora e localização atuais do usuário no momento do
registro;
  *Feito*
------------------------------------------------------------------------------------------
  ● Usuário pode adicionar uma observação a um registro
○ Esses registros devem possuir marcação diferenciada no
relatório de marcações.
  *Feito*
------------------------------------------------------------------------------------------
  ● Usuário deve poder editar os registros
○ Esses registros devem possuir marcação diferenciada no
relatório de marcações.
  *Feito*
------------------------------------------------------------------------------------------
  ● Usuário deve poder visualizar um relatório com os horários de
entrada e saída, inclusive de intervalos
    ○ O relatório deve, preferencialmente, ser apresentado em uma
página html separada;
    ○ Essa página deve mostrar a lista de registros separados por
data;
    ○ Deve apresentar, ao lado de cada registro, um botão para
edição e um botão para exclusão
      ■ O botão de exclusão não deve ter ação válida. Somente
apresentar um alerta ao usuário informando que o ponto
não pode ser excluído;
      ■ A edição de um registro deve editar a sua
correspondência no localstorage.
○ Deve ser possível filtrar os registros por período
      ■ Último mês e última semana, no mínimo.
  *Feito*
------------------------------------------------------------------------------------------
      
Critérios de Avaliação

  ● Implementação correta e eficaz das funcionalidades propostas;
  ● Qualidade do código fonte, seguindo as melhores práticas de
desenvolvimento web;
  ● Design e estilização adequada utilizando CSS
    ○ A avaliação do design considerará somente o posicionamento correto
dos elementos. Cores e características semelhantes não serão
avaliadas.

Orientações para a entrega

  ● Os projetos devem ser entregues até o dia 27/10/2024 23:59;
  ● Os projetos podem ser desenvolvidos individualmente ou em equipe. As
equipes devem ter, no máximo, 4 integrantes;
  ● Não serão considerados trabalhos enviados após o prazo (enviem até a data
limite mesmo que não tenha finalizado o projeto);
  ● O projeto deve ser versionado e hospedado em um repositório público no
GitHub;
  ● Os alunos devem enviar o link do repositório GitHub para avaliação
    ○ O link do repositório público do projeto no Github deve ser enviado para
    o email do professor
      ■ Enviar o link do repositório e o nome completo de todos os
membros da equipe que participaram do desenvolvimento do
projeto.
  ● O projeto deve estar acessível publicamente através do GitHub Pages ou
outra plataforma de hospedagem
    ○ Em caso de utilização de outra plataforma de hospedagem, enviar,
também, o link para o projeto no email de entrega.
  ● O uso de chatGPT e afins é permitido, desde que seja para auxiliar o
desenvolvimento. Não devem ser utilizados códigos prontos gerados por
ferramentas de Inteligência Artificial.
