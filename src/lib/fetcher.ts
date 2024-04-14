import { IConfigProps } from "@/app/config/page";
import { promises as fs } from "fs";

export interface IDataProps<I> {
  response?: I;
  error?: string | boolean;
}

/**
 * Handles response from read file request
 * @param {Response} response - The response given by the fetch request
 * @returns The JSON response
 * @throws Error associated with fetch if request unsuccessful
 */
export const handleResponse = async (response: string) => {
  if (response == null) throw new Error("Error reading file");
  const fileJson = JSON.parse(response);
  if (fileJson == undefined) throw new Error("Error parsing file");
  return { response: fileJson, error: false };
};

export const fetchFile = (f: string) => {
  return fs
    .readFile(`${process.cwd()}/src/data/${f}.json`, "utf8")
    .then((res) => handleResponse(res))
    .catch((e: Error) => {
      return { error: e.message };
    });
};

export interface IFetchProps {
  configData: IDataProps<IConfigProps>;
}

/**
 * Fetches config data from JSON file
 * @returns JSON config data
 */
export const fetchProps = async (): Promise<IFetchProps> => {
  const defaults: IDataProps<any> = { error: true };

  let configData: IDataProps<IConfigProps> = defaults;

  const files = ["config"];

  await Promise.all(files.map((f) => fetchFile(f))).then(([config]: any) => {
    configData = config;
  });

  return {
    configData,
  };
};

export default fetchProps;
