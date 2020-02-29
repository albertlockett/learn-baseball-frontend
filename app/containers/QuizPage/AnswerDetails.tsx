import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';



export default function AnswerDetails(props) {

  const [fullRevealed, setFullRevealed] = useState(false);
  const [fullRevealTimeout, setFullRevealedTimeout] = useState<any>(null);

  // TODO nice comment or something
  if (props.revealed) {
    if (!fullRevealed && fullRevealTimeout === null) {
      const timeout = setTimeout(() => {
        setFullRevealed(true);
        setFullRevealedTimeout(null);
      }, 500);
      setFullRevealedTimeout(timeout);
    }
  } else {
    if (fullRevealed) {
      setFullRevealed(false);
    }
    if (fullRevealTimeout) {
      clearTimeout(fullRevealTimeout);
    }
  }

  const body = (
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

  const answerBlockerClass = fullRevealed
    ? 'no-show'
    : props.revealed ? 'no-block' : 'block';

  return (
    <div className="answer-details">
      <div className={`answer-blocker ${answerBlockerClass}`}>
        <div className="pre-revealed">?</div>
        <div className="reveal-answer">(Reveal Anwser)</div>
      </div>
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
