import React from "react";
import Raphael from "raphael";
import ff from "./engine/fretfind";

export default class Fretboard extends React.Component {
  paperRef = React.createRef();

  paper = null;

  componentDidMount() {
    const id = this.paperRef.current.getAttribute("id");
    this.paper = Raphael(id, 200, 800);

    ff.subscribe(() => {
      this.update();
    });

    this.update();

    window.updatefb = this.update;
  }

  update = () => {
    var guitar = ff.getGuitar();
    guitar = ff.fretGuitar(guitar);
    ff.drawGuitar(this.paper, guitar);
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="paper" ref={this.paperRef}></div>;
  }
}
