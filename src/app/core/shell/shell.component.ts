import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LinkNavegacao } from './models/link-navegacao.model';
import { UsuarioTokenViewModel } from '../auth/models/auth.model';
import { MatMenuModule } from '@angular/material/menu';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  @Input() usuarioAutenticado?: UsuarioTokenViewModel;
  @Output() logout: EventEmitter<void>;

  links: LinkNavegacao[] = [
    {
      titulo: 'Login',
      icone: 'login',
      rota: '/login',
    },
    {
      titulo: 'Registro',
      icone: 'person_add',
      rota: '/registro',
    },
  ];

  authLinks: LinkNavegacao[] = [
    {
      titulo: 'Dashboard',
      icone: 'home',
      rota: '/dashboard',
    },
    {
      titulo: 'Contatos',
      icone: 'people',
      rota: '/contatos',
    },
    {
      titulo: 'Compromissos',
      icone: 'event',
      rota: '/compromissos'
    },
  ];

  isHandset$: Observable<boolean>;

  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Tablet])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );

    this.logout = new EventEmitter();
  }

  logoutAcionado() {
    this.logout.emit();
  }
}
