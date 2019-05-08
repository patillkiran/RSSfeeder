import React from 'react';
import List from './List.jsx';
import { connect } from 'react-redux'
import { addURL } from '../actions/actionCreator'
import {bindActionCreators} from 'redux'


class Landing extends React.Component {
   constructor(props) {
	  super(props);
	  this.state = {
	  	data : [],
		url : '',
		isLoading : false
	  }
	  this.loadRSSFeeds = this.loadRSSFeeds.bind(this);
	  this.clearBorder = this.clearBorder.bind(this);
	  this.getRSSfeeds = this.getRSSfeeds.bind(this);
   }  
   loadRSSFeeds(){
   	var url = document.querySelector('#rssInput');
	if(url.value != ""){
		this.getRSSfeeds(url.value);
		this.props.addURL(url.value)
	} else {
		url.classList.add('red-border');
	}
   }
   clearBorder(e){
   	e.target.classList.remove('red-border');
   }
   getRSSfeeds(url){
   		this.setState({isLoading:true});	
		  fetch(url)
			  .then(res => res.json())
				.then(
				  (result) => {
					  this.setState({isLoading:false});
					  this.setState({data:result.items});
					  this.setState({url:url});
				  },
				  (error) => {
					  console.log(error)
					  this.setState({isLoading:false});
				  }
				)	
   }
   render() {
      return (
      	<div className="">
      		<div className="left-pane">
				<div className="input-box">
					<input type="text" id="rssInput" />
					<a href="javascript:void(0)" className="rss-search" onClick={this.loadRSSFeeds}></a>
				</div>
				<List />
			</div>
			<div className="right-pane">
				<h2 className="centerAlign">{this.state.url}</h2>
				{this.state.data.map((item, i) => {
					return <div className="feed-container" key={i}>
						<Feed item={item} />
					</div>
					})
				}
			</div>
			{this.state.isLoading ? <Loader /> : null}
		</div>
      );
   }
}
class Feed extends React.Component {
   constructor(props) {
	  super(props);
	  this.state = {
	  }
   }  
   render() {
   	  var pd = new Date(this.props.item.pubDate);
	  var year = pd.getFullYear();
	  var months = pd.getMonth();
	  var date = pd.getDate();
      return (
      	<div className="">
			<div><span className="bold" dangerouslySetInnerHTML={{__html: this.props.item.title}}></span> - {date + '/' + months + '/' + year}</div>
			<div style={{marginTop:"15px"}} dangerouslySetInnerHTML={{__html: this.props.item.content}}></div>
		</div>
      );
   }
}
class Loader extends React.Component {
	render() {
      return (
         <div>
			<div className="ajax-loader-ab"></div>	
			<div className="loader-ab"></div>	 
		 </div>
	 )
   }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addURL
    }, dispatch)
}
export default connect(null, mapDispatchToProps)(Landing)
