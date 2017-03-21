export const COMPONENTS_INPUTS_DATA = {
  'inputs': {
    'attr': {
      'type': 'string',
      'label': 'attr',
      'tooltip': 'Component attr',
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
      'required': false
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
    'min-length': {
      'type': 'number',
      'label': 'min-length',
      'tooltip': '',
      'default': -1,
      'required': false
    },
    'max-length': {
      'type': 'number',
      'label': 'max-length',
      'tooltip': '',
      'default': -1,
      'required': false
    },
    'sql-type': {
      'type': 'combo',
      'label': 'sql-type',
      'tooltip': '',
      'default': 'OTHER',
      'required': true
    },
    'min': {
      'type': 'number',
      'label': 'min',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'max': {
      'type': 'number',
      'label': 'max',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'step': {
      'type': 'number',
      'label': 'step',
      'tooltip': '',
      'default': 1,
      'required': false
    },
    'grouping': {
      'type': 'boolean',
      'label': 'grouping',
      'tooltip': '',
      'default': false,
      'required': false
    },
    'thousand-separator': {
      'type': 'string',
      'label': 'thousand-separator',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'locale': {
      'type': 'string',
      'label': 'locale',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'min-decimal-digits': {
      'type': 'number',
      'label': 'min-length',
      'tooltip': '',
      'default': 2,
      'required': true
    },
    'max-decimal-digits': {
      'type': 'number',
      'label': 'max-length',
      'tooltip': '',
      'default': 2,
      'required': true
    },
    'decimal-separator': {
      'type': 'string',
      'label': 'decimal-separator',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'decimal-digits': {
      'type': 'number',
      'label': 'decimal-digits',
      'tooltip': '',
      'default': 2,
      'required': false
    },
    'columns': {
      'type': 'number',
      'label': 'columns',
      'tooltip': '',
      'default': 5,
      'required': false
    },
    'rows': {
      'type': 'number',
      'label': 'rows',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'format': {
      'type': 'string',
      'label': 'format',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'title-label': {
      'type': 'string',
      'label': 'title-label',
      'tooltip': '',
      'default': null,
      'required': false
    },
    'layout-align': {
      'type': 'string',
      'label': 'layout-align',
      'tooltip': '',
      'default': 'start start',
      'required': false
    },
    'layout-fill': {
      'type': 'boolean',
      'label': 'layout-fill',
      'tooltip': '',
      'default': false,
      'required': false
    },
    'elevation': {
      'type': 'number',
      'label': 'elevation',
      'tooltip': '',
      'default': 0,
      'required': false
    },
    'currency-symbol': {
      'type': 'combo',
      'label': 'currency-symbol',
      'tooltip': '',
      'default': 'EUR',
      'required': false
    },
    'currency-symbol-position': {
      'type': 'combo',
      'label': 'currency-symbol-position',
      'tooltip': '',
      'default': 'right',
      'required': false
    }
  },
  'select-values': {
    'tooltip-position': {
      'values': [
        'before',
        'after',
        'above',
        'below',
        'left',
        'right'
      ]
    },
    'sql-type': {
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
    },
    'currency-symbol': {
      'values': [
        'USD',
        'EUR',
        'CRC',
        'GBP',
        'ILS',
        'INR',
        'JPY',
        'KRW',
        'NGN',
        'PHP',
        'PLN',
        'PYG',
        'THB',
        'UAH',
        'VND'
      ]
    },
    'currency-symbol-position': {
      'values': [
        'left',
        'right'
      ]
    }
  }
};
