import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextField, Typography } from '@material-ui/core';

const InputContainer = styled.div`
  margin-top: 12px;
`;


export default function FantasyRankControls(props) {
  const [localInputValue, setLocalInputValue] = useState(props.maxFantasyRank);

  const throttledChangeValue = _.throttle(props.setMaxFantasyRank, 200, { leading: false, trailing: true });

  const handleInputChange = event => {
    const value = Number(event.target.value);
    if (!_.isNaN(value)) {
      setLocalInputValue(value);
      throttledChangeValue(value);
    }
  };

  return (
    <div>
      <Typography component="span">
        Choose top players based on fantasy ranking.
      </Typography>
      <InputContainer>
        <TextField
          id="outlined-basic"
          label="Top:"
          variant="outlined"
          onFocus={() => setLocalInputValue(props.maxFantasyRank)}
          onBlur={() => props.setMaxFantasyRank(localInputValue)}
          value={localInputValue}
          onChange={handleInputChange}
        />
      </InputContainer>
    </div>
  );
}

FantasyRankControls.propTypes = {
  maxFantasyRank: PropTypes.number.isRequired,
  setMaxFantasyRank: PropTypes.func.isRequired,
};

