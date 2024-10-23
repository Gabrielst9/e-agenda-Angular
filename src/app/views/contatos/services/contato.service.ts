import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ListarContatoViewModel } from '../models/contato.models';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http.get<ListarContatoViewModel>(this.url, this.obterHeadresAutorizacao())
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;
  }


  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }

  private obterHeadresAutorizacao() {
    const chave = this.localStorageService.obterTokenAutenticacao()?.chave;

    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chave}`
      }
    }
  }
}
