import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { currentStatus, managementType } from "./contents/data";
import { Button } from "react-bootstrap";
import { useAddNewProp, useUpdateProp } from "./firebase/CRUDoperations";
import { useSelector } from "react-redux";

const UpdateProperties = ({ district, mandal, village, updateProps, showPropertiesArray }) => {
  const [propertyStatus, SetPropertyStatus] = useState("");
  const [measuredArea, setMeasuredArea] = useState("");
  const [curManagement, setCurManagement] = useState("");
  const [comments, setComments] = useState("");
  const [filteredPropArray, setFilteredPropArray] = useState([]);

  const [submitError, setSubmitError] = useState("");

  const [modifyData, setModifyData] = useState(null);

  const manageAddNewProp = useAddNewProp();
  const manageUpdateProp = useUpdateProp()

  const UploadedProperties = useSelector(
    (state) => state.properties.addedProps
  );

  // console.log(UploadedProperties);

  useEffect(() => {
    const filteredPropArray = [...showPropertiesArray];

    UploadedProperties.forEach((eachArray) => {
      if (eachArray["propType"] === updateProps) {
        filteredPropArray.forEach((displayArray) => {
          if (
            displayArray[0] === eachArray["propName"] &&
            displayArray[2] === eachArray["propArea"]
          ) {
            displayArray[3] = true; // completed
            displayArray[4] = eachArray["measuredArea"];
            displayArray[5] = eachArray["propertyStatus"];
            displayArray[6] = eachArray["curManagement"];
            displayArray[7] = eachArray["comments"];
            displayArray[8] = eachArray["id"];
          } else {
            displayArray[3] = false; // Incomplete
          }
        });
      }
    });

    setFilteredPropArray(filteredPropArray);
  }, [UploadedProperties, showPropertiesArray, updateProps]);

  // console.log(filteredPropArray);

  const modifyTheData = (index) => {
    // console.log(index)
    setModifyData(index);
  };

  const uploadTheData = async (number) => {
    // console.log(propertyStatus)
    // console.log(measuredArea)
    // console.log(curManagement)
    // console.log(comments)

    if (propertyStatus && measuredArea && curManagement && number !== modifyData) {
      const propObj = {
        District : district,
        Mandal : mandal,
        Village : village,
        propType: updateProps,
        propName: filteredPropArray[number][0],
        propArea: filteredPropArray[number][2],
        measuredArea: `${measuredArea} sq.yards`,
        propertyStatus: propertyStatus,
        curManagement: curManagement,
        comments: comments ? comments : "No Comments",
      };


      // console.log(JSON.stringify(propObj))
      await manageAddNewProp(propObj);

      setMeasuredArea("");
      SetPropertyStatus("");
      setCurManagement("");
      setComments("");
      setModifyData("");
    } else if (
      propertyStatus &&
      measuredArea &&
      curManagement &&
      number === modifyData
    ) {
      const propObj = {
        District : district,
        Mandal : mandal,
        Village : village,
        propType: updateProps,
        propName: filteredPropArray[number][0],
        propArea: filteredPropArray[number][2],
        measuredArea: `${measuredArea} sq.yards`,
        propertyStatus: propertyStatus,
        curManagement: curManagement,
        comments: comments ? comments : "No Comments",
      };

      // console.log(JSON.stringify(propObj))

      const updatePropObjID = filteredPropArray[number][8]
      await manageUpdateProp(propObj, updatePropObjID);

      setMeasuredArea("");
      SetPropertyStatus("");
      setCurManagement("");
      setComments("");
      setModifyData("");
    } else {
      setSubmitError("Enter Details properly");
    }
  };

  return (
    <div>
      <h1 className="mb-4 p-2 border border-2 rounded bg-dark text-white m-md-custom-margin">
        Number of Properties for Type: {updateProps} - {showPropertiesArray.length}
      </h1>
      <div className="p-2 border border-2 m-md-custom-margin bg-dark rounded-4">
      <Accordion
        defaultActiveKey="0"
        // style={{marginInline:"8rem"}}
        // className="m-md-custom-margin"
      >
        {filteredPropArray.map((eachPropArray, index) => {
          return (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header style={{ Color: "green" }}>
                <div>
                  <div className="d-flex justify-content-between align-items-baseline ">
                    <h2>{eachPropArray[0]}</h2>
                    <h5>&nbsp;&nbsp;&nbsp;({eachPropArray[2]})</h5>
                    {eachPropArray[3] && (
                      <h5 className="text-success">
                        &nbsp;&nbsp;&nbsp;Completed
                      </h5>
                    )}
                  </div>
                  <p>{eachPropArray[1]}</p>
                </div>
              </Accordion.Header>
              {eachPropArray[3] && index !== modifyData ? (
                <Accordion.Body>
                  <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-md-baseline">
                    <label htmlFor="area" className="m-3">
                      <span className="h5">Calculated Area</span>
                    </label>
                    <div className="d-flex justify-content-center mb-0 pb-0">
                      <InputGroup className="mb-3" id="area">
                        <Form.Control
                          placeholder="Measured Area"
                          aria-label="Measured Area"
                          aria-describedby="basic-addon2"
                          value={eachPropArray[4]} //{measuredArea}
                          // onChange={(e) => setMeasuredArea(e.target.value)}
                        />
                        <InputGroup.Text id="basic-addon2">
                          Sq. Yards
                        </InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-center">
                    <label htmlFor="currrentstatus" className="m-3">
                      <span className="h5">Current Status</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="currrentstatus"
                      // value={eachPropArray[5]} //{propertyStatus}
                      // onChange={(e) => SetPropertyStatus(e.target.value)}
                    >
                      <option value={eachPropArray[5]}>
                        {eachPropArray[5]}
                      </option>
                      {/* {currentStatus.map((eachstat) => {
                      return (
                        <option key={eachstat} value={eachstat}>
                          {eachstat}
                        </option>
                      );
                    })} */}
                    </select>
                  </div>
                  <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-center">
                    <label htmlFor="management" className="m-3">
                      <span className="h5">Current Management</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="management"
                      // value={eachPropArray[6]} //{curManagement}
                      // onChange={(e) => setCurManagement(e.target.value)}
                    >
                      <option value={eachPropArray[6]}>
                        {eachPropArray[6]}
                      </option>
                      {/* {managementType.map((eachstat) => {
                      return (
                        <option key={eachstat} value={eachstat}>
                          {eachstat}
                        </option>
                      );
                    })} */}
                    </select>
                  </div>
                  <div className="d-flex my-3 flex-column flex-column justify-content-center  align-items-center">
                    <label htmlFor="comments" className="m-3">
                      <span className="h5">Comments</span>
                    </label>
                    <Form.Control
                      as="textarea"
                      id="comments"
                      aria-label="With textarea"
                      style={{ maxWidth: "550px" }}
                      value={eachPropArray[7]} //{comments}
                      // onChange={(e) => setComments(e.target.value)}
                      readOnly
                    />
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => modifyTheData(index)}
                  >
                    Update
                  </Button>
                </Accordion.Body>
              ) : (
                //  else condition (Disabled)
                <Accordion.Body>
                  <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-md-baseline">
                    <label htmlFor="area" className="m-3">
                      <span className="h5">Calculated Area</span>
                    </label>
                    <div className="d-flex justify-content-center mb-0 pb-0">
                      <InputGroup className="mb-3" id="area">
                        <Form.Control
                          placeholder="Measured Area"
                          aria-label="Measured Area"
                          aria-describedby="basic-addon2"
                          value={measuredArea}
                          onChange={(e) => setMeasuredArea(e.target.value)}
                        />
                        <InputGroup.Text id="basic-addon2">
                          Sq. Yards
                        </InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-center">
                    <label htmlFor="currrentstatus" className="m-3">
                      <span className="h5">Current Status</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="currrentstatus"
                      value={propertyStatus}
                      onChange={(e) => SetPropertyStatus(e.target.value)}
                    >
                      <option value="">Select Option</option>
                      {currentStatus.map((eachstat) => {
                        return (
                          <option key={eachstat} value={eachstat}>
                            {eachstat}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-center">
                    <label htmlFor="management" className="m-3">
                      <span className="h5">Current Management</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="management"
                      value={curManagement}
                      onChange={(e) => setCurManagement(e.target.value)}
                    >
                      <option value="">Select Option</option>
                      {managementType.map((eachstat) => {
                        return (
                          <option key={eachstat} value={eachstat}>
                            {eachstat}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="d-flex my-3 flex-column flex-column justify-content-center  align-items-center">
                    <label htmlFor="comments" className="m-3">
                      <span className="h5">Comments</span>
                    </label>
                    <Form.Control
                      as="textarea"
                      id="comments"
                      aria-label="With textarea"
                      style={{ maxWidth: "550px" }}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-center gap-4">
                    {index === modifyData && (
                      <Button
                        variant="warning"
                        onClick={() => setModifyData(null)}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      variant="success"
                      onClick={() => uploadTheData(index)}
                    >
                      Submit
                    </Button>
                  </div>
                  <div className="text-danger">{submitError}</div>
                </Accordion.Body>
              )}
            </Accordion.Item>
          );
        })}
      </Accordion>
      </div>
      

      {/* <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
    </div>
  );
};

export default UpdateProperties;
