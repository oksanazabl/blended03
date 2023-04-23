import { Component } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
} from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    showLoadMore: false,
    isLoading: false, //
    isEmpty: false,
    error: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      ImageService.getImages(this.state.query, this.state.page)
        .then(data => {
          if (!data.photos.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...data.photos],

            showLoadMore: this.state.page < Math.ceil(data.total_results / 15),
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(this.setState({ isLoading: false }));
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      photo: [],
      page: 1,
      isEmpty: false,
      showLoadMore: false,
      error: '',
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {this.state.photos.map(photo => (
            <GridItem key={photo.id}>
              <CardItem color={photo.avg_color}>
                <img src={photo.src.large} alt={photo.alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.showLoadMore && (
          <Button onClick={this.onLoadMore}>Load more...</Button>
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {this.state.error && <Text>{this.state.error}</Text>}
      </>
    );
  }
}
