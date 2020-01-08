import React, { useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import ff from "./engine/fretfind";
import Fretboard from "./Fretboard";
import Header from "./Header";
import { NumberInput } from "./Inputs";
import { ConfigGroup } from "./ConfigGroup";
import { ButtonSelectItem, ButtonSelectGroup } from "./ButtonSelectGroup";

function App() {
  const [config, setConfig] = useState(ff.getConfig());
  const [view, setView] = useState("fretboard");

  function updateConfig(key, value) {
    setConfig(ff.setConfig(key, value));
  }

  return (
    <div className="App">
      <Header>
        <button
          onClick={e => setView("fretboard")}
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Fretboard
        </button>
        <button
          onClick={e => setView("data")}
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Data
        </button>
      </Header>
      <main className="flex">
        <div className="config bg-gray-100 p-2" style={{ maxWidth: "430px" }}>
          <form className="grid-stack">
            <p className="text-sm">
              FretFind is a fretboard design tool. This app will model the
              entire fretboard, strings and frets. It can design fretboards for
              instruments with multiple scale lengths and non-parallel frets as
              well as fretboards for instruments that play just or meantone
              scales.
            </p>
            <div>
              Units
              <br />
              <ButtonSelectGroup>
                <ButtonSelectItem
                  label={"Inches"}
                  name={"units"}
                  selected={config.units === "in"}
                  onChange={e => updateConfig("units", "in")}
                />
                <ButtonSelectItem
                  label={"Millimeters"}
                  name={"units"}
                  selected={config.units === "mm"}
                  onChange={e => updateConfig("units", "mm")}
                />
                {/* <ButtonSelectItem
                  label={"Centimeters"}
                  name={"units"}
                  selected={config.units === "cm"}
                  onChange={e => updateConfig("units", "cm")}
                /> */}
              </ButtonSelectGroup>
            </div>
            <div>
              <NumberInput
                id="numStrings"
                label={"Number of strings"}
                value={config.strings}
                onChange={value => {
                  updateConfig("strings", value);
                }}
              />
              <div className="hidden">
                The number of strings must be an integer. If you change the
                number of strings be sure to update the tuning section below
                (only useful with non-equal temperament scales).
              </div>
            </div>
            <div>
              <NumberInput
                id="numFrets"
                label={"Number of frets"}
                value={config.numFrets}
                onChange={value => {
                  updateConfig("numFrets", value);
                }}
              />
              <div className="hidden">
                This is the number of frets you would like FretFind to
                calculate. The number of frets must be an integer.
              </div>
            </div>
            <ConfigGroup title="Scale length">
              <ButtonSelectGroup>
                <ButtonSelectItem
                  label={"Single"}
                  name={"lengthMode"}
                  selected={config.lengthMode === "single"}
                  onChange={() => {
                    updateConfig("lengthMode", "single");
                  }}
                />
                <ButtonSelectItem
                  label={"Multiple"}
                  name={"lengthMode"}
                  selected={config.lengthMode === "multiple"}
                  onChange={() => {
                    updateConfig("lengthMode", "multiple");
                  }}
                />
                {/* <ButtonSelectItem
                  label={"Individual"}
                  name={"lengthMode"}
                  selected={config.lengthMode === "individual"}
                  onChange={() => {
                    const lens = Array.from({ length: config.strings }).map(
                      (len, i) => len || 25 + i * 0.5
                    );
                    updateConfig("scaleLengths", lens);
                    updateConfig("lengthMode", "individual");
                  }}
                /> */}
              </ButtonSelectGroup>

              <div>
                {config.lengthMode === "single" && (
                  <NumberInput
                    id="scaleLength"
                    label={"Length"}
                    value={config.scaleLength}
                    onChange={value => {
                      updateConfig("scaleLength", value);
                    }}
                  />
                )}
                {config.lengthMode === "multiple" && (
                  <>
                    <NumberInput
                      id="scaleLengthF"
                      label={"Treble length"}
                      value={config.scaleLengthF}
                      onChange={value => {
                        updateConfig("scaleLengthF", value);
                      }}
                    />
                    <NumberInput
                      id="scaleLengthL"
                      label={"Bass length"}
                      value={config.scaleLengthL}
                      onChange={value => {
                        updateConfig("scaleLengthL", value);
                      }}
                    />
                    {config.scale.type === "et" ? (
                      <>
                        <label>
                          Perpendicular fret
                          <select
                            value={config.perp}
                            onChange={e =>
                              updateConfig("perp", e.currentTarget.value)
                            }
                          >
                            <option value={0}>Nut</option>
                            <option value={0.05613}>1</option>
                            <option value={0.1091}>2</option>
                            <option value={0.1591}>3</option>
                            <option value={0.2063}>4</option>
                            <option value={0.25085}>5</option>
                            <option value={0.29289}>6</option>
                            <option value={0.33258}>7</option>
                            <option value={0.37004}>8</option>
                            <option value={0.4054}>9</option>
                            <option value={0.43877}>10</option>
                            <option value={0.47027}>11</option>
                            <option value={0.5}>12</option>
                            <option value={0.52806}>13</option>
                            <option value={0.57955}>15</option>
                            <option value={0.55455}>14</option>
                            <option value={0.60315}>16</option>
                            <option value={0.62542}>17</option>
                            <option value={0.64645}>18</option>
                            <option value={0.66629}>19</option>
                            <option value={0.68502}>20</option>
                            <option value={0.7027}>21</option>
                            <option value={0.71938}>22</option>
                            <option value={0.73513}>23</option>
                            <option value={0.75}>24</option>
                          </select>
                        </label>
                      </>
                    ) : (
                      <>
                        <NumberInput
                          id="pdist"
                          label={"Perpendicular fret"}
                          value={config.perp}
                          onChange={value => {
                            updateConfig("perp", value);
                          }}
                        />
                      </>
                    )}
                  </>
                )}
                {config.lengthMode === "individual" && (
                  <>
                    {config.scaleLengths
                      .slice(
                        0,
                        Math.min(config.strings, config.scaleLengths.length)
                      )
                      .map((len, index) => {
                        return (
                          <NumberInput
                            key={len + "-" + index}
                            id={"len-" + index}
                            label={
                              "String " +
                              (index + 1) +
                              (index === 0 ? " (Treble)" : "")
                            }
                            value={len}
                            onChange={value => {
                              let lens = [...config.scaleLengths];
                              lens[index] = value;
                              updateConfig("scaleLengths", lens);
                            }}
                          />
                        );
                      })}
                    <NumberInput
                      id="pdist"
                      label={"Perpendicular fret"}
                      value={config.perp}
                      onChange={value => {
                        updateConfig("perp", value);
                      }}
                    />
                  </>
                )}
              </div>
              <div className="hidden">
                The calculation method determines how FretFind calculates fret
                placement. There are two input modes.
                <dl>
                  <dt>Equal:</dt>
                  <dd>
                    uses the X<sup>th</sup> root of two, a standard method for
                    calculating equal temperaments. You enter the number of
                    tones per octave.
                  </dd>
                  <dt>Scala:</dt>
                  <dd>
                    uses a Scala SCL file which allows you to specify each scale
                    step exactly in either ratios or cents. If you are
                    interested in creating your own scale, please read this
                    description of the
                    <a href="http://www.huygens-fokker.org/scala/scl_format.html">
                      Scala scale file format
                    </a>
                    . Otherwise try a scale from the Scala scale archive, found
                    at the very bottom of the
                    <a href="http://www.huygens-fokker.org/scala/downloads.html">
                      Scala download page
                    </a>
                    . You can learn more about Scala at the
                    <a href="http://www.huygens-fokker.org/scala/">
                      Scala home page
                    </a>
                    .
                  </dd>
                </dl>
              </div>
            </ConfigGroup>
            <ConfigGroup title="String width">
              <div>
                <NumberInput
                  id="nutWidth"
                  label={"Width at nut"}
                  step={0.001}
                  value={config.nutWidth}
                  onChange={value => {
                    updateConfig("nutWidth", value);
                  }}
                />
                <NumberInput
                  id="bridgeWidth"
                  label={"Width at bridge"}
                  step={0.001}
                  value={config.bridgeWidth}
                  onChange={value => {
                    updateConfig("bridgeWidth", value);
                  }}
                />
              </div>
            </ConfigGroup>
            <ConfigGroup title="Fretboard overhang">
              <ButtonSelectGroup>
                <ButtonSelectItem
                  label={"Equal"}
                  name={"overhang"}
                  selected={config.overhang.type === "equal"}
                  onChange={e =>
                    updateConfig("overhang", {
                      ...config.overhang,
                      type: "equal"
                    })
                  }
                />
                <ButtonSelectItem
                  label={"Nut / bridge"}
                  name={"overhang"}
                  selected={config.overhang.type === "nutbridge"}
                  onChange={e =>
                    updateConfig("overhang", {
                      ...config.overhang,
                      type: "nutbridge"
                    })
                  }
                />
                <ButtonSelectItem
                  label={"Treble / Bass"}
                  name={"overhang"}
                  selected={config.overhang.type === "firstlast"}
                  onChange={e =>
                    updateConfig("overhang", {
                      ...config.overhang,
                      type: "firstlast"
                    })
                  }
                />
                <ButtonSelectItem
                  label={"Individual"}
                  name={"overhang"}
                  selected={config.overhang.type === "all"}
                  onChange={e =>
                    updateConfig("overhang", {
                      ...config.overhang,
                      type: "all"
                    })
                  }
                />
              </ButtonSelectGroup>

              <div>
                {config.overhang.type === "equal" && (
                  <>
                    <NumberInput
                      id="oE"
                      label={"Value"}
                      step={0.00001}
                      value={config.overhang.oE}
                      onChange={value => {
                        updateConfig("overhang", {
                          ...config.overhang,
                          oE: value
                        });
                      }}
                    />
                  </>
                )}
                {config.overhang.type === "nutbridge" && (
                  <>
                    <NumberInput
                      id="oN"
                      label={"Nut"}
                      step={0.00001}
                      value={config.overhang.oN}
                      onChange={value => {
                        updateConfig("overhang", {
                          ...config.overhang,
                          oN: value
                        });
                      }}
                    />
                    <NumberInput
                      id="oB"
                      label={"Bridge"}
                      step={0.00001}
                      value={config.overhang.oB}
                      onChange={value => {
                        updateConfig("overhang", {
                          ...config.overhang,
                          oB: value
                        });
                      }}
                    />
                  </>
                )}
                {config.overhang.type === "firstlast" && (
                  <>
                    <NumberInput
                      id="oF"
                      label={"Treble"}
                      step={0.00001}
                      value={config.overhang.oF}
                      onChange={value => {
                        updateConfig("overhang", {
                          ...config.overhang,
                          oF: value
                        });
                      }}
                    />
                    <NumberInput
                      id="oL"
                      label={"Bass"}
                      step={0.00001}
                      value={config.overhang.oL}
                      onChange={value => {
                        updateConfig("overhang", {
                          ...config.overhang,
                          oL: value
                        });
                      }}
                    />
                  </>
                )}
                {config.overhang.type === "all" && (
                  <table>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>Bass</td>
                        <td>Treble</td>
                      </tr>
                      <tr>
                        <td>Nut</td>
                        <td>
                          <NumberInput
                            id="oNL"
                            label={""}
                            step={0.00001}
                            value={config.overhang.oNL}
                            onChange={value => {
                              updateConfig("overhang", {
                                ...config.overhang,
                                oNL: value
                              });
                            }}
                          />
                        </td>
                        <td>
                          <NumberInput
                            id="oNF"
                            label={""}
                            step={0.00001}
                            value={config.overhang.oNF}
                            onChange={value => {
                              updateConfig("overhang", {
                                ...config.overhang,
                                oNF: value
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Bridge</td>
                        <td>
                          <NumberInput
                            id="oBL"
                            label={""}
                            step={0.00001}
                            value={config.overhang.oBL}
                            onChange={value => {
                              updateConfig("overhang", {
                                ...config.overhang,
                                oBL: value
                              });
                            }}
                          />
                        </td>
                        <td>
                          <NumberInput
                            id="oBF"
                            label={""}
                            step={0.00001}
                            value={config.overhang.oBF}
                            onChange={value => {
                              updateConfig("overhang", {
                                ...config.overhang,
                                oBF: value
                              });
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </ConfigGroup>
            <ConfigGroup title="Scale Calculation method">
              <ButtonSelectGroup>
                <ButtonSelectItem
                  label={"Standard"}
                  name={"scaletype"}
                  selected={config.scale.type === "et"}
                  onChange={e =>
                    updateConfig("scale", {
                      ...config.scale,
                      type: "et"
                    })
                  }
                />
                <ButtonSelectItem
                  label={"Scala"}
                  name={"scaletype"}
                  selected={config.scale.type === "scala"}
                  onChange={e =>
                    updateConfig("scale", {
                      ...config.scale,
                      type: "scala"
                    })
                  }
                />
              </ButtonSelectGroup>

              <div>
                {config.scale.type === "et" && (
                  <NumberInput
                    id="root"
                    label={"Root"}
                    value={config.scale.root}
                    onChange={value => {
                      updateConfig("scale", {
                        ...config.scale,
                        root: value
                      });
                    }}
                  />
                )}
                {config.scale.type === "scala" && (
                  <textarea
                    rows="17"
                    id="scl"
                    onChange={e => {
                      updateConfig("scale", {
                        ...config.scale,
                        scl: e.currentTarget.value
                      });
                    }}
                    value={config.scale.scl || ""}
                  ></textarea>
                )}
              </div>
              <div className="hidden">
                The calculation method determines how FretFind calculates fret
                placement. There are two input modes.
                <dl>
                  <dt>Equal:</dt>
                  <dd>
                    uses the X<sup>th</sup> root of two, a standard method for
                    calculating equal temperaments. You enter the number of
                    tones per octave.
                  </dd>
                  <dt>Scala:</dt>
                  <dd>
                    uses a Scala SCL file which allows you to specify each scale
                    step exactly in either ratios or cents. If you are
                    interested in creating your own scale, please read this
                    description of the
                    <a href="http://www.huygens-fokker.org/scala/scl_format.html">
                      Scala scale file format
                    </a>
                    . Otherwise try a scale from the Scala scale archive, found
                    at the very bottom of the
                    <a href="http://www.huygens-fokker.org/scala/downloads.html">
                      Scala download page
                    </a>
                    . You can learn more about Scala at the
                    <a href="http://www.huygens-fokker.org/scala/">
                      Scala home page
                    </a>
                    .
                  </dd>
                </dl>
              </div>
            </ConfigGroup>
          </form>
        </div>
        <div className="flex-grow flex justify-center p-6">
          {view === "fretboard" && <Fretboard />}
          {view === "data" && (
            <div
              dangerouslySetInnerHTML={{
                __html: ff.getTable(ff.fretGuitar(ff.getGuitar()))
              }}
            ></div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
