import React, { useEffect, useRef } from "react";
import ResetPopup from "./ResetPopup/ResetPhase";
import SetPopup from "./SetPopup/SetPopup";
import { useSelector } from "react-redux";

function Popup() {
  /*
   This component default returns null but if the redux has popupData 
   this component will return either <SetPopup/> or <ResetPopup/>
  */
  useEffect(() => {
    console.log("Popup rendered, wether set or reset");
  });

  const redux_hasPopupData = useSelector((state) => state.appManager.popupInfo);
  const redux_allTasks = useSelector((state) => state.appManager.tasks);
  if (redux_hasPopupData) {
    const redux_hasProgressTask = redux_allTasks.find((task) => task.progress);
    return (
      <div className="window-background">
        {redux_hasProgressTask ? (
          <ResetPopup redux_hasProgressTask={redux_hasProgressTask} />
        ) : (
          <SetPopup redux_hasPopupData={redux_hasPopupData} />
        )}
      </div>
    );
  }
}

export default Popup;
