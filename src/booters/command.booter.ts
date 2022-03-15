import {ArtifactOptions, BaseArtifactBooter, BootBindings, booter} from '@loopback/boot';
import {Application, config, CoreBindings, createBindingFromClass, inject} from '@loopback/core';
import {debug} from '../index';

@booter('commandBooter')
export class CommandBooter extends BaseArtifactBooter {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app: Application,
    @inject(BootBindings.PROJECT_ROOT) projectRoot: string,
    @config() options: ArtifactOptions = {}
  ) {
    super(
      projectRoot,
      // Set Command Booter Options if passed in via bootConfig
      Object.assign({}, CommandDefaults, options),
    );
  }


  async load(): Promise<void> {
    await super.load();

    for (const cls of this.classes) {
      debug('Bind class: %s', cls.name);
      this.app.add(createBindingFromClass(cls).tag('command'))
    }
  }
}

/**
 * Default ArtifactOptions for CommandBooter.
 */
export const CommandDefaults: ArtifactOptions = {
  dirs: ['commands'],
  extensions: ['.command.js'],
  nested: true,
};
