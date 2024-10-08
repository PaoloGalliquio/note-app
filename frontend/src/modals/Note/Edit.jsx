import React, { useContext, useState } from "react";
import { ModalForm } from "../../components/modalComponents/ModalForm";
import { usePropsSelect } from "../../hooks/useProps/usePropsSelect";
import InputTextArea from "../../components/Inputs/InputTextArea";
import InputSelect from "../../components/Inputs/InputSelect";
import { usePropsInputs } from "../../hooks/useProps/usePropsInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteNoteAPI, updateNoteAPI } from "../../consumers/backendApisUrls";
import { AuthContext } from "../../hooks/context/authContext";
import { useManagePutRequest } from "../../hooks/useManagePutRequest/useManagePutRequest";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useManageDeleteRequest } from "../../hooks/useManageDeleteRequest/useManageDeleteRequest";

export const Edit = ({ note, categories, toggleModal, onChangeNote, refreshPage }) => {
  const { state } = useContext(AuthContext);
  const [isSending, setIsSending] = useState(false);
  const [formValues, setFormValues] = useState(note);
  const [commomProps] = usePropsInputs(formValues, setFormValues);
  const [commonPropsSelect] = usePropsSelect(categories, formValues, setFormValues);
  const [executePut] = useManagePutRequest();
  const [executeDelete] = useManageDeleteRequest();

  function handleEdit(e) {
    e.preventDefault();
    onChangeNote(formValues);
  }

  async function handleEdit(e) {
    setIsSending(true);
    e.preventDefault();
    const payload = { ...formValues, userId: state.user.id };
    const response = await executePut(updateNoteAPI(formValues.id), payload, refreshPage, true);
    if (response.status === 200) {
      await refreshPage();
      toggleModal();
    }
    setIsSending(false);
  }

  async function handleDelete(e) {
    setIsSending(true);
    e.preventDefault();
    const response = await executeDelete(deleteNoteAPI(formValues.id), refreshPage, true);
    if (response.status === 200) {
      await refreshPage();
      toggleModal();
    }
    setIsSending(false);
  }

  const deleteButton = (
    <button className={`btnCustom btnPrimaryOutlinedCustom me-3`} disabled={isSending} onClick={handleDelete}>
      Delete
      {isSending && <FontAwesomeIcon icon={faCircleNotch} transform="left-9" className="hand-pointer spinner ml-3" />}
    </button>
  );

  return (
    <ModalForm
      onSubmit={handleEdit}
      showModal={toggleModal}
      title="Edit note"
      saveButtonDisabled={isSending}
      aditionalFooterButtons={deleteButton}>
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
