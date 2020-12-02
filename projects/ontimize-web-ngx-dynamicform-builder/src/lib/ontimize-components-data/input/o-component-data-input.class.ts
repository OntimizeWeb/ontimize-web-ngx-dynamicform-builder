import { InputMetadata } from '../../types/inputs-metadata.type';
import { OComponentData } from '../o-component-data.class';

export class OComponenetDataInput extends OComponentData {

  public getBasicInputs(): string[] {
    const result = super.getBasicInputs();
    result.push(...['label', 'placeholder', 'enabled', 'required']);
    return result;
  }

  public getInputsMetadata(): InputMetadata[] {
    const inputsMetadata = super.getInputsMetadata();
    const metadata: InputMetadata[] = [{
      input: 'label',
      type: 'string',
      label: 'label',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'float-label',
      type: 'combo',
      label: 'float-label',
      tooltip: '',
      default: 'auto',
      required: false,
      values: ['always', 'never', 'auto']
    }, {
      input: 'placeholder',
      type: 'string',
      label: 'placeholder',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'tooltip',
      type: 'string',
      label: 'tooltip',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'tooltip-position',
      type: 'combo',
      label: 'tooltip-position',
      tooltip: 'Tooltip position (TEST: translate)',
      default: 'below',
      required: false,
      values: ['before', 'after', 'above', 'below', 'left', 'right']
    }, {
      input: 'tooltip-show-delay',
      type: 'number',
      label: 'tooltip-show-delay',
      tooltip: '',
      default: 500,
      required: false
    }, {
      input: 'tooltip-hide-delay',
      type: 'number',
      label: 'tooltip-hide-delay',
      tooltip: '',
      default: 0,
      required: false
    }, {
      input: 'data',
      type: 'string',
      label: 'data',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'automatic-binding',
      type: 'boolean',
      label: 'automatic-binding',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'automatic-registering',
      type: 'boolean',
      label: 'automatic-registering',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'enabled',
      type: 'boolean',
      label: 'enabled',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'required',
      type: 'boolean',
      label: 'required',
      tooltip: 'Requided attribute (TEST: translate)',
      default: false,
      required: false
    }, {
      input: 'read-only',
      type: 'boolean',
      label: 'read-only',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'clear-button',
      type: 'boolean',
      label: 'clear-button',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'appearance',
      type: 'combo',
      label: 'appearance',
      tooltip: '',
      default: false,
      required: false,
      values: ['legacy', 'standard', 'fill', 'outline']
    }, {
      input: 'hide-required-marker',
      type: 'boolean',
      label: 'hide-required-marker',
      tooltip: '',
      default: false,
      required: false
    }, {
      input: 'label-visible',
      type: 'boolean',
      label: 'label-visible',
      tooltip: '',
      default: true,
      required: false
    }, {
      input: 'width',
      type: 'string',
      label: 'width',
      tooltip: '',
      default: null,
      required: false
    }, {
      input: 'sql-type',
      type: 'combo',
      label: 'sql-type',
      tooltip: '',
      default: 'OTHER',
      required: true,
      values: ['BIT', 'TINYINT', 'SMALLINT', 'INTEGER', 'BIGINT', 'FLOAT', 'REAL', 'DOUBLE', 'NUMERIC', 'DECIMAL', 'CHAR', 'VARCHAR', 'LONGVARCHAR', 'DATE', 'TIME', 'TIMESTAMP', 'BINARY', 'VARBINARY', 'LONGVARBINARY', 'NULL', 'OTHER', 'JAVA_OBJECT', 'DISTINCT', 'STRUCT', 'ARRAY', 'BLOB', 'CLOB', 'REF', 'DATALINK', 'BOOLEAN', 'ROWID', 'NCHAR', 'NVARCHAR', 'LONGNVARCHAR', 'NCLOB', 'SQLXML']
    }];
    inputsMetadata.push(...metadata);
    return inputsMetadata;
  }

  public getAvailableSelectorsToChange(): string[] {
    return [
      'o-text-input',
      'o-integer-input',
      'o-real-input',
      'o-percent-input',
      'o-currency-input',
      'o-nif-input',
      'o-email-input',
      'o-password-input',
      'o-textarea-input',
      'o-date-input'
    ];
  }

}
