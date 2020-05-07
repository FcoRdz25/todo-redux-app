import { createReducer, on, props } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, borrarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de IronMan'),
  new Todo('Robar escudo del capitan America'),
];


// tslint:disable-next-line: variable-name
const _todoReducer = createReducer(estadoInicial,
    // con "..." separamos cada todo y los extraemos de manera independiete y luego se le agrega el nuevo todo
    // Pera evitar mutar el objeto. Es decir, evitamos que el objeto "state" pase por referencia por lo que
    // regresamos un nuevo objeto
  on(crear, (state, { texto } ) => [...state, new Todo( texto ) ] ),

  // "filter" ya nos entrega un nuevo objeto por lo que no tenemos problema en usarlo directamente
  on( borrar, (state, { id }) => state.filter( todo => todo.id !== id )),

  on( borrarCompletados, state  => state.filter( todo => todo.completado === false )),

  on(toggle, (state, { id } ) => {
    // Map crea un nuevo arreglo
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        };
      } else {
        return todo;
      }
    });
  }),

  on(editar, (state, { id, texto } ) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          // tslint:disable-next-line: object-literal-shorthand
          texto: texto
        };
      } else {
        return todo;
      }
    });
  }),

  on(toggleAll, (state, { completado } ) => {
    return state.map(todo => {
      return {
        ...todo,
        // tslint:disable-next-line: object-literal-shorthand
        completado: completado
      };
    });
  }),


);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
