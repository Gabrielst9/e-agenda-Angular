import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../../../core/auth/services/local-storage.service";
import { environment } from "../../../../enviroments/environment";
import { ListarCompromissoViewModel } from "../models/compromisso.models";
import { catchError, EMPTY, map, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CompromissoService {
  private readonly url = `${environment.apiUrl}/compromissos`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;
    return of(EMPTY);
  }

  private processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
};
