import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as actionsFiltro from 'src/app/filtro/filtro.actions';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actionsFiltro.filtrosValidos = 'todos';
  filtros: actionsFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    // this.store.select('filtro').subscribe( filtro => {
    //   // console.log( filtro );
    //   this.filtroActual = filtro;
    // });

    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado ).length;
    });

  }

  cambiarFiltro( filtro: actionsFiltro.filtrosValidos ) {
    // console.log( filtro );
    this.store.dispatch( actionsFiltro.setFiltro( { filtro } ) );
  }

  borrarLosCompletados() {
    this.store.dispatch( actions.borrarCompletados() );
  }

}
