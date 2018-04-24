import gql from "graphql-tag";

export default gql`
  query {
    expertMode @client {
      isExpert
    }
  }
`;
