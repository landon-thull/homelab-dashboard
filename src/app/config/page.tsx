import fetchProps from "@/lib/fetcher";

export interface IConfigProps {
  title: string;
}

export default async function Config() {
  const data = await fetchProps();

  return (
    <main>
      <h1>Configuration Page</h1>
      <p>{data.configData.response?.title}</p>
    </main>
  );
}
