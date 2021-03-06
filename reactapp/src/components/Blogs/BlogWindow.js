import React from 'react';

export default class BlogWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBlogs: []
    }
    this.getAllBlogs = this.getAllBlogs.bind(this);
    this.displayBlogs = this.displayBlogs.bind(this);
  }

  getAllBlogs() {
    fetch('http://localhost:8080/o/headless-delivery/v1.0/sites/20123/blog-postings/', {
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
        "Authorization": "Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0"
      }
    })
    .then((res) => { 
        if (!res.ok) throw new Error();
          else return res.json();
    })
    .then((data) => {
      this.setState({ 
        allBlogs: data.items 
      })
    });
  }

  displayBlogs() {
    var titles = "";
    if(this.state.allBlogs !== null) {
      this.state.allBlogs.map((post) => 
        titles += post.headline + '\n'
      )
    }
    return titles;
  }

  componentWillMount() {
    this.getAllBlogs(); 
  }

  render() {
    return (
      <div className="blogContainer">
        {this.displayBlogs()}<br></br>
      </div>
    )
  }
}
