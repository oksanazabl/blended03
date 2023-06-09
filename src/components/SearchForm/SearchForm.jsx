import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    input: '',
  };

  onHandleChange = event => {
    return this.setState({ input: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.input);
    event.target.reset()
}

  render() {
  return <SearchFormStyled onSubmit={this.handleSubmit}>
  <FormBtn type="submit">
    <FiSearch size="16px" />
  </FormBtn>
  <InputSearch
    placeholder="What do you want to write?"
    name="search"
    required
        autoFocus
        onChange = {this.onHandleChange}
  />
</SearchFormStyled>;
  }
}
