import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Material UI Components
import ButtonBase from '@material-ui/core/ButtonBase';

// CSS
import './ImgButton.css';

class ImgButton extends Component {

    handleOnClick = (event) => {
    	// prevent click on currently selected image button
    	if(this.props.isActive) return false;

        return this.props.onClickAction(this.props.id);
    };

    render() {
    	 return <ButtonBase
              focusRipple
              className="image__wrapper"
              onClick={this.handleOnClick}
            >
              <img
                className="image"
                src={this.props.image}
                alt={this.props.text}
              />
              <span className="image__backdrop" />
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