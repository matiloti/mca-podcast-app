import React from "react";
import './styles.css';
import { Link } from "react-router-dom";

export const PodcastCard = (props) => {
    return (
        <Link to={`/podcast/${props.id}`} className="podcastCard-wrapper">
            <div className="podcastCard">
                <div className="podcastCard__icon-wrapper">
                    <img src={props.icon} alt={`Logo from ${props.title}`} className="podcastCard__icon"/>
                </div>
                <div className="podcastCard__title">{props.title}</div>
                <div className="podcastCard__author">Author: {props.author}</div>
            </div>
        </Link>
    );
}