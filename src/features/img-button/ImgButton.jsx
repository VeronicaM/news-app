import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Material UI Components
import ButtonBase from '@material-ui/core/ButtonBase';

// CSS
import './ImgButton.css';

// Utilities
import classNames from 'classnames';

class ImgButton extends PureComponent {

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
              <picture className="image">
                <source media="(min-width: 768px)" srcSet={this.props.image} />
               <source media="(max-width: 767px)" 
                 sizes="1px"
                 srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 1w"
                />
                <img  className="image" alt={this.props.text} src={this.props.image} />
              </picture>
             {!this.props.isActive && <span className="image__backdrop" /> }
              <span className="image__btn">
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className="image__title"
                >
                  {this.props.text}
                 {!this.props.isActive &&  <span className="image__text--marked" /> }
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