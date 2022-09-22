# loopback4-command

## Stability: ⚠️Experimental⚠️

> Experimental packages provide early access to advanced or experimental
> functionality to get community feedback. Such modules are published to npm
> using `0.x.y` versions. Their APIs and functionality may be subject to
> breaking changes in future releases.

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
to install `loopback4-command`

```sh
npm install --save loopback4-command
```

## Basic use

### Use the mixin

This module provides a mixin for your Application that enables convenience methods.

```ts
import {CommandMixin} from 'loopback4-command';

class MyApplication extends CommandMixin(Application) {}
```

### Create command

We can now create an instance of `Command`.

```ts
import {command, Command} from 'loopback4-command';

// Create a command
@command({ name: 'dummy' })
export class DummyCommand extends Command {
  public async execute(args: string[]): Promise<void> {
    // Helper method provided by Command class
    await this
      .choice('question', 'Question?', ['Choice A', new Separator(), 'choice B'])
      .then((answers) => {
        console.log(JSON.stringify(answers, null, '  '))
      })
  }
}
```

> This package is using [Inquirer.js](https://www.npmjs.com/package/inquirer) that let you
> interact with the command line interface

### Add command script

To be able to run the commands, you will need to create a `src/command.ts` file
containing the next script:

```ts
import {Application} from './application';

export const command = async (args: string[]) => {
  const app = new Application();
  await app.boot();
  await app.executeCommand(args);

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

command(process.argv).catch(err => {
  console.error('Cannot run command', err);
  process.exit(1);
})
```

Then you will need to add a new script inside your `package.json` file, like:
```json
{
  "scripts": {
    "command": "node ./dist/command"
  }
}
```

## Helpers

This package is providing helper method on to of [Inquirer.js](https://www.npmjs.com/package/inquirer).

### prompt

```ts
this.prompt([/* Pass your questions in here */])
```
> See: https://github.com/SBoudrias/Inquirer.js#question

### choice

```ts
this.choice('name', 'message', ['choice1', 'choice2'])
```
> See: https://github.com/SBoudrias/Inquirer.js#list---type-list

### checkbox

```ts
this.checkbox('name', 'message', ['choice1', 'choice2'])
```

## Debug

To display debug messages from this package, you can use the next command:

```shell
DEBUG=loopback:command npm run command dummy
```
> See: https://github.com/SBoudrias/Inquirer.js#checkbox---type-checkbox

## Tests

Run `npm test` from the root folder.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is licensed under the [MIT](LICENSE.md)
