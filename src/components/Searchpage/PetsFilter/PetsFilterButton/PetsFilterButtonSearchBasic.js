import React from 'react'

import './PetsFilterButtonSearchBasic.css';
import Button from 'react-bootstrap/Button';

export default function PetsFilterButtonSearchBasic(props) {
    return (
        <div>
            <Button
                className="pets_filter_button_search_basic"
                type="onClick"
                onClick={props.onClick}>
                SEARCH BASIC
            </Button>
        </div>
    )
}
