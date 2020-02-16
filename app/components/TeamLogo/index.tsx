import React from 'react';
import PropTypes from 'prop-types';

import ARI from 'images/logos/ARI.svg'; // Diamondbacks
import ATL from 'images/logos/ATL.svg'; // Braves
import BAL from 'images/logos/BAL.svg'; // Orioles
import BOS from 'images/logos/BOS.svg'; // Red Sox
import CHC from 'images/logos/CHC.svg'; // Cubs
import CIN from 'images/logos/CIN.svg'; // Reds
import CLE from 'images/logos/CLE.svg'; // Indians
import COL from 'images/logos/COL.svg'; // Colorodo
import CWS from 'images/logos/CWS.svg'; // White Sox
import DET from 'images/logos/DET.svg'; // Tigers
import HOU from 'images/logos/HOU.svg'; // Astros
import KC from 'images/logos/KC.svg';   // Royals
import LAA from 'images/logos/LAA.svg'; // Angels
import LAD from 'images/logos/LAD.svg'; // Dodgers
import MIA from 'images/logos/MIA.svg'; // Brewers
import MIL from 'images/logos/MIL.svg'; // Brewers
import MIN from 'images/logos/MIN.svg'; // Twins
import NYM from 'images/logos/NYM.svg'; // Mets
import NYY from 'images/logos/NYY.svg'; // Yankes
import OAK from 'images/logos/OAK.svg'; // Athletics
import PHI from 'images/logos/PHI.svg'; // Phillis
import PIT from 'images/logos/PIT.svg'; // Pirates
import SD from 'images/logos/SD.svg';   // Padres
import SEA from 'images/logos/SEA.svg'; // Mariners
import SF from 'images/logos/SF.svg';   // Giants
import STL from 'images/logos/STL.svg'; // Cardinals
import TB from 'images/logos/TB.svg';   // Rays
import TEX from 'images/logos/TEX.svg'; // Rangers
import TOR from 'images/logos/TOR.svg'; // Blue Jays
import WSH from 'images/logos/WSH.svg'; // Nationals

const TeamLogo = props => {
  const getLogo = () => {
    switch (props.code) {
      case 'ARI': return ARI;
      case 'ATL': return ATL;
      case 'BAL': return BAL;
      case 'BOS': return BOS;
      case 'CHC': return CHC;
      case 'CIN': return CIN;
      case 'CLE': return CLE;
      case 'COL': return COL;
      case 'CWS': return CWS;
      case 'DET': return DET;
      case 'HOU': return HOU;
      case 'KC': return KC;
      case 'LAA': return LAA;
      case 'LAD': return LAD;
      case 'MIA': return MIA;
      case 'MIL': return MIL;
      case 'MIN': return MIN;
      case 'NYM': return NYM;
      case 'NYY': return NYY;
      case 'OAK': return OAK;
      case 'PHI': return PHI;
      case 'PIT': return PIT;
      case 'SD': return SD;
      case 'SEA': return SEA;
      case 'SF': return SF;
      case 'STL': return STL;
      case 'TB': return TB;
      case 'TEX': return TEX;
      case 'TOR': return TOR;
      case 'WSH': return WSH;
      default: return null;
    }
  };

  const logo = getLogo();
  if (null == logo) {
    console.warn('There is no team with code: ' + props.code);
    return <span>???</span>;
  }

  return <img src={logo} />;
};

TeamLogo.propTypes = {
  code: PropTypes.string.isRequired,
};

export default TeamLogo;
