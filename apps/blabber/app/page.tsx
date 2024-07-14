'use client';

import { gql, useQuery } from '@apollo/client';

const Page = () => {
  const { data, refetch } = useQuery(gql`
    query {
      user {
        fullName
      }
    }
  `);
  return (
    <>
      <h1>Helloooo</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit');
          import('@tauri-apps/api').then(({ invoke }) => {
            invoke('create_note', {
              form: { text: (e.target as any).note.value },
            });
            refetch();
          });
        }}
      >
        <input
          type="text"
          name="note"
        />
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ul>
        {data?.notes?.map((note: any) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
