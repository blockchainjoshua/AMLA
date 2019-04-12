import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node
};

const styles = {
  link: {
    color: "orange"
  }
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href="https://amlc.gov.ph" style={styles.link}>
            AMLAC
          </a>{" "}
          &copy; 2019
        </span>
        <span className="ml-auto">
          Powered by{" "}
          <a href="https://unionbankph.com" style={styles.link}>
            Unionbank Blockchain Institute
          </a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
