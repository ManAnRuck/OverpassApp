import gql from "graphql-tag";

export default gql`
  mutation updateExpertMode($isExpert: Boolean) {
    updateExpertMode(isExpert: $isExpert) @client
  }
`;
