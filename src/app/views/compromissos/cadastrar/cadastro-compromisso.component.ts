import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ContatoService } from '../../contatos/services/contato.service';
import { CompromissoService } from '../services/compromisso.service';
import { CompromissoInseridoViewModel } from '../models/compromisso.models';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-cadastro-compromisso',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './cadastro-compromisso.component.html',
})
export class CadastroCompromissoComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      assunto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      local: [''],
      link: [''],
      contato: [''],
    });
  }


  get assunto() {
    return this.form.get('assunto');
  }

  get data() {
    return this.form.get('data');
  }

  get horaInicio() {
    return this.form.get('hora início');
  }

  get horaTermino() {
    return this.form.get('hora término');
  }

  get local() {
    return this.form.get('local');
  }

  get link() {
    return this.form.get('link');
  }

  get contato() {
    return this.form.get('contato');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }

    const inserirCompromissoVm = this.form.value;

    const observer: PartialObserver<CompromissoInseridoViewModel> = {
      next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
      error: (erro) => this.processarFalha(erro),
    };

    this.compromissoService.inserir(inserirCompromissoVm).subscribe(observer);
  }

  private processarSucesso(compromisso: CompromissoInseridoViewModel): void {
    this.notificacaoService.sucesso(
      `Compromisso ${compromisso.assunto} cadastrado com sucesso!`
    );

    this.router.navigate(['/compromissos', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}
