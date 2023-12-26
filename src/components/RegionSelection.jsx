import React, { useState } from "react";

import { districts, Hyderabad } from "./contents/data";
import TableComponent from "./Table";
import UpdateProperties from "./UpdateProperties";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const RegionSelection = () => {
  const [district, setDistrict] = useState(null);
  const [mandal, setMandal] = useState(null);
  const [mandalsArray, setMandalsArray] = useState([]);
  const [village, setVillage] = useState(null);
  const [villagesArray, setVillagesArray] = useState([]);
  const [villagesObject, setVillagesObject] = useState({});
  const [propertiesArray, setpropertiesArray] = useState([]);

  const [updateProps, setUpdateProps] = useState("");
  const [showPropertiesArray, setShowPropertiesArray] = useState([]);

  const userUID = useSelector(state => state.login.userUID);
  const dispatch = useDispatch();

  const importedDistricts = {
    Hyderabad,
  };

  const handleDistrictChange = (e) => {
    //reseting the remaining mandal and village if already assigned
    setDistrict(null);
    setMandal(null);
    setVillage(null);
    setUpdateProps("");

    if (e.target.value) {
      setDistrict(e.target.value);

      // console.log(e.target.value)

      const mandalObject = importedDistricts[e.target.value]; //gives each district
      const mandals = Object.keys(mandalObject);
      setMandalsArray(mandals);
    }
  };

  const handleMandalChange = (e) => {
    setMandal(null);
    setVillage(null);
    setUpdateProps("");

    if (e.target.value) {
      setMandal(e.target.value);

      const villageObject = importedDistricts[district][e.target.value]; //gives each mandal
      const villages = Object.keys(villageObject);
      setVillagesArray(villages);
    }
  };

  const handleVillageChange = (e) => {
    setVillage(null);
    setUpdateProps("");

    if (e.target.value) {
      setVillage(e.target.value);

      const propertiesObject =
        importedDistricts[district][mandal][e.target.value]; //gives each village props
      setVillagesObject(propertiesObject);
      setpropertiesArray(Object.keys(propertiesObject)); //only properties present in that villageq
    }
  };

  // Rendering all the props of particular property based on user click on table
  const onProptiesClick = (propName) => {
    if (userUID) {
      setUpdateProps(propName);
      if (propName) {
        setShowPropertiesArray(villagesObject[propName]);
      }
    }else{
      dispatch({ type: "UserLoginPage" });
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column mx-5"
    >
      {/* className="d-flex flex-md-row flex-column align-items-center mb-5 mt-3 ms-md-5" */}
      <div className="mt-5">
        <div className="d-flex my-3 flex-md-row flex-column justify-content-center align-items-center">
          <label htmlFor="District" className="m-3 p-2 border rounded bg-info bg-gradient">
            <span className="h5">
              Select the <b>District</b>
            </span>
          </label>
          <select
            className="form-select p-2 border border-2 rounded border-success"
            aria-label="Default select example"
            id="District"
            value={district}
            onChange={(e) => {
              handleDistrictChange(e);
            }}
          >
            <option value="">Select Option</option>
            {districts.map((dist) => {
              if (dist === "Hyderabad") {
                return (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                );
              } else {
                return (
                  <option key={dist} value={dist} disabled>
                    {dist}
                  </option>
                );
              }
            })}
          </select>
        </div>

        {district && (
          <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-center">
            <label htmlFor="Mandal" className="m-3 p-2 border rounded bg-info bg-gradient">
              <span className="h5">
                Select the <b>Mandal</b>
              </span>
            </label>
            <select
              className="form-select p-2 border border-2 rounded border-success"
              aria-label="Default select example"
              id="Mandal"
              value={mandal}
              onChange={(e) => handleMandalChange(e)}
            >
              <option value="">Select Option</option>
              {mandalsArray.map((mand) => {
                if (mand === "Amberpet") {
                  return (
                    <option key={mand} value={mand}>
                      {mand}
                    </option>
                  );
                } else {
                  return (
                    <option key={mand} value={mand} disabled>
                      {mand}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        )}

        {district && mandal && (
          <div className="d-flex my-3 flex-md-row flex-column justify-content-center  align-items-center">
            <label htmlFor="Village" className="m-3 p-2 border rounded bg-info bg-gradient">
              <span className="h5">
                Select the <b>Village</b>
              </span>
            </label>
            <select
              className="form-select p-2 border border-2 rounded border-success"
              aria-label="Default select example"
              id="District"
              value={village}
              onChange={(event) => handleVillageChange(event)}
            >
              <option value="">Select Option</option>
              {villagesArray.map((vill) => {
                if (vill === "Allapur" || vill === "Auranganagar") {
                  return (
                    <option key={vill} value={vill}>
                      {vill}
                    </option>
                  );
                } else {
                  return (
                    <option key={vill} value={vill} disabled>
                      {vill}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        )}
      </div>

      {/* Display the table */}
      {district && mandal && village && !updateProps && (
        <TableComponent
          propertiesArray={propertiesArray}
          villagesObject={villagesObject}
          onProptiesClick={onProptiesClick}
        />
      )}

      {/* Display Update properties component */}
      {updateProps && (
        <>
          <Button
            variant="danger"
            className="mt-3 mb-4"
            size="lg"
            style={{ margin: "auto" }}
            onClick={() => setUpdateProps("")}
          >
            Back
          </Button>
          <UpdateProperties
            district = {district}
            mandal = {mandal}
            village = {village}
            updateProps={updateProps}
            showPropertiesArray={showPropertiesArray}
          />
        </>
      )}
    </div>
  );
};

export default RegionSelection;
