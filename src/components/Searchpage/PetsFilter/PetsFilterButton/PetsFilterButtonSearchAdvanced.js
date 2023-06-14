import React from 'react'

import './PetsFilterButtonSearchAdvanced.css';
import Button from 'react-bootstrap/Button';

export default function PetsFilterButtonSearchAdvanced(props) {
    return (
        <div>
            <Button
                className="pets_filter_button_search_advanced"
                variant="primary"
                type="onClick"
                onClick={props.onClick}>
                SEARCH ADVANCED
            </Button>
        </div>
    )
}

