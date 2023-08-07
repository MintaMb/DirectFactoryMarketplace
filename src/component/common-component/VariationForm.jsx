import React, { useState } from "react";
import { render } from "react-dom";

export default function VariationForm() {
  const [rows, setRows] = useState([{}]);

  const handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[idx] = {
      ...updatedRows[idx],
      [name]: value,
    };
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newItem = {
      name: "",
      mobile: "",
    };
    setRows([...rows, newItem]);
  };

  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };

  const handleRemoveSpecificRow = (idx) => () => {
    const updatedRows = [...rows];
    updatedRows.splice(idx, 1);
    setRows(updatedRows);
  };

  return (
    <div>
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column">
            <table className="table table-bordered table-hover" id="tab_logic">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Mobile</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((item, idx) => (
                  <tr id="addr0" key={idx}>
                    <td>{idx}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange(idx)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="mobile"
                        value={item.mobile}
                        onChange={handleChange(idx)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={handleRemoveSpecificRow(idx)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAddRow}
              type="button"
              className="btn btn-primary"
            >
              Add Row
            </button>
            <button
              onClick={handleRemoveRow}
              type="button"
              className="btn btn-danger float-right"
            >
              Delete Last Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
