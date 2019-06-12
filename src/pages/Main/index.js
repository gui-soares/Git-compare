import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import { Container, Form } from './styles';
import logo from '../../assets/logo.png';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({
      loading: false,
      repositories: await this.restoredRepositories(),
    });
  }

  onChange = (e) => {
    this.setState({ repositoryInput: e.target.value });
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      const localRepositories = await this.restoredRepositories();

      await localStorage.setItem(
        '@GitCompare:repositories',
        JSON.stringify([...localRepositories, repository]),
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  restoredRepositories = async () => JSON.parse(await localStorage.getItem('@GitCompare:repositories')) || [];

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;
    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
        repositoryError: false,
      });

      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  handleDeleteRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repo => repo.id !== id);

    this.setState({ repositories: updatedRepositories });

    await localStorage.setItem('@GitCompare:repositories', JSON.stringify(updatedRepositories));
  };

  render() {
    const {
      repositoryInput, repositories, repositoryError, loading,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="User/Repository"
            value={repositoryInput}
            onChange={this.onChange}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : <i className="fa fa-plus" />}
          </button>
        </Form>

        <CompareList
          repositories={repositories}
          updateRepository={this.handleUpdateRepository}
          deleteRepository={this.handleDeleteRepository}
        />
      </Container>
    );
  }
}
