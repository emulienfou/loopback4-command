import {Binding, Component, createBindingFromClass} from '@loopback/core';
import {CommandBooter} from '../booters';

export class CommandComponent implements Component {
  bindings: Binding[] = [
    createBindingFromClass(CommandBooter),
  ]
}
