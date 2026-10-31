import { Create, ReferenceInput, SimpleForm, TextInput,required, BooleanInput } from "react-admin";

export const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="text" 
          validate={[required()]} 
          label="text" 
        />
        <ReferenceInput 
          source="lessonId"
          reference="lessons"
        />
        <BooleanInput
          source="correct"
          label="Correct option"
        />
        <ReferenceInput 
          source="challengeId"
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
  </Create>
  );
}