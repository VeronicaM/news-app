import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Material UI Components
import ButtonBase from '@material-ui/core/ButtonBase';

// CSS
import './ImgButton.css';

// Utilities
import classNames from 'classnames';

class ImgButton extends Component {

    handleOnClick = (event) => {
        return this.props.onClickAction(this.props.id);
    };

    render() {
        const wrapperClassName = classNames('image__wrapper', {
            'image--active': this.props.isActive
        });

        return <ButtonBase
              focusRipple
              className={wrapperClassName}
              disabled={this.props.isActive}
              onClick={this.handleOnClick}
            >
              <img
                className="image"
                src={this.props.image}
                alt={this.props.text}
              />
             {!this.props.isActive && <span className="image__backdrop" /> }
              <span className="image__btn">
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className="image__title"
                >
                  {this.props.text}
                  <span className="image__text--marked" />
                </Typography>
              </span>
           </ButtonBase>;
    }
}

ImgButton.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClickAction: PropTypes.func.isRequired,
    isActive: PropTypes.bool
};

ImgButton.defaultProps = {
    isActive: false
}

export default ImgButton;