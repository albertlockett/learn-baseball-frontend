import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import styled from 'styles/styled-components';

const Container = styled.div`
  text-align: left;
  position: relative;
  padding: 8px 0px;
  width: 100%;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default function ExpandableSection(props) {
  const [expanded, setExpanded] = useState(false);
  const handleClickExpand = () => setExpanded(!expanded);
  return (
    <Container>
      <div>
        <Typography
            component="h1"
            variant="h6"
            align="center"
            style={{
              display: 'inline-block',
              textAlign: 'left',
              minWidth: '0',
            }}
          >
            {props.title}
          </Typography>
          <IconContainer onClick={handleClickExpand}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconContainer>
          {expanded && <Fragment>{props.children}</Fragment>}
      </div>
    </Container>
  );
}

ExpandableSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};
