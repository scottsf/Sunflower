import React from "react";
import { Mutation } from "react-apollo";
import { UPLOAD_FILE } from "../../mutation/index";

const UploadOneFile = () => (
  <Mutation mutation={UPLOAD_FILE}>
    {uploadFile => (
      <input
        type="file"
        required
        placeholder="image"
        accept="image/png, image/jpeg"
        style={{ height: "200px" }}
        onChange={({
          target: {
            validity,
            files: [file]
          }
        }) => validity.valid && uploadFile({ variables: { file } })}
      />
    )}
  </Mutation>
);

export default UploadOneFile;
