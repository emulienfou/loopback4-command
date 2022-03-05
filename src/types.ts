import {ValueOrPromise} from '@loopback/core';
import inquirer, {
  Answers,
  CheckboxQuestion,
  ChoiceOptions,
  ConfirmQuestion,
  EditorQuestion,
  ExpandQuestion,
  InputQuestion,
  ListQuestion,
  NumberQuestion,
  PasswordQuestion,
  QuestionCollection,
  RawListQuestion
} from 'inquirer';
import Separator from 'inquirer/lib/objects/separator';
import {debug} from './index';

/**
 * Returns all available questions types
 */
export {
  ChoiceOptions,
  CheckboxQuestion,
  ConfirmQuestion,
  EditorQuestion,
  ExpandQuestion,
  InputQuestion,
  ListQuestion,
  NumberQuestion,
  PasswordQuestion,
  RawListQuestion,
  Separator
}

/**
 * Interface used by the decorator to typehint passed arguments.
 */
export interface CommandMetadata {
  name: string;
}

/**
 * Interface used to provide execute method.
 * It's only used internally to typehint the get binding method.
 */
export interface CommandInterface {
  execute(args: string[]): ValueOrPromise<void>
}

/**
 * Abstract class that need to be used when create a command.
 * This abstract class provide useful methods on to of Inquirer.js
 */
export abstract class Command implements CommandInterface {
  abstract execute(args: string[]): ValueOrPromise<void>

  protected async prompt(questions: QuestionCollection): Promise<Answers> {
    debug('Running inquirer.prompt')
    return inquirer.prompt(questions)
  }

  protected async choice(name: string, message: string, choices: (string|Separator|ChoiceOptions)[]): Promise<Answers> {
    debug('Running inquirer.prompt as type: "list"')
    return inquirer.prompt([{
      type: 'list',
      name,
      message,
      choices
    }])
  }

  protected async checkbox(name: string, message: string, choices: (string|Separator|ChoiceOptions)[]): Promise<Answers> {
    debug('Running inquirer.prompt as type: "checkbox"')
    return inquirer.prompt([{
      type: 'checkbox',
      name,
      message,
      choices
    }])
  }
}
