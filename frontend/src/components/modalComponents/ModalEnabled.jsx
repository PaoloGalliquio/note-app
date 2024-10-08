import React from 'react'
import "./modalComponent.css";

export const ModalEnabled = ({ modalEnabled = { isEnable: false }, setModalEnabled, refreshPage }) => {
  return (
    <div className={`modalWrapper ${modalEnabled.isEnable ? "modalWrapperVisible" : "modalWrapperHidden"}`}>
      <div className={`modalContainer ${modalEnabled.isEnable ? "modalContainerVisible" : "modalContainerHidden"}`}>
        {modalEnabled.component && typeof modalEnabled.component !== "symbol" ? (
          <modalEnabled.component
            toggleModal={() => setModalEnabled({ isEnable: false })}
            refreshPage={refreshPage}
            {...modalEnabled.data}
          />
        ) : (
          <React.Fragment />
        )}
      </div>
    </div>
  );
};