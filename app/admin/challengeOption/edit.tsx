import { Edit, ReferenceInput, SimpleForm, TextInput,required, BooleanInput } from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="text" 
          validate={[required()]} 
          label="text" 
        />
        <BooleanInput
          source="correct"
          label="Correct option"
        />
        <ReferenceInput 
          source="challengesId"
          reference="challenges"
        />
        <TextInput
          source="imgSrc" 
          label="Image URL" 
        />
        <TextInput
          source="audioSrc" 
          label="Audio URL" 
        />
      </SimpleForm>
  </Edit>
  );
}