import * as React from 'react';

const labelClass = 'form__label';
const inputClass = 'form__input';

const inputGenerator = (props: InputConfig) => <input className={inputClass} {...props} />;
export const sanitizeId = (str: string) => str.trim().toLowerCase().replace(' ', '_');
export const labelGenerator = (id: string, name: string) => (
  <label className={labelClass} htmlFor={id}>
  {name}
  </label>
);
export const input = (
  name: string,
  config: InputConfig = {
    type: 'text',
    required: true,
  },
  maxLength = 256,
) => {
  const id = sanitizeId(name);
  const props = {
    id,
    name: id,
    maxLength,
    placeholder: name,
    ...config,
  };
  return (
    <div>
      {labelGenerator(id, name)}
  {inputGenerator(props)}
  </div>
);
};
