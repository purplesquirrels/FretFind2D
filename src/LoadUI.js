import React, { useState } from "react";
import ff from "./engine/fretfind";
import { PrimaryButton, TextInput } from "./Inputs";
import { ConfigGroup } from "./ConfigGroup";

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    if (keys[i].startsWith("ffsave::")) {
      values.push([keys[i], localStorage.getItem(keys[i])]);
    }
  }

  return values;
}

export default function SaveUI(props) {
  //   const [legacyurl, setlegacyurl] = useState("");
  //   const [pdfsize, setpdfsize] = useState("a4");

  const saves = allStorage();

  //   for (var i = 0; i < localStorage.length; i++) {
  //     let entry = localStorage[i];
  //     if (entry.startsWith("ffsave::")) {
  //       let data = localStorage.getItem(entry);
  //       saves.push({ name: entry, data });
  //     }
  //   }

  var updateFormFromHash = function(legacyurl) {
    try {
      var url = new URL(legacyurl);
    } catch (e) {
      return;
    }
    var items = unescape(url.hash)
      .substring(1)
      .split("&")
      .map(val => {
        return val.split("=");
      });
    var oldconfig = {};
    var newConfig = {};

    for (let pair of items) {
      oldconfig[pair[0]] = pair[1];
    }

    // console.log(oldconfig);

    if (oldconfig.u) newConfig.units = oldconfig.u;
    if (oldconfig.numFrets) newConfig.numFrets = parseFloat(oldconfig.numFrets);
    if (oldconfig.numStrings)
      newConfig.strings = parseFloat(oldconfig.numStrings);
    if (oldconfig.sl) newConfig.lengthMode = oldconfig.sl;
    if (oldconfig.len) newConfig.scaleLength = parseFloat(oldconfig.len);
    if (oldconfig.lenF) newConfig.scaleLengthF = parseFloat(oldconfig.lenF);
    if (oldconfig.lenL) newConfig.scaleLengthL = parseFloat(oldconfig.lenL);
    if (oldconfig.pDist) newConfig.perp = parseFloat(oldconfig.pDist);
    if (oldconfig.ipDist) newConfig.iperp = parseFloat(oldconfig.ipDist);
    if (oldconfig.nutWidth) newConfig.nutWidth = parseFloat(oldconfig.nutWidth);
    if (oldconfig.bridgeWidth)
      newConfig.bridgeWidth = parseFloat(oldconfig.bridgeWidth);

    if (oldconfig.o) {
      newConfig.overhang = {
        type: oldconfig.o,
        oE: parseFloat(oldconfig.oE) || 0.09375,
        oN: parseFloat(oldconfig.oN) || 0.09375,
        oB: parseFloat(oldconfig.oB) || 0.09375,
        oL: parseFloat(oldconfig.oL) || 0.09375,
        oF: parseFloat(oldconfig.oF) || 0.09375,
        oNL: parseFloat(oldconfig.oNL) || 0.09375,
        oNF: parseFloat(oldconfig.oNF) || 0.09375,
        oBL: parseFloat(oldconfig.oBL) || 0.09375,
        oBF: parseFloat(oldconfig.oBF) || 0.09375
      };
    }

    if (oldconfig.scale) {
      newConfig.scale = {
        type: oldconfig.scale,
        root: parseFloat(oldconfig.root),
        scl: oldconfig.scl
      };
    }

    if (oldconfig["il[]"]) newConfig.scaleLengths = [];
    if (oldconfig["t[]"]) newConfig.tunings = [];

    // console.log(newConfig);

    ff.setConfig(newConfig);

    // props.onClose();
  };

  return (
    <>
      <ConfigGroup divider={false} title="My saves">
        {saves.map(s => {
          return (
            <PrimaryButton
              key={s[0]}
              onClick={e => {
                ff.setConfig(JSON.parse(s[1]));
              }}
            >
              {s[0]}
            </PrimaryButton>
          );
        })}
        {/* <PrimaryButton
          onClick={e => {
            updateFormFromHash();
          }}
        >
          Load
        </PrimaryButton> */}
      </ConfigGroup>
      {
        <ConfigGroup title={"Load from FretFind2D"}>
          <TextInput
            value={""}
            onChange={v => {
              // setlegacyurl(v);
              updateFormFromHash(v);
            }}
            //   onPaste={}
            label={"Paste URL"}
            margin={false}
          />
        </ConfigGroup>
      }
    </>
  );
}
