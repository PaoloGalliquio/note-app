import React, { useContext, useState } from 'react'
import { ModalForm } from '../../components/modalComponents/ModalForm'
import { usePropsSelect } from '../../hooks/useProps/usePropsSelect';
import InputTextArea from "../../components/Inputs/InputTextArea";
import InputSelect from '../../components/Inputs/InputSelect';
import { usePropsInputs } from '../../hooks/useProps/usePropsInput';
import { useManagePostRequest } from '../../hooks/useManagePostRequest/useManagePostRequest';
import { createNoteAPI } from '../../consumers/backendApisUrls';
import { AuthContext } from '../../hooks/context/authContext';

export const Create = ({ categories, toggleModal, refreshPage }) => {
  const { state } = useContext(AuthContext);
  const [isSending, setIsSending] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [commomProps] = usePropsInputs(formValues, setFormValues);
  const [commonPropsSelect] = usePropsSelect(categories, formValues, setFormValues);
  const [executePost] = useManagePostRequest();

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...formValues, userId: state.user.id };
    const response = await executePost(createNoteAPI(), payload, refreshPage, true);
    if (response.status === 200) {
      await refreshPage();
      toggleModal();
    }
  }

  return (
    <ModalForm onSubmit={handleSubmit} showModal={toggleModal} title="New note" saveButtonDisabled={isSending}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <InputSelect label="Category" name={"Category"} options={categories} {...commonPropsSelect("categoryId")} />
          </div>
          <div className="col-md-12 mt-3">
            <InputTextArea label="Note" {...commomProps("name")} />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};
