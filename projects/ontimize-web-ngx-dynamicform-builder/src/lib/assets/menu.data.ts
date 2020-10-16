export const MENU_JSON_DATA: any = [
  {
    icon: '',
    id: 'LAYOUT',
    label: 'LAYOUT',
    parent: '',
    elements: [{
      icon: 'swap_vert',
      'ontimize-component': 'o-column',
      label: 'o-column'
    },
    {
      icon: 'swap_horiz',
      'ontimize-component': 'o-row',
      label: 'o-row'
    }]
  },
  {
    icon: '',
    id: 'BASIC_FIELDS',
    label: 'BASIC_FIELDS',
    parent: '',
    elements: [{
      icon: 'text_fields',
      'ontimize-component': 'o-text-input',
      label: 'o-text'
    },
    {
      icon: null,
      svgIcon: 'odfb:integer',
      'ontimize-component': 'o-integer-input',
      label: 'o-integer'
    },
    {
      icon: null,
      svgIcon: 'odfb:real',
      'ontimize-component': 'o-real-input',
      label: 'o-real'
    },
    {
      icon: null,
      svgIcon: 'ontimize:PERCENT',
      'ontimize-component': 'o-percent-input',
      label: 'o-percent'
    },
    {
      icon: 'euro_symbol',
      'ontimize-component': 'o-currency-input',
      label: 'o-currency'
    },
    {
      icon: 'person',
      'ontimize-component': 'o-nif-input',
      label: 'o-nif'
    },
    {
      icon: 'alternate_email',
      'ontimize-component': 'o-email-input',
      label: 'o-email'
    },
    {
      icon: 'enhanced_encryption',
      'ontimize-component': 'o-password-input',
      label: 'o-password'
    },
    {
      icon: null,
      svgIcon: 'odfb:textarea',
      'ontimize-component': 'o-textarea-input',
      label: 'o-textarea'
    },
    {
      icon: 'calendar_today',
      'ontimize-component': 'o-date-input',
      label: 'o-date'
    }, {
      icon: 'check_box',
      'ontimize-component': 'o-checkbox',
      label: 'o-checkbox'
    }]
  },
  {
    icon: '',
    id: 'SERVICE_FIELDS',
    label: 'SERVICE_FIELDS',
    parent: '',
    elements: [{
      icon: null,
      svgIcon: 'odfb:combo',
      'ontimize-component': 'o-combo',
      label: 'o-combo'
    },
    {
      icon: null,
      svgIcon: 'odfb:listpicker',
      'ontimize-component': 'o-list-picker',
      label: 'o-list-picker'
    },
    {
      icon: 'grid_on',
      'ontimize-component': 'o-table',
      label: 'o-table'
    }]
  }

];
