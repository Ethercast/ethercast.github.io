import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import AddIcon from 'grommet/components/icons/base/Add';
import CloseIcon from 'grommet/components/icons/base/Close';
import Toast from 'grommet/components/Toast';
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

let NewSubscription = props => {
  const { handleSubmit, style, submitSucceeded } = props;

  const makeRenderConditionFields = (parentIndex) => {
    const renderConditionFields = ({ fields, meta: { error, submitFailed } }) => {
      if (fields.length === 0) {
        fields.push({});
      }
      return (
        <div>
          <Box colorIndex="light-2">
          {fields.map((condition, index) => {
            const inputStyle = {
              marginBottom: '0px',
            };
            return (<div key={index}>
                {index > 0 ? <h4>OR</h4> : null}
                <FormFields>
                  <Box direction="row">
                    <FormField
                      label="Type"
                      style={inputStyle}
                    >
                      <Field
                        name={`${condition}.type`}
                        type="text"
                        component="input"
                      />
                    </FormField>
                    <FormField
                      label="Value"
                      style={inputStyle}
                    >
                      <Field
                        name={`${condition}.value`}
                        type="text"
                        component="input"
                      />
                    </FormField>
                  </Box>
                </FormFields>
              {index === fields.length - 1 ? <Button
                icon={<AddIcon/>}
                onClick={() => fields.push({})}
                primary={false}
              /> : null}
              { fields.length > 0 ? <Button
                icon={<CloseIcon/>}
                onClick={() => fields.remove(index)}
                primary={false}
              /> : null } 
            </div>);
          })}
          </Box>
        </div>);
    };
    return renderConditionFields;
  };

  const renderLogicFields = ({ fields, meta: { error, submitFailed } }) => (
    <div>
      <Heading tag="h3">
        {fields.length > 0 ? 'Filters' : null}
      </Heading>
      {fields.map((logic, index) => {
        return (
          <div>
            <Heading tag="h3">
              {index > 0 ? 'AND' : null}
            </Heading>
            <Box style={{
              border: '1px solid rgba(0,0,0,.15)',
              borderRadius: '2px',
              position: 'relative'
            }} key={index}>
              <FieldArray name={`${logic}.conditions`}
                          component={makeRenderConditionFields(index)}/>
            </Box>
          </div>);
      })}
      <Button
        onClick={() => fields.push({})}
        primary={false}
        label='Add Filter'
      />
    </div>
  );

  return (
    <Box flex={true} align='center' direction='column' responsive={true} pad='small'>
    <Form style={style} onSubmit={handleSubmit}>
      <div>
        {submitSucceeded ? <Toast status='ok'>Subscription successfully created.</Toast> : null}
        <Heading tag="h2">
          Create Subscription
        </Heading>
        <FormField label="Name">
          <Field name="name" component="input" type="text"/>
        </FormField>
        <FormField label="Webhook URL">
          <Field name="webhookUrl" component="input" type="text"/>
        </FormField>
        <FieldArray name="logic" component={renderLogicFields}/>
      </div>
      <Footer pad={{ 'vertical': 'medium' }}>
        <Button label='Submit'
                type='submit'
                primary={true}
                onClick={handleSubmit}/>
      </Footer>
    </Form>
    </Box>
  );
};

NewSubscription = reduxForm({
  form: 'newSubscription'
})(NewSubscription);

export default NewSubscription;
