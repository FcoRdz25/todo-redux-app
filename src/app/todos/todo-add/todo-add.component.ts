import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {


  txtInput: FormControl;

  constructor( private store: Store<AppState> ) {

    // Le agregamos la Validacion que debe de tener almenos una letra.
    // Probamos que nos mueste un string
    // this.txtInput = new FormControl('Hola', Validators.required );
    this.txtInput = new FormControl('', Validators.required );

  }

  ngOnInit() {
  }


  agregar() {

    if ( this.txtInput.invalid ) { return; }

    this.store.dispatch( actions.crear( { texto: this.txtInput.value} ) );

    this.txtInput.reset();
  }

}
