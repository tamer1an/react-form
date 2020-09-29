import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { input, sanitizeId, labelGenerator } from '../createElement';
import { Form } from '../Form';

configure({ adapter: new Adapter() });
const name = 'Any Name';

describe('Elements', () => {
  it('renders input', () => {
    const wrapper = shallow(input(name));
    const label = labelGenerator(sanitizeId(name), name);
    expect(wrapper.contains(label)).toEqual(true);
  });
  it('renders sanitizeId', () => {
    expect(sanitizeId(name)).toEqual('any_name');
    expect(sanitizeId(`  ${name}  `)).toEqual('any_name');
  });
});

describe('Form', () => {
  it('renders', async () => {
    const props = {};
    shallow(<Form {...props} />);
  });
});
