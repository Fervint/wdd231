const cursoBYUI = {
  titulo: "WDD231",
  secoes: [
    { numero: 1, matriculados: 87, instrutor: "Irmão Silva" },
    { numero: 2, matriculados: 84, instrutor: "Irmã Pinheiro" },
    { numero: 3, matriculados: 94, instrutor: "Irmã Oliveira" }
  ],
  mudarMatricula(numeroSecao, adicionar = true) {
    const secao = this.secoes.find(s => s.numero === numeroSecao);
    if (secao) {
      if (adicionar) secao.matriculados++;
      else secao.matriculados--;
    }
  }
};

export default cursoBYUI;
