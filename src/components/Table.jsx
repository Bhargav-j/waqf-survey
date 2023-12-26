import React from "react";
import { propertyTypes } from "./contents/data";
import { Table } from "react-bootstrap";

const TableComponent = ({
  propertiesArray,
  villagesObject,
  onProptiesClick,
}) => {
  return (
    <div>
      <Table striped bordered hover variant="success">
        <thead>
          <tr>
            <th>#</th>
            <th>Property Type</th>
            <th>No. of Properties</th>
          </tr>
        </thead>
        <tbody>
          {propertiesArray &&
            propertiesArray.map((eachprop, index) => {
              let count;
              count = villagesObject[eachprop].length;
              return (
                <tr key={eachprop}>
                  <td>{index + 1}</td>
                  <td>{eachprop}</td>
                  <td>
                    <span
                      className="link-danger"
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        onProptiesClick(eachprop)}}
                    >
                      <u>{count}</u>
                    </span>
                  </td>
                </tr>
              );
            })}
          {propertyTypes &&
            propertyTypes.map((eachprop, index) => {
              let count = propertiesArray.length;
              if (!propertiesArray.includes(eachprop)) {
                return (
                  <tr key={eachprop}>
                    <td>{index + count}</td>
                    <td>{eachprop}</td>
                    <td>
                      <span>NIL</span>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
