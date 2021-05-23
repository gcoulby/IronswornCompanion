import React from "react";

import "./KoFi.css";

export default function KoFi(props) {
  const { color, id, label } = props;
  return (
    <React.Fragment>
      <div class="btn-container">
        <a
          title={label}
          class={`kofi-button btn btn-${props.buttonColor ? props.buttonColor : "outline-light"}`}
          // style={{ backgroundColor: color }}
          href={"https://ko-fi.com/" + id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="kofitext">
            <img src="https://ko-fi.com/img/cup-border.png" class="kofiimg" alt="Ko-Fi button" />
            {label}
          </span>
        </a>
      </div>
      <p className="mt-4" style={{ fontSize: "8pt" }}>
        <i>
          * This is a non-commercial application. This app is hosted for free and has no running costs. Donations are
          not required to keep this application running, and provide NO additional benefits to the donator. This app is
          a personal project and will be developed with or without donations. Consequently, donations should not be
          considered payment for services and are not, and will not be, used to support the development of this
          application nor to remunerate Graham for any previous work.
        </i>
      </p>
    </React.Fragment>
  );
}
