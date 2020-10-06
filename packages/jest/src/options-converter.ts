import { SchemaObject as JestBuilderSchema } from './schema';

export class OptionsConverter {
  private convertAliases(option: string) {
    if (option === 'codeCoverage') {
      return 'coverage';
    }

    return option;
  }

  convertToCliArgs(options: Partial<JestBuilderSchema>): string[] {
    const argv = [];

    for (let option of Object.keys(options)) {
      let optionValue = options[option];

      option = this.convertAliases(option);

      if (optionValue === true) {
        argv.push(`--${option}`);
      } else if (typeof optionValue === 'string' || typeof optionValue === 'number') {
        argv.push(`--${option}=${optionValue}`);
      } else if (Array.isArray(optionValue)) {
        for (const item of optionValue) {
          argv.push(`--${option}=${item}`);
        }
      }
    }

    return argv;
  }
}
