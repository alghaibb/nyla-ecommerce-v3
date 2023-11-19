import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "qq36slh2",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

