import React, { useState } from "react";
import { saveAs } from "file-saver";
import ff from "./engine/fretfind";
import { PrimaryButton, TextInput } from "./Inputs";
import { ConfigGroup } from "./ConfigGroup";

let isFileSaverSupported = false;
try {
  isFileSaverSupported = !!new Blob();
} catch (e) {}

function downloadDXF(name = "fretboard") {
  let guitar = ff.getGuitar();
  guitar = ff.fretGuitar(guitar);
  let blob = new Blob([ff.getDXF(guitar)], { type: "image/vnd.dxf" });
  saveAs(blob, `${name}.dxf`);
}

function downloadPDFM(name = "fretboard", pagesize = "a4") {
  var guitar = ff.getGuitar();
  guitar = ff.fretGuitar(guitar);
  var blob = new Blob([ff.getPDFMultipage(guitar, pagesize)], {
    type: "application/pdf"
  });
  saveAs(blob, `${name}.pdf`);
}

function downloadPDFS(name = "fretboard") {
  var guitar = ff.getGuitar();
  guitar = ff.fretGuitar(guitar);
  var blob = new Blob([ff.getPDF(guitar)], {
    type: "application/pdf"
  });
  saveAs(blob, `${name}.pdf`);
}

function downloadSVG(name = "fretboard") {
  var guitar = ff.getGuitar();
  guitar = ff.fretGuitar(guitar);
  var blob = new Blob([ff.getSVG(guitar)], { type: "image/svg+xml" });
  saveAs(blob, `${name}.svg`);
}
function downloadCSV(name = "fretboard") {
  var guitar = ff.getGuitar();
  guitar = ff.fretGuitar(guitar);
  var blob = new Blob([ff.getCSV(guitar)], { type: "text/csv" });
  saveAs(blob, `${name}.csv`);
}
function downloadHTML(name = "fretboard") {
  var guitar = ff.getGuitar();
  guitar = ff.fretGuitar(guitar);
  var blob = new Blob([ff.getHTML(guitar)], { type: "text/html" });
  saveAs(blob, `${name}.html`);
}
function downloadTAB(name = "fretboard") {
  var guitar = ff.getGuitar();
  guitar = ff.fretGuitar(guitar);
  var blob = new Blob([ff.getTAB(guitar)], {
    type: "text/tab-separated-values"
  });
  saveAs(blob, `${name}.tsv`);
}

export default function SaveUI(props) {
  const [name, setname] = useState("fretboard");
  const [pdfsize, setpdfsize] = useState("a4");
  if (isFileSaverSupported) {
    return (
      <>
        <ConfigGroup divider={false}>
          <TextInput
            value={name}
            onChange={v => setname(v)}
            label={"File name"}
            margin={false}
          />
        </ConfigGroup>

        <p className="px-4 pb-4">Choose a format below to download.</p>

        <ConfigGroup title={"Template drawing"}>
          <PrimaryButton onClick={e => downloadDXF(name)}>DXF</PrimaryButton>
          <PrimaryButton onClick={e => downloadSVG(name)}>SVG</PrimaryButton>
          <PrimaryButton onClick={e => downloadPDFS(name)}>
            PDF (Single-page)
          </PrimaryButton>
          <PrimaryButton onClick={e => downloadPDFM(name, pdfsize)}>
            PDF (Multi-page)
          </PrimaryButton>
          <div>
            <label>
              <input
                type="radio"
                name="pdfm_pagesize"
                value="a4"
                onChange={e => setpdfsize("a4")}
                checked={pdfsize === "a4"}
              />
              A4
            </label>
            <label>
              <input
                type="radio"
                name="pdfm_pagesize"
                value="letter"
                onChange={e => setpdfsize("letter")}
                checked={pdfsize === "letter"}
              />
              Letter
            </label>
          </div>
        </ConfigGroup>
        <ConfigGroup title={"Data tables"}>
          <PrimaryButton onClick={e => downloadHTML(name)}>HTML</PrimaryButton>
          <PrimaryButton onClick={e => downloadCSV(name)}>CSV</PrimaryButton>
          <PrimaryButton onClick={e => downloadTAB(name)}>TSV</PrimaryButton>
        </ConfigGroup>
      </>
    );
  }
  return (
    <p>
      Downloads require a modern browser that supports{" "}
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob#Browser_compatibility">
        the Blob constructor API
      </a>
      .
    </p>
  );
}
