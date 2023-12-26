import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Report = ({ setGenerateReport }) => {
  const UploadedPropertiesArray = useSelector(
    (state) => state.properties.addedProps
  );

  const userUID = useSelector((state) => state.login.userUID);

  //   console.log(JSON.stringify(UploadedPropertiesArray));

  return (
    <div className="model">
      <div className="centered-box">
        {UploadedPropertiesArray.length !== 0 && userUID &&(
          <>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Location</th>
                  <th>Property Description</th>
                  <th>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {UploadedPropertiesArray &&
                  UploadedPropertiesArray.map((eachProp, index) => {
                    return (
                      <>
                        <td>
                          <p>{index + 1}</p>
                        </td>
                        <td>
                          <p>District : {eachProp.District}</p>
                          <p>Mandal : {eachProp.Mandal}</p>
                          <p>Village : {eachProp.Village}</p>
                        </td>
                        <td>
                          <p>Property Name : {eachProp.propName}</p>
                          <p>Property Area : {eachProp.propArea}</p>
                          <p>
                            Measures Area : {eachProp.measuredArea} sq.yards
                          </p>
                        </td>
                        <td>
                          <p>Property Status : {eachProp.propertyStatus}</p>
                          <p>Currnet Management : {eachProp.curManagement}</p>
                          <p>Comments : {eachProp.comments}</p>
                        </td>
                      </>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="warning"
                onClick={() => setGenerateReport(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={() => window.print()}>
                Print
              </Button>
            </div>
          </>
        )}
        {UploadedPropertiesArray.length === 0 && userUID && (
          <>
            <h3>No Properties Uploaded Today</h3>
            <Button variant="warning" onClick={() => setGenerateReport(false)}>
              Cancel
            </Button>
          </>
        )}
        
        {!userUID && (
          <>
            <h3>Your are not logged In!!</h3>
            <Button variant="warning" onClick={() => setGenerateReport(false)}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
