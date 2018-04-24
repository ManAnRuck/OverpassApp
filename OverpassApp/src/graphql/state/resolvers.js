export default {
  Mutation: {
    updateExpertMode: (_, { isExpert }, { cache }) => {
      const data = {
        expertMode: {
          __typename: "ExpertMode",
          isExpert
        }
      };
      cache.writeData({ data });
      return null;
    }
  }
};
