import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteURL,
  setVisibilityFilter
} from "../actions/actionCreator";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";

class List extends Component {
  removeRSS(e){
	var curEle = e.target.id;
	this.props.deleteURL(curEle);  
  }
  render() {
    return (
      <div className="list-box">
        {this.props.urls != null ? (
          <div>
		     {this.props.urls.map(url => (
                <div key={url.id}>
					<span className="url-list">{url.text}</span>
					<a href="javascript:void(0)" className="remove-url" id={url.id} onClick={this.removeRSS.bind(this)}>X</a>
				</div>
              ))}
		  </div>
        ) : null}{" "}
      </div>
    );
  }
}

const getVisibleTodos = (urls, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return urls;
    case SHOW_COMPLETED:
      return urls.filter(t => t.completed);
    case SHOW_ACTIVE:
      return urls.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = state => {
  return { urls: getVisibleTodos(state.urls, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteURL,
      setVisibilityFilter
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(List);