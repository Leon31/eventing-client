import React, { Component } from 'react';
import './style.sass';

class CatogoriesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      catString: '',
      inputString: '',
    };
  }

  hendleInput = (e) => {
    if(e.key === ','){
      this.setState({
        inputString: '',
        catString: this.state.catString + e.key
      });
    } else if(e.key === 'Backspace'){
      if (this.state.inputString === ''){
        this.setState({
          catString: this.state.catString.split(',').slice(0, -1).join(',')
        });
      } else {
        this.setState({
          inputString: this.state.inputString.slice(0, -1),
          catString: this.state.catString.slice(0, -1)
        });
      }
    } else {
      this.setState({
        inputString: this.state.inputString + e.key,
        catString: this.state.catString + e.key
      });
    }
  }

  renderCategories = () => {
    const cats = this.state.catString.split(',');
    console.log(cats.length-1);
    return (
      <div className="categorieslist_container">
        {cats.map((tag,i) => {
          if (cats.length-1 !== i && tag.length && tag !== ' ') {
            return(<span key={tag} className="categorieslist_tag">{tag}</span>);
          }
          return null;
        })}
        <input
          type="text"
          placeholder={cats.length-1 ? '' : 'Add categories separate with \' , \''}
          style={cats.length-1 ? {width: '20vw'} : {width: '80vw'}}
          className="categorieslist_input"
          value={this.state.inputString}
          onKeyUp={this.hendleInput}/>
      </div>
    );
  }

  render() {
    return (
      <div >
        <div className="title">Choose some categories.</div>
        {this.renderCategories()}
      </div>
    );
  }
}

export default CatogoriesList;
