import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * TODO memoize
 */
function getTeamName(code: string, teams) {
  const team = teams.find(team => team.code === code);
  if (team) {
    return team.city + ' ' + team.name;
  }
  return '';
}

function formatBirthDetails(player) {
  const date = player.born !== '1970-01-01T00:00:00'
    ? moment(player.born).format('MM/DD/YYYY')
    : '';
  const city = player.birthCity;
  const place = player.birthState ? player.birthState : player.birthCountry;
  return `${date} in ${city}, ${place}`;
}

function formatDebut(player) {
  return moment(player.debut).format('MM/DD/YYYY')
}

function formatHandedNess(value) {
  if (!value) {
    return '';
  }

  if (value === 'R') {
    return 'Right';
  }

  if (value === 'L') {
    return 'Left';
  }

  return '';
}

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

  const teamName = getTeamName(props.player.team, props.teams);

  const body = (
    <Fragment>
      <div className="headshot-container">
        <img className="headshot" src={`/headshots/${props.player.name}.jpg`} />
      </div>
      <div className="stats">
        <div className="name">{props.player.name}</div>
        <div className="position-team">{props.player.position} - {teamName}</div>
        <div className="birth">
          <span className="label">Born:</span>
          <span className="value">{formatBirthDetails(props.player)}</span>
        </div>
        <div className="debut">
          <span className="label">Debut:</span>
          <span className="value">{formatDebut(props.player)}</span>
        </div>
        <div className="bats">
          <span className="label">Bats:</span>
          <span className="value">{formatHandedNess(props.player.bats)}</span>
        </div>
        <div className="throws">
          <span className="label">Throws:</span>
          <span className="value">{formatHandedNess(props.player.throws)}</span>
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
        <div className="reveal-answer">(Give Up: Reveal Anwser)</div>
      </div>
      {body}
    </div>
  );
}

AnswerDetails.propTypes = {
  // whether or not the answer is revealed
  revealed: PropTypes.bool,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      city: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  player: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    bats: PropTypes.string,
    throws: PropTypes.string,
    debut: PropTypes.string,
    born: PropTypes.string,
    birthCity: PropTypes.string,
    birthState: PropTypes.string,
    birthCountry: PropTypes.string,
    playerID: PropTypes.string,
  }),
};
