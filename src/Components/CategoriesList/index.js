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
    const { inputString, catString } = this.state;
    if(e.key === ',' || e.key === 'Enter'){
      this.setState({
        inputString: '',
        catString: catString + ','
      },()=>this.createArray(this.state.catString));
    } else if(e.key === 'Backspace'){
      if (inputString === ''){
        const cats = catString.split(',').slice(0, -1);
        this.setState({
          inputString: cats.length ? cats[cats.length-1] : [],
          catString: cats.join(',')
        },()=>this.createArray(this.state.catString));
      } else {
        this.setState({
          inputString: inputString.slice(0, -1),
          catString: catString.slice(0, -1)
        });
      }
    } else if (e.key.length <= 1 && inputString.length <= 30) {
      this.setState({
        inputString: inputString + e.key,
        catString: catString + e.key
      });
    }
  }

  createArray = (catString) => {
    const arrayOfCats = catString.split(',').slice(0, -1);
    this.props.storeCategories(arrayOfCats, 'categories');
  }


  renderCategories = () => {
    const cats = this.state.catString.split(',');
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
