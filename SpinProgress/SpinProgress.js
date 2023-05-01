/* 
 This Code is published under the terms and conditions of the CC-BY-NC-ND-4.0
 (https://creativecommons.org/licenses/by-nc-sa/4.0)
 
 Please contribute to the current project.
 
 SPDX-License-Identifier: CC-BY-NC-SA-4.0
 @author: pdulvp@laposte.net
 */
class SpinProgress extends HTMLElement {
  
  connectedCallback() {
    let svg = this.shadowRoot.querySelectorAll("svg")[0];
    let back = this.shadowRoot.querySelectorAll(".back")[0];
    let bar = this.shadowRoot.querySelectorAll(".bar")[0];
    let text = this.shadowRoot.querySelectorAll(".text")[0];
    let r = parseInt(this.getAttribute("stroke"));
    let width = parseInt(this.getAttribute("width"));
    let color = this.getAttribute("color");

    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${width}`);
    svg.setAttribute("viewport", `0 0 ${width/2} ${width/2}`);
    
    back.setAttribute("stroke", "#EEEEEE");
    back.setAttribute("stroke-width", `${r}px`);
    back.setAttribute("stroke-dasharray", `${width*2.82}`);
    back.setAttribute("r", `${(width-r)/2}`);
    back.setAttribute("cx", `${width/2}`);
    back.setAttribute("cy", `${width/2}`);

    bar.setAttribute("transform", `rotate(270 ${width/2} ${width/2})`);
    bar.setAttribute("stroke", color);
    bar.setAttribute("stroke-width", `${r}px`);
    bar.setAttribute("stroke-dasharray", `${width*2.82}`);
    bar.setAttribute("r", `${(width-r)/2}`);
    bar.setAttribute("cx", `${width/2}`);
    bar.setAttribute("cy", `${width/2}`);

    let percent = parseInt(this.getAttribute("percent"));
    text.textContent = percent;
    if (isNaN(percent)) {
      percent = 100; 
    }
    
    var c = Math.PI*(width-r);
    if (percent < 0) { percent = 0;}
    if (percent > 100) { percent = 100;}
    var pct = ((100-percent)/100)*c;
    bar.setAttribute("stroke-dashoffset", pct);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.connectedCallback();
  }

  static get observedAttributes() { return ['percent', 'stroke', 'width', 'color']; }

  constructor(){
    super();
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = `
      <svg class="svg" version="1.1" width="30" height="30" viewport="0 0 15 15">
        <circle class="back" fill="transparent" stroke-dashoffset="0"></circle>
        <circle class="bar" fill="transparent" stroke-dashoffset="0" ></circle>
        <text class="text" x="50%" y="55%" dominant-baseline="middle" style="user-select: none; font-family: Courier; font-size: 12px; font-weight: bold" text-anchor="middle"></text>
      </svg>`
    }
  }
  
  customElements.define('spin-progress', SpinProgress);