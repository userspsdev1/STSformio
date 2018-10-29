import BuilderUtils from '../../../utils/builder';

function getTemplates() {
			var templates=[];
			console.log('##############');
			const Http = new XMLHttpRequest();
			const url='http://172.22.100.207:6060/templates';
			Http.open('GET', url);
			Http.send();
			Http.onreadystatechange=(e)=>{
				e;
				var object;
			if (Http.responseText!=null||Http.responseText!=='') {
				object=JSON.parse(Http.responseText);
			}
			if (object!=null) {
			object.result.forEach(function(element) {
			templates.push(element['fileName']);
	});
	}
	};
	return templates;
}

export default [
  {
    type: 'select',
    key: 'action',
    label: 'Action',
    input: true,
	value:'custom',
    disabled:'true',
	defaultValue: 'custom',
    dataSrc: 'values',
    weight: 110,
    tooltip: 'This is the action to be performed by this button.',
    data: {
      values: [
        { label: 'Custom', value: 'custom' }
      ]
    }
  },
  {
  type: 'select',
  key: 'templateID',
  label: 'Templates',
  input: true,
  tooltip: 'The color theme of this button.',
  dataSrc: 'values',
  weight: 140,
  data: {
    values: getTemplates()
  }
},
{
  type: 'textfield',
  label: 'URL',
  key: 'urlW',
  input: true,
  weight: 120,
  tooltip: 'URL',
  defaultValue:window.location.host,
},
  {
    type: 'checkbox',
    input: true,
    inputType: 'checkbox',
    key: 'showValidations',
    label: 'Show Validations',
    weight: 115,
    tooltip: 'When the button is pressed, show any validation errors on the form.',
    conditional: {
      json: { '!==': [{ var: 'data.action' }, 'submit'] }
    }
  },
  {
    type: 'textfield',
    label: 'Button Event',
    key: 'event',
    input: true,
    weight: 120,
    tooltip: 'The event to fire when the button is clicked.',
    conditional: {
      json: { '===': [{ var: 'data.action' }, 'event'] }
    }
  },
  {
    type: 'textfield',
    inputType: 'url',
    key: 'url',
    input: true,
    weight: 120,
    label: 'Button URL',
    tooltip: 'The URL where the submission will be sent.',
    placeholder: 'https://example.form.io',
    conditional: {
      json: { '===': [{ var: 'data.action' }, 'url'] }
    }
  },
  {
    type: 'datagrid',
    key: 'headers',
    input: true,
    weight: 130,
    label: 'Headers',
    addAnother: 'Add Header',
    tooltip: 'Headers Properties and Values for your request',
    components: [
      {
        key: 'header',
        label: 'Header',
        input: true,
        type: 'textfield'
      },
      {
        key: 'value',
        label: 'Value',
        input: true,
        type: 'textfield'
      }
    ],
    conditional: {
      json: { '===': [{ var: 'data.action' }, 'url'] }
    }
  },
  {
    type: 'textarea',
    key: 'custom',
    label: 'Button Custom Logic',
    tooltip: 'The custom logic to evaluate when the button is clicked.',
    rows: 5,
    editor: 'ace',
    input: true,
    weight: 120,
    placeholder: "data['mykey'] = data['anotherKey'];",
    conditional: {
      json: { '===': [{ var: 'data.action' }, 'custom'] }
    }
  },
  {
    type: 'select',
    key: 'theme',
    label: 'Theme',
    input: true,
    tooltip: 'The color theme of this button.',
    dataSrc: 'values',
    weight: 140,
    data: {
      values: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Danger', value: 'danger' },
        { label: 'Warning', value: 'warning' }
      ]
    }
  },
  {
    type: 'select',
    key: 'size',
    label: 'Size',
    input: true,
    tooltip: 'The size of this button.',
    dataSrc: 'values',
    weight: 150,
    data: {
      values: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ]
    }
  },
  {
    type: 'textfield',
    key: 'leftIcon',
    label: 'Left Icon',
    input: true,
    placeholder: 'Enter icon classes',
    tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
    weight: 160
  },
  {
    type: 'textfield',
    key: 'rightIcon',
    label: 'Right Icon',
    input: true,
    placeholder: 'Enter icon classes',
    tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
    weight: 170
  },
  {
    type: 'select',
    input: true,
    weight: 180,
    label: 'Shortcut',
    key: 'shortcut',
    tooltip: 'Shortcut for this component.',
    dataSrc: 'custom',
    data: {
      custom(values, component, data, row, utils, instance, form) {
        return BuilderUtils.getAvailableShortcuts(form, component);
      }
    }
  },
  {
    type: 'checkbox',
    key: 'block',
    label: 'Block',
    input: true,
    weight: 610,
    tooltip: 'This control should span the full width of the bounding container.'
  },
  {
    type: 'checkbox',
    key: 'disableOnInvalid',
    label: 'Disable on Form Invalid',
    tooltip: 'This will disable this field if the form is invalid.',
    input: true,
    weight: 620
  }
];
