export interface InserirCompromissoViewModel {
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: Date;
  local: string;
  link: string;
  contato: string;
}

export interface CompromissoInseridoViewModel {
  id: string;
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: Date;
  local: string;
  link: string;
  contato: string;
}

// export interface EditarCompromissoViewModel {
//   nome: string;
//   email: string;
//   telefone: string;
//   empresa: string;
//   cargo: string;
// }

// export interface CompromissoEditadoViewModel {
//   id: string;
//   nome: string;
//   email: string;
//   telefone: string;
//   empresa: string;
//   cargo: string;
// }

// export interface CompromissoExcluidoViewModel {}

export interface ListarCompromissoViewModel {
  id: string;
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: Date;
  local: string;
  link: string;
  contato: string;
}

// export interface VisualizarCompromissoViewModel {
//   id: string;
//   nome: string;
//   email: string;
//   telefone: string;
//   empresa: string;
//   cargo: string;
// }
