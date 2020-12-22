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
    },
    {
      icon: 'grid_on',
      action: 'openLayoutsDialog',
      label: 'LAYOUTS.PREDEFINED_LAYOUT'
    }]
  },
  {
    icon: '',
    id: 'BASIC_FIELDS',
    label: 'BASIC_FIELDS',
    parent: '',
    elements: [{
      svgIcon: 'odfb:o-text-input-icon',
      'ontimize-component': 'o-text-input',
      label: 'o-text'
    },
    {
      svgIcon: 'odfb:o-integer-input-icon',
      'ontimize-component': 'o-integer-input',
      label: 'o-integer'
    },
    {
      svgIcon: 'odfb:o-real-input-icon',
      'ontimize-component': 'o-real-input',
      label: 'o-real'
    },
    {
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
      svgIcon: 'odfb:o-nif-input-icon',
      'ontimize-component': 'o-nif-input',
      label: 'o-nif'
    },
    {
      svgIcon: 'odfb:o-email-input-icon',
      'ontimize-component': 'o-email-input',
      label: 'o-email'
    },
    {
      svgIcon: 'odfb:o-password-input-icon',
      'ontimize-component': 'o-password-input',
      label: 'o-password'
    },
    {
      svgIcon: 'odfb:o-textarea-input-icon',
      'ontimize-component': 'o-textarea-input',
      label: 'o-textarea'
    },
    {
      icon: 'calendar_today',
      'ontimize-component': 'o-date-input',
      label: 'o-date'
    }, {
      svgIcon: 'odfb:o-checkbox-input-icon',
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
