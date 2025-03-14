```jsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { BasicSection } from '../Containers';
import { Form, Submit, FormLabel, Radio, TextCheckbox, Select, Input, SearchInput } from '.';
import { SubTitle } from '../Typography';
import { dark } from '@md/styles';

const [value, setValue] = useState();
const handleSubmit = (e) => {
  e.preventDefault();
  data;
  cons;
  const formData = new FormData(e.target);
  const formValues = {
    radio: formData.get('radio'),
    TextCheckbox1: formData.get('TextCheckbox1'),
    TextCheckbox2: formData.get('TextCheckbox2'),
    TextCheckbox3: formData.get('TextCheckbox3'),
    TextCheckbox4: formData.get('TextCheckbox4'),
    select: formData.get('select'),
  };
  console.log(formValues);
};
<Form onSubmit={handleSubmit}>
  {/* Name */}
  <BasicSection>
    <SubTitle $offsetBottom>Radio Button</SubTitle>
    <FormLabel htmlFor='first'>Radio Label 1</FormLabel>
    <Radio id='first' name='radio' value='1' />
    <FormLabel htmlFor='second'>Radio Label 2</FormLabel>
    <Radio id='second' name='radio' value='2' />
  </BasicSection>

  <BasicSection>
    <SubTitle $offsetBottom>Text Checkbox Section</SubTitle>
    <TextCheckbox id='textCheckbox1' name='TextCheckbox1' $offsetRight />
    <TextCheckbox id='textCheckbox2' name='TextCheckbox2' $offsetRight />
    <TextCheckbox id='textCheckbox3' name='TextCheckbox3' $offsetRight />
    <TextCheckbox id='textCheckbox4' name='TextCheckbox4' />
  </BasicSection>

  <BasicSection>
    <SubTitle $offsetBottom>Input Section</SubTitle>
    <FormLabel htmlFor='Input1'>Input1</FormLabel>
    <Input id='Input1' name='Input1' $offsetBottom />

    <FormLabel htmlFor='Checkbox1'>Checkbox</FormLabel>

    <FormLabel htmlFor='Input2'>Input2</FormLabel>
    <Input id='Input2' name='Input2' $offsetBottom />
  </BasicSection>

  <BasicSection>
    <SubTitle $offsetBottom>Select Section</SubTitle>
    <Select
      id='select'
      name='select'
      options={[
        { value: '1', text: 'text 1' },
        { value: '2', text: 'text 2' },
      ]}
    />
  </BasicSection>
  <Submit value='Next Step' />

  <BasicSection>
    <SearchInput value={value} onChangeValue={setValue} />
  </BasicSection>
</Form>;
```
