import client from "../../client";

export default async function handler(req, res) {
  try {
    const data = await client.fetch(`
      *[_type == "about"]{
        "portrait": portrait.asset->{
          url,
          "dimensions": metadata.dimensions,
          "blurHash": metadata.blurHash
        }
      }
    `);

    res.status(200).json(data);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    res.status(500).json({ error: "Failed to fetch data from Sanity" });
  }
}
