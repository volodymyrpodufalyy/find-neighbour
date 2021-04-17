import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';


const Time = ({date}) => 
    <Fragment>{formatDistanceToNow(new Date(date), { addSuffix: true })}</Fragment>


Time.propTypes = {
    date: PropTypes.string
};

export default Time;