import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { catchError, delay, EMPTY, map, Observable, of, throwError } from 'rxjs';
import {
  ContatoEditadoViewModel,
  ContatoExcluidoViewModel,
  ContatoInseridoViewModel,
  EditarContatoViewModel,
  InserirContatoViewModel,
  ListarContatoViewModel,
  VisualizarContatoViewModel,
} from '../models/contato.models';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public inserir(
    inserirContatoVm: InserirContatoViewModel
  ): Observable<ContatoInseridoViewModel> {
    return this.http
      .post<ContatoInseridoViewModel>(this.url, inserirContatoVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    registro: EditarContatoViewModel
  ): Observable<ContatoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
      .put<ContatoEditadoViewModel>(urlCompleto, registro)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ContatoExcluidoViewModel> {
    const urlCompleto = `${this.url}/${id}`;
    return this.http
      .delete<ContatoEditadoViewModel>(
        urlCompleto
      )
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http
      .get(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(id: string): Observable<VisualizarContatoViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`;
    return this.http
      .get<VisualizarContatoViewModel>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;
    return of(EMPTY);
  }

  private processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
