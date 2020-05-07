import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico', {static: false}) textInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  completado: boolean = false;
  editando: boolean = false;

  touchtime = 0;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    // this.completado = this.todo.completado;
    // this.completado = true;
    this.chkCompletado = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe( valor => {
      // console.log( valor );
      this.store.dispatch( actions.toggle( { id: this.todo.id } ) );
    });

  }


  tipoDeClick() {
    if ( this.touchtime === 0 ) {
      this.touchtime = new Date().getTime();
    } else {
      if ( new Date().getTime() - this.touchtime < 400 ) {
        this.dobleClick();
      } else {
        this.touchtime = new Date().getTime();
      }
    }
  }

  dobleClick() {
    this.editar();
  }

  editar() {
    // console.log('Editando');
    this.editando = true;
    this.txtInput.setValue( this.todo.texto );

    setTimeout(() => {
      this.textInputFisico.nativeElement.select();
    }, 1 );
  }

  terminarEdicion() {
    this.editando = false;

    if ( this.txtInput.invalid ) { return; }
    if ( this.txtInput.value === this.todo.texto ) { return; }

    this.store.dispatch(
      actions.editar({
        id: this.todo.id,
        texto: this.txtInput.value
      })
    );
  }

  borrar() {
    this.store.dispatch( actions.borrar({ id: this.todo.id }));
  }

}
