```jsx
const { Input, Select, Submit, FormLabel, Radio, TextCheckbox, SearchInput } = require('./index');
const { BasicSection } = require('../../layout/Containers/index');
const { SubTitle } = require('../../data-display/Typography/index');

const FormExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <BasicSection>
        <SubTitle $offsetBottom>Radio Button</SubTitle>
        <FormLabel htmlFor='radio1'>Option 1</FormLabel>
        <Radio id='radio1' name='radio' value='1' />
        <FormLabel htmlFor='radio2'>Option 2</FormLabel>
        <Radio id='radio2' name='radio' value='2' />
      </BasicSection>

      <BasicSection>
        <SubTitle $offsetBottom>Text Checkbox</SubTitle>
        <TextCheckbox id='tc1' name='tc1' $offsetRight />
        <TextCheckbox id='tc2' name='tc2' />
      </BasicSection>

      <BasicSection>
        <SubTitle $offsetBottom>Inputs</SubTitle>
        <FormLabel htmlFor='inp1'>Standard Input</FormLabel>
        <Input id='inp1' name='inp1' placeholder="Type here..." $offsetBottom />
        
        <FormLabel htmlFor='txt1'>Textarea</FormLabel>
        <Input as="textarea" id='txt1' name='txt1' rows={3} placeholder="Engraved stone..." />
      </BasicSection>

      <BasicSection>
        <SubTitle $offsetBottom>Select</SubTitle>
        <Select
          id='sel1'
          name='sel1'
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ]}
          onChange={() => {}}
        />
      </BasicSection>

      <Submit value='Cast Rune (Submit)' />

      <BasicSection>
        <SubTitle $offsetBottom>Search</SubTitle>
        <SearchInput value={value} onChangeValue={setValue} $fullWidth />
      </BasicSection>
    </Form>
  );
};

<FormExample />
```
