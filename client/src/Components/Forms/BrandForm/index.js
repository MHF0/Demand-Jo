import React from "react";

const BrandForm = ({ name, setName, imageUpload, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {imageUpload()}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );
};

export default BrandForm;
