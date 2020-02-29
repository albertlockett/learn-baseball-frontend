import React, { Fragment } from 'react';
import PropTypes from 'prop-types';



export default function AnswerDetails(props) {

  let body;
  if (props.revealed) {
    body = (
      <Fragment>
        <div className="headshot-container">
          <img className="headshot" src={`/headshots/${props.player.name}.jpg`} />
        </div>
        <div className="stats">
          <div className="name">David Aardsma</div>
          <div className="position-team">P - Atlanta Braves</div>
          <div className="birth">
            <span className="label">Born:</span>
            <span className="value">12/17/1985 in Denver, CO</span>
          </div>
          <div className="debut">
            <span className="label">Debut:</span>
            <span className="value">12/17/1985</span>
          </div>
          <div className="bats">
            <span className="label">Bats:</span>
            <span className="value">Right</span>
          </div>
          <div className="throws">
            <span className="label">Throws:</span>
            <span className="value">Right</span>
          </div>
        </div>
      </Fragment>
    );
  } else {
    body = (
      <Fragment>
        <div className="pre-revealed">?</div>
        <div className="reveal-answer">(Reveal Anwser)</div>
      </Fragment>
    );
  }

  return (
    <div className="answer-details">
      {body}
    </div>
  );
}

AnswerDetails.propTypes = {
  // whether or not the answer is revealed
  revealed: PropTypes.bool,
  player: PropTypes.shape({
    name: PropTypes.string,
  }),
};
