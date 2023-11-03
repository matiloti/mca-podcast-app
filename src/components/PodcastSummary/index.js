import React from "react";
import './styles.css';
import { Link } from "react-router-dom";

export const PodcastSummary = (props) => {
    return (
        <div className="podcast__summary">
            <div className="podcast__image-wrapper">
                <Link to={`/podcast/${props.podcast.id}`} className="podcast__image-link">
                    <img src={props.podcast.image} alt={`Logo from ${props.podcast.author}`} className="podcast__image"/>
                </Link>
            </div>
            <div className="podcast__title">
                <Link to={`/podcast/${props.podcast.id}`} className="podcast__title-title">{props.podcast.title}</Link>
                <Link to={`/podcast/${props.podcast.id}`} className="podcast__title-author">by {props.podcast.author}</Link>
            </div>
            <div className="podcast__description">
                <span className="podcast__description-label">Description:</span>
                <span className="podcast__description-content">{props.podcast.description}</span>
            </div>
        </div>
    );
}