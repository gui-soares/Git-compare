import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 50px;
  max-width: 1200px;
`;

export const Repository = styled.div`
  width: 280px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px 20px 10px;
  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      i {
        margin-right: 20px;
      }

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }

      &:nth-child(2) {
        margin-left: 4px;
      }
    }
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;

    button {
      width: 45%;
      height: 30px;
      margin: 10px;
      border: none;
      border-radius: 5px;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;

      &:nth-child(1) {
        color: #fff;
        background: #1ba61b;

        &:hover {
          background: #178c17;
        }
      }

      &:nth-child(2) {
        color: #fff;
        background: #da2014;

        &:hover {
          background: #ad2016;
        }
      }

      i {
        margin-right: 10px;
      }
    }
  }
`;
