import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Tittle,
  Author,
  Load,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
  };

  componentDidMount() {
    this.init();
  }

  init = async (page = 1) => {
    const { navigation } = this.props;

    const { stars } = this.state;

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    const data = page > 1 ? [...stars, ...response.data] : response.data;

    console.tron.log(page);
    console.tron.log(data);
    this.setState({ stars: data, page, loading: false, refreshing: false });
  };

  loadMore = () => {
    const { page } = this.state;

    this.init(page + 1);
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.init);
  };

  render() {
    const { navigation } = this.props;

    const { stars, loading, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Load />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Tittle>{item.name}</Tittle>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
            onEndReachedThreshold={0.5}
            onEndReached={this.loadMore}
          />
        )}
      </Container>
    );
  }
}
