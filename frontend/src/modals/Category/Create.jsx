import React, { useContext, useState } from "react";
import { ModalForm } from "../../components/modalComponents/ModalForm";
import { usePropsInputs } from "../../hooks/useProps/usePropsInput";
import { useManagePostRequest } from "../../hooks/useManagePostRequest/useManagePostRequest";
import { createCategoryAPI } from "../../consumers/backendApisUrls";
import { AuthContext } from "../../hooks/context/authContext";
import InputText from "../../components/Inputs/InputText";

export const Create = ({ toggleModal, refreshPage }) => {
  const { state } = useContext(AuthContext);
  const [isSending, setIsSending] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [commomProps] = usePropsInputs(formValues, setFormValues);
  const [executePost] = useManagePostRequest();

  async function handleSubmit(e) {
    e.preventDefault();    
    const payload = { ...formValues, userId: state.user.id };
    const response = await executePost(createCategoryAPI(), payload, refreshPage, true);
    if (response.status === 200) {
      await refreshPage();
      toggleModal();
    }
  }

  return (
    <ModalForm onSubmit={handleSubmit} showModal={toggleModal} title="New category" saveButtonDisabled={isSending}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <InputText label="Category" {...commomProps("name")} />
          </div>
          <div className="col-md-12 mt-3">
            <InputText label="Icon" {...commomProps("icon")} />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};
