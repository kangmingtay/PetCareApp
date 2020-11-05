import React from 'react'
import { TextField } from '@material-ui/core';

const ProfileTextField = (props) => {
    return (
        <TextField
            fullWidth
            label={props.name[0].toUpperCase() + props.name.slice(1)}
            name={props.name}
            onChange={props.handleChange}
            required
            value={props.value}
            variant="outlined"
        />
    )
}

export default ProfileTextField;