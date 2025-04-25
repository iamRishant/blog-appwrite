import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import config from '../config/config';

// here the main thing is control which ever parent element call this component will have all its control of state
export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
      {label && <label className='inline-block mb-1 pl-1 text-sm sm:text-base'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
          <Editor
            initialValue={defaultValue}
            apiKey={config.editorApi}
            init={{
              initialValue: defaultValue,
              height: 300,
              min_height: 200,
              max_height: 600,
              responsive: true,
              resize: true,
              menubar: window.innerWidth > 768,
              toolbar_mode: window.innerWidth < 768 ? 'sliding' : 'wrap',
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                window.innerWidth < 640 ? 
                "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image" :
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              mobile: {
                toolbar_mode: 'sliding',
                height: '300px',
                plugins: [
                  'image', 
                  'lists', 
                  'link', 
                  'autolink', 
                  'autosave'
                ],
                toolbar: 'undo redo | bold italic | link | image | bullist numlist'
              },
              setup: (editor) => {
                editor.on('ResizeWindow', (e) => {
                  const width = window.innerWidth;
                  if (width < 768) {
                    editor.settings.menubar = false;
                    editor.settings.toolbar_mode = 'sliding';
                  } else {
                    editor.settings.menubar = true;
                    editor.settings.toolbar_mode = 'wrap';
                  }
                });
              }
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}