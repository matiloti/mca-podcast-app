import React from "react";
import './styles.css';
import { Link } from "react-router-dom";

export const Header = (props) => {

    return (
        <div className="header">
            <h1 className="header__title">
                <Link className="header__title-link" to="/">Podcaster</Link>
            </h1>
            {
                props.loading ? <div className="header__loading"/> : <></>
            }
        </div>
    );
}