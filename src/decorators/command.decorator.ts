import {ClassDecoratorFactory} from '@loopback/metadata';
import {CommandMetadata} from '../types';
import {BINDING_METADATA_KEY} from '../keys';

export const command = (spec: CommandMetadata): ClassDecorator => {
  return ClassDecoratorFactory.createDecorator<CommandMetadata>(
    BINDING_METADATA_KEY,
    spec,
    { decoratorName: '@command' }
  )
}
