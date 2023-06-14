import React from 'react'

import './PetsFilterButtonSearch.css';
import Button from 'react-bootstrap/Button';

export default function PetsFilterButtonSearch(props) {
    return (
        <div>
            <Button
                className="pets_filter_button_search"
                variant="primary"
                type="submit"
                onSubmit={props.onSubmit}>
                SEARCH
            </Button>
        </div>
    )
}
