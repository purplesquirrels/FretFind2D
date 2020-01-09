import React, { useState } from "react";

import logo from "./images/help-24px.svg";
// import "./App.css";
import ff from "./engine/fretfind";
import Fretboard from "./Fretboard";
import Header from "./Header";
import { NumberInput } from "./Inputs";
import { ConfigGroup } from "./ConfigGroup";
import {
  ButtonSelectItem,
  HeaderButtonSelectItem,
  ButtonSelectGroup
} from "./ButtonSelectGroup";
import Popover from "./Popover";

function App() {
  const [config, setConfig] = useState(ff.getConfig());
  const [view, setView] = useState("fretboard");

  function updateConfig(key, value) {
    setConfig(ff.setConfig(key, value));
  }

  return (
    <div className="App text-gray-200" style={{ paddingTop: "64px" }}>
      <Header>
        <ButtonSelectGroup margin={false}>
          <HeaderButtonSelectItem
            label={"Fretboard"}
            name={"view"}
            selected={view === "fretboard"}
            onChange={() => {
              setView("fretboard");
            }}
          />
          <HeaderButtonSelectItem
            label={"Data"}
            name={"view"}
            selected={view === "data"}
            onChange={() => {
              setView("data");
            }}
          />
        </ButtonSelectGroup>
      </Header>
      <main className="flex bg-gray-200">
        <div className="flex-grow flex justify-center p-6">
          {view === "fretboard" && <Fretboard />}
          {view === "data" && (
            <div
              className="text-gray-800"
              dangerouslySetInnerHTML={{
                __html: ff.getTable(ff.fretGuitar(ff.getGuitar()))
              }}
            ></div>
          )}
        </div>
        <div
          className="config p-4"
          style={{ minWidth: "430px", width: "430px" }}
        >
          <form className="bg-gray-800 rounded">
            <p className="text-sm hidden">
              FretFind is a fretboard design tool. This app will model the
              entire fretboard, strings and frets. It can design fretboards for
              instruments with multiple scale lengths and non-parallel frets as
              well as fretboards for instruments that play just or meantone
              scales.
            </p>
            <ConfigGroup divider={false}>
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
            </ConfigGroup>
            <ConfigGroup>
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
            </ConfigGroup>
            <ConfigGroup
              title={
                <>
                  {"Scale length"}
                  <Popover
                    triggerElement={
                      <button>
                        <img src={logo} alt="Help" width={18} height={18} />
                      </button>
                    }
                  >
                    <div>
                      <p>
                        The scale length is the playing/speaking length of the
                        string measured from the nut to the bridge. It is
                        perhaps more properly twice the distance from the nut to
                        the octave fret. The fundamental scale length is the
                        length of a line drawn from the middle of the nut to the
                        middle of the bridge. For single scale length
                        instruments that line is the perpendicular bisector of
                        both the nut and the bridge. I call this length
                        "fundamental" because on a standard instrument with a
                        narrow nut and a wide bridge the outer strings actually
                        have a slightly longer scale length.
                      </p>
                      <p>
                        The perpendicular fret distance is the ratio of
                        distances along the first and last string that fall on a
                        line perpendicular to the midline of the neck. This is
                        used to control the angle of the nut, frets and bridge.
                      </p>
                      <p>
                        Traditionally this property of non-parallel-ly fretted
                        fretboards is measured by assigning a "perpendicular
                        fret". "Perpendicular distance" avoids two problems with
                        the "perpendicular fret" method. First, it is possible
                        that no fret falls into this perpendicular position.
                        With "perpendicular distance" we avoid fractional frets.
                        Second, it is possible and even likely with non-equal
                        temperament fretboards that as a fret crosses the
                        fretboard it will fall at different ratios along the
                        strings. With "perpendicular distance" we avoid complex
                        calculations and have more predictable results.
                      </p>
                      <p>
                        A value of 0 results in a perpendicular nut. A value of
                        1 results in a perpendicular bridge. The default 0.5
                        results in a perpendicular octave fret. To calculate an
                        appropriate value for any fret, simply divide the
                        distance of the fret from the nut by the total length of
                        the string. In twelve tone equal temperament the values
                        look like this:
                      </p>
                    </div>
                  </Popover>
                </>
              }
            >
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
            </ConfigGroup>
            <ConfigGroup
              title={
                <>
                  {"String width"}
                  <Popover
                    triggerElement={
                      <button>
                        <img src={logo} alt="Help" width={18} height={18} />
                      </button>
                    }
                  >
                    <div>
                      <p>
                        The string width at the nut is the distance along the
                        nut from the center of the first string to the center of
                        the last string. I'm using delta x distance (distance
                        measured along a line drawn perpendicular to the neck's
                        midline) because I think that is what you would feel as
                        the width if you were playing an instrument with
                        multiple scale lengths. It also makes the calculation
                        easier. (Please note, FretFind will space the remaining
                        strings equally between these two points.)
                      </p>
                      <p>
                        The string width at the bridge is the distance along the
                        bridge from the center of the first string to the center
                        of the last string. I'm using delta x distance (distance
                        measured along a line drawn perpendicular to the neck's
                        midline) because I think that is what you would feel as
                        the width if you were playing an instrument with
                        multiple scale lengths. It also makes the calculation
                        easier. (Please note, FretFind will space the remaining
                        strings equally between these two points.)
                      </p>
                    </div>
                  </Popover>
                </>
              }
            >
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
            <ConfigGroup
              title={
                <>
                  {"Fretboard overhang"}
                  <Popover
                    triggerElement={
                      <button>
                        <img src={logo} alt="Help" width={18} height={18} />
                      </button>
                    }
                  >
                    <div>
                      <p>
                        The fretboard overhang is the distance from the center
                        of outer strings to edge of nut or bridge. For
                        fretboards with multiple scale lengths this is
                        calculated as delta x distance, distance measured along
                        a line drawn perpendicular to the neck's midline. There
                        are four input modes for overhang.
                      </p>
                      <dl>
                        <dt>Equal:</dt>
                        <dd>
                          you enter a single value and the overhang will be
                          constant.
                        </dd>
                        <dt>Nut &amp; Bridge:</dt>
                        <dd>
                          allows you to specify one overhang at the nut and
                          another overhang at the bridge.
                        </dd>
                        <dt>First &amp; Last:</dt>
                        <dd>
                          allows you to specify one overhang for the first
                          string and another for the last string.
                        </dd>
                        <dt>All:</dt>
                        <dd>
                          you specify an overhang for all four locations
                          separately.
                        </dd>
                      </dl>
                      <p>
                        (Please note, in FretFind the first string is shown on
                        the far right where the high E string would be on a
                        typical right-handed guitar. The last string is on the
                        far left, where the low E would be found.)
                      </p>
                    </div>
                  </Popover>
                </>
              }
            >
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
                  label={"First / Last"}
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
                      label={"First"}
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
                      label={"Last"}
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
                        <td>Last</td>
                        <td>First</td>
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
            <ConfigGroup
              title={
                <>
                  {"Scale Calculation method"}
                  <Popover
                    triggerElement={
                      <button>
                        <img src={logo} alt="Help" width={18} height={18} />
                      </button>
                    }
                  >
                    <div>
                      The calculation method determines how FretFind calculates
                      fret placement. There are two input modes.
                      <dl>
                        <dt>Equal:</dt>
                        <dd>
                          uses the X<sup>th</sup> root of two, a standard method
                          for calculating equal temperaments. You enter the
                          number of tones per octave.
                        </dd>
                        <dt>Scala:</dt>
                        <dd>
                          uses a Scala SCL file which allows you to specify each
                          scale step exactly in either ratios or cents. If you
                          are interested in creating your own scale, please read
                          this description of the
                          <a href="http://www.huygens-fokker.org/scala/scl_format.html">
                            Scala scale file format
                          </a>
                          . Otherwise try a scale from the Scala scale archive,
                          found at the very bottom of the
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
                  </Popover>
                </>
              }
            >
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
            </ConfigGroup>
            {config.scale.type === "scala" && (
              <ConfigGroup
                title={
                  <>
                    {"Tuning"}
                    <Popover
                      triggerElement={
                        <button>
                          <img src={logo} alt="Help" width={18} height={18} />
                        </button>
                      }
                    >
                      <div>
                        <p>
                          Enter the scale step (of the scale defined above) to
                          which each string will be tuned. For example a
                          standard guitar in the key of E would be tuned 0, 7,
                          3, 10, 5, 0. The first string is the string to the far
                          right on the fretboard. This step is not important for
                          the Equal calculation method. Entering a tuning for
                          the Scala calculation method will very likely result
                          in partial frets.
                        </p>
                      </div>
                    </Popover>
                  </>
                }
              >
                <div>
                  {config.tunings
                    .slice(0, Math.min(config.strings, config.tunings.length))
                    .map((tun, index) => {
                      return (
                        <NumberInput
                          key={"tunings-" + index}
                          id={"tunings-" + index}
                          label={
                            "String " +
                            (index + 1) +
                            (index === 0 ? " (Treble)" : "")
                          }
                          value={tun}
                          onChange={value => {
                            let tunings = [...config.tunings];
                            tunings[index] = value;
                            updateConfig("tunings", tunings);
                          }}
                        />
                      );
                    })}
                  {/* <NumberInput
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
                /> */}
                </div>
              </ConfigGroup>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
