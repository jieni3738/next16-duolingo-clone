import { Create, ReferenceInput, SimpleForm, TextInput, NumberInput,required, SelectInput } from "react-admin";

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="question" 
          validate={[required()]} 
          label="Question" 
        />
        <ReferenceInput 
          source="lessonId"
          reference="lessons"
        />
        <NumberInput 
          source="order"
          validate={[required()]}
          label="Order"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
        />
      </SimpleForm>
  </Create>
  );
}