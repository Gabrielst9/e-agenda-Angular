import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/compromisso.models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-listagem-compromisso',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-compromisso.component.html',
})
export class ListagemCompromissoComponent implements OnInit{
 compromissos: ListarCompromissoViewModel[] = []

 constructor(private route: ActivatedRoute) {}

 ngOnInit(): void {
    this.compromissos = this.route.snapshot.data['compromissos'];
 }
}
