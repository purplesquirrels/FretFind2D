import React, { useState } from "react";
// import { saveAs } from "file-saver";
import ff from "./engine/fretfind";
import { PrimaryButton, TextInput } from "./Inputs";
import { ConfigGroup } from "./ConfigGroup";

function save(name) {
  const data = JSON.stringify(ff.getConfig());
  localStorage.setItem("ffsave::" + name, data);
}

export default function SaveUI(props) {
  const [name, setname] = useState("fretboard");
  //   const [pdfsize, setpdfsize] = useState("a4");
  //   if (isFileSaverSupported) {
  return (
    <>
      <ConfigGroup divider={false}>
        <TextInput
          value={name}
          onChange={v => setname(v)}
          label={"Save name"}
          margin={false}
        />
      </ConfigGroup>

      {/* <p className="px-4 pb-4">Choose a format below to download.</p> */}
      <ConfigGroup title={""}>
        <PrimaryButton onClick={e => save(name)}>Save</PrimaryButton>
      </ConfigGroup>
    </>
  );
  //   }
}
