import Link from 'next/link';
import prisma from '../lib/db';

async function getData() {
  // const res = await fetch('https://api.example.com/...')
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  // return res.json()

  const posts = await prisma.user.findMany();

  return posts;
}

const Page = async () => {
  const data = await getData();

  console.log('the data');
  console.log(data);

  return (
    <div>
      <h1>Home page</h1>
      <Link href="editor">Go to editor</Link>
      {data[0].email}
    </div>
  );
};

export default Page;
