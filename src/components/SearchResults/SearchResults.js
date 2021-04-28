export const SearchResults = ({ searchParameters }) => {
  return (
    <>
      <p>{JSON.stringify(searchParameters, null, 2)}</p>
    </>
  );
};
