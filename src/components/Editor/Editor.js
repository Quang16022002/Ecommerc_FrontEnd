import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './Editor.scss'
const Editors = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={Editor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (onChange) {
          onChange(data);
        }
      }}
    />
  );
};

export default Editors;
