import Link from 'next/link';

const Page = async () => {
  return (
    <div>
      <h1>Home page</h1>
      <Link href="editor">Go to editor</Link>
    </div>
  );
};

export default Page;