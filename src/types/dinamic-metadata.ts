import Params from "./dinamic-params";

interface MetadataParams extends Params {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default MetadataParams;
