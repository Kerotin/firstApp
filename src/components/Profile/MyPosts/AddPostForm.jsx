import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const AddNewPostForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          placeholder="New Post Text"
          name="newPostText"
          component={Textarea}
          validate={[required, maxLengthCreator(100)]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};
export const AddPostForm = reduxForm({
  form: "ProfileAddNewPostForm",
})(AddNewPostForm);
