import { OComponentData } from '../o-component-data.class';

export class OComponenetDataInput extends OComponentData {

  getTemplateInputsData() {
    return {
      'attr': {
        'type': 'string',
        'label': 'attr',
        'tooltip': '',
        'default': null,
        'required': true
      },
      'label': {
        'type': 'string',
        'label': 'label',
        'tooltip': '',
        'default': null,
        'required': false
      },
      'tooltip': {
        'type': 'string',
        'label': 'tooltip',
        'tooltip': '',
        'default': null,
        'required': false
      },
      'tooltip-position': {
        'type': 'combo',
        'label': 'tooltip-position',
        'tooltip': '',
        'default': 'below',
        'required': false,
        'values': [
          'before',
          'after',
          'above',
          'below',
          'left',
          'right'
        ]
      },
      'tooltip-show-delay': {
        'type': 'number',
        'label': 'tooltip-show-delay',
        'tooltip': '',
        'default': 500,
        'required': false
      },
      'data': {
        'type': 'string',
        'label': 'data',
        'tooltip': '',
        'default': null,
        'required': false
      },
      'automatic-binding': {
        'type': 'boolean',
        'label': 'automatic-binding',
        'tooltip': '',
        'default': true,
        'required': false
      },
      'enabled': {
        'type': 'boolean',
        'label': 'enabled',
        'tooltip': '',
        'default': true,
        'required': false
      },
      'required': {
        'type': 'boolean',
        'label': 'required',
        'tooltip': '',
        'default': false,
        'required': false
      },
      'sql-type': {
        'type': 'combo',
        'label': 'sql-type',
        'tooltip': '',
        'default': 'OTHER',
        'required': true,
        'values': [
          'BIT',
          'TINYINT',
          'SMALLINT',
          'INTEGER',
          'BIGINT',
          'FLOAT',
          'REAL',
          'DOUBLE',
          'NUMERIC',
          'DECIMAL',
          'CHAR',
          'VARCHAR',
          'LONGVARCHAR',
          'DATE',
          'TIME',
          'TIMESTAMP',
          'BINARY',
          'VARBINARY',
          'LONGVARBINARY',
          'NULL',
          'OTHER',
          'JAVA_OBJECT',
          'DISTINCT',
          'STRUCT',
          'ARRAY',
          'BLOB',
          'CLOB',
          'REF',
          'DATALINK',
          'BOOLEAN',
          'ROWID',
          'NCHAR',
          'NVARCHAR',
          'LONGNVARCHAR',
          'NCLOB',
          'SQLXML'
        ]
      }
    };
  }

}
