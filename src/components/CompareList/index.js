import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories, updateRepository, deleteRepository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            <i className="fas fa-star" />
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            <i className="fas fa-code-branch" />
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            <i className="fas fa-info-circle" />
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            <i className="far fa-clock" />
            {repository.lastCommit} <small>last commit</small>
          </li>
        </ul>
        <div className="buttons-container">
          <button type="button" onClick={() => updateRepository(repository.id)}>
            <i className="fas fa-redo-alt" />
            UPDATE
          </button>
          <button type="button" onClick={() => deleteRepository(repository.id)}>
            <i className="fas fa-trash-alt" />
            DELETE
          </button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  updateRepository: PropTypes.func.isRequired,
  deleteRepository: PropTypes.func.isRequired,
};

export default CompareList;
