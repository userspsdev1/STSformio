import baseEditForm from '../base/Base.form';

import ButtonEditDisplay from './editForm/PrintTemplateButton.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: ButtonEditDisplay
    }
  ], ...extend);
}
