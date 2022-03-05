import {Application, Binding, MetadataInspector, MixinTarget } from '@loopback/core';
import {CommandInterface, CommandMetadata} from '../types';
import {BINDING_METADATA_KEY} from '../keys';
import {debug} from '../index';

/**
 * Command mixin used to execute command.
 * @param superClass
 * @constructor
 */
export function CommandMixin<T extends MixinTarget<Application>>(superClass: T) {
  return class extends superClass {
    async executeCommand(args: string[]): Promise<void> {
      // Get command arguments
      const commandArgs = args.slice(2)
      // Get command name and input options/arguments
      const [commandName, ...rest] = commandArgs
      // Find all tagged bindings as `command`
      const commandBindings: Readonly<Binding<unknown>>[] = this.findByTag('command')
      for (const c of commandBindings) {
        // Get instance of the command
        const instance = await this.get<CommandInterface>(c.key)
        // Get specs from class metadata
        const specs = MetadataInspector.getClassMetadata<CommandMetadata>(BINDING_METADATA_KEY, instance.constructor)
        // Find the correct command by `name`
        if (commandName === specs?.name) {
          debug('Executing command "%s"', commandName)
          // Run `execute` method from command
          await instance.execute(rest)
          debug('Command successfully executed')
        }
      }
    }
  }
}
